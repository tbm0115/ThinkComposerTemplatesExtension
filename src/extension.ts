import * as vscode from 'vscode';
import { thinkComposerModel } from './thinkComposerModel';
import { liquidBuiltInModel } from './liquidBuiltInModel';

const getInheritedProperties = (className: string, model: any[], genericType: string = ''): Record<string, { type: string, summary: string }> => {
    let properties: Record<string, { type: string, summary: string }> = {};
    const classDef = model.find(cls => cls.name === className);
    if (classDef) {
        properties = { ...classDef.properties };
        if (classDef.ancestor) {
            properties = { ...properties, ...getInheritedProperties(classDef.ancestor, model, genericType) };
        }
    }
    if (liquidBuiltInModel[className]) {
        liquidBuiltInModel[className].forEach(prop => {
            properties[prop.name] = { type: prop.type.replace(/T/g, genericType), summary: prop.summary };
        });
    }
    return properties;
};

const getClassDefinition = (className: string, model: any[]) => {
    return model.find(cls => cls.name === className);
};

const getContextFromCommentsAndAssignments = (document: vscode.TextDocument, position: vscode.Position): Record<string, string> => {
    const textBeforePosition = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
    const contextRegex = /{%\s*comment\s*%}\s*This\s*=\s*(\w+)\s*{%\s*endcomment\s*%}/g;
    const assignRegex = /{%\s*assign\s*(\w+)\s*=\s*(\w+)\s*%}/g;
    const forLoopRegex = /{%\s*for\s+(\w+)\s+in\s+(\w+)\s*%}/g;
    let match;
    let lastContext = null;
    const contextMap: Record<string, string> = {};

    while ((match = contextRegex.exec(textBeforePosition)) !== null) {
        lastContext = match[1];
    }

    contextMap["This"] = lastContext;

    while ((match = assignRegex.exec(textBeforePosition)) !== null) {
        contextMap[match[1]] = match[2];
    }

    while ((match = forLoopRegex.exec(textBeforePosition)) !== null) {
        const variable = match[1];
        const collection = match[2];
        if (contextMap[collection]) {
            const collectionType = contextMap[collection];
            if (collectionType.includes('<') && collectionType.includes('>')) {
                const genericMatch = collectionType.match(/<(.+)>/);
                if (genericMatch) {
                    contextMap[variable] = genericMatch[1];
                }
            } else {
                // Default fallback if generic type isn't specified
                contextMap[variable] = 'Object';
            }
        } else {
            // Default fallback if collection isn't found in the context
            contextMap[variable] = 'Object';
        }
    }

    return contextMap;
};

const getDynamicContext = (text: string, model: any[], contextMap: Record<string, string>): { type: string, genericType: string } | null => {
    const parts = text.split('.');
    let currentType = contextMap["This"];
    let genericType = '';

    if (parts[0] in contextMap) {
        currentType = contextMap[parts[0]];
    }

    for (const part of parts.slice(1)) {
        if (!currentType) return null;
        let properties = getInheritedProperties(currentType, model, genericType);
        currentType = properties[part]?.type || null;

        if (currentType && currentType.includes('<') && currentType.includes('>')) {
            const match = currentType.match(/<(.+)>/);
            if (match) {
                genericType = match[1];
                currentType = currentType.replace(/<.+>/, '');
            }
        }
    }

    return { type: currentType, genericType };
};

export function activate(context: vscode.ExtensionContext) {
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        'liquid',
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const completionItems: vscode.CompletionItem[] = [];
                const linePrefix = document.lineAt(position).text.substr(0, position.character);
                const lastDotIndex = linePrefix.lastIndexOf('.');
                const prefix = lastDotIndex !== -1 ? linePrefix.substr(0, lastDotIndex) : '';
                const contextMap = getContextFromCommentsAndAssignments(document, position);
                const currentContextInfo = getDynamicContext(prefix, thinkComposerModel, contextMap);

                if (currentContextInfo) {
                    const { type: currentContext, genericType } = currentContextInfo;
                    const contextClass = getClassDefinition(currentContext, thinkComposerModel);
                    if (contextClass) {
                        let properties = getInheritedProperties(contextClass.name, thinkComposerModel, genericType);
                        if (liquidBuiltInModel[currentContext]) {
                            properties = { ...properties, ...liquidBuiltInModel[currentContext].reduce((acc, prop) => {
                                acc[prop.name] = { type: prop.type.replace(/T/g, genericType), summary: prop.summary };
                                return acc;
                            }, {} as Record<string, { type: string, summary: string }>) };
                        }
                        for (const prop in properties) {
                            const item = new vscode.CompletionItem(`${prop}`, vscode.CompletionItemKind.Property);
                            item.documentation = new vscode.MarkdownString(`**${prop}**\n\n${properties[prop].summary}\n\n*Type:* ${properties[prop].type}\n\n*Current Context Type:* ${currentContext}`);
                            item.insertText = prop;
                            completionItems.push(item);
                        }
                    }
                } else {
                    thinkComposerModel.forEach(cls => {
                        const properties = getInheritedProperties(cls.name, thinkComposerModel);
                        for (const prop in properties) {
                            const item = new vscode.CompletionItem(`${cls.name}.${prop}`, vscode.CompletionItemKind.Property);
                            item.documentation = new vscode.MarkdownString(`**${prop}**\n\n${properties[prop].summary}\n\n*Type:* ${properties[prop].type}\n\n*Current Context Type:* ${cls.name}`);
                            item.insertText = `${cls.name}.${prop}`;
                            completionItems.push(item);
                        }
                    });
                }

                return completionItems;
            }
        },
        '.' // Trigger completion after a dot
    );

    context.subscriptions.push(completionProvider);
}

export function deactivate() {}
