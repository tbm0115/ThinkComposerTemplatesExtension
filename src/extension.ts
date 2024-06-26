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

const inferType = (expression: string, contextMap: Record<string, string>, model: any[]): string | null => {
    const parts = expression.split('.');
    let currentType = contextMap[parts[0]] || contextMap["This"];
    let genericType = '';

    if (!currentType) return null;

    for (const part of parts.slice(1)) {
        let properties = getInheritedProperties(currentType, model, genericType);
        currentType = properties[part]?.type || null;

        if (currentType && currentType.includes('<') && currentType.includes('>')) {
            const match = currentType.match(/<(.+)>/);
            if (match) {
                genericType = match[1];
                currentType = currentType.replace(/<.+>/, '');
            }
        }

        if (!currentType) return null;
    }

    return currentType;
};

const getContextFromCommentsAndAssignments = (document: vscode.TextDocument, position: vscode.Position, model: any[]): Record<string, string> => {
    const textBeforePosition = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
    const contextRegex = /{%-?\s*comment\s*-?%}([\s\S]*?){%-?\s*endcomment\s*-?%}/g;
    const assignRegex = /{%-?\s*assign\s*(\w+)\s*=\s*(\w+(?:\.\w+)*)\s*-?%}/g;
    const forLoopRegex = /{%-?\s*for\s+(\w+)\s+in\s+(\w+(?:\.\w+)*)\s*-?%}/g;
    let match;
    const contextMap: Record<string, string> = {};

    while ((match = contextRegex.exec(textBeforePosition)) !== null) {
        const declarations = match[1].split(/\s*;\s*/).filter(decl => decl);
        declarations.forEach(decl => {
            const [variable, type] = decl.split(/\s*=\s*/);
            contextMap[variable.trim()] = type.trim();
        });
    }

    while ((match = assignRegex.exec(textBeforePosition)) !== null) {
        const variable = match[1];
        const expression = match[2];
        const inferredType = inferType(expression, contextMap, model);
        if (inferredType) {
            contextMap[variable] = inferredType;
        } else {
            contextMap[variable] = expression;
        }
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
                contextMap[variable] = 'Object';
            }
        } else {
            contextMap[variable] = 'Object';
        }
    }

    return contextMap;
};

const getDynamicContext = (text: string, model: any[], contextMap: Record<string, string>): { type: string, genericType: string } | null => {
    // Extract the relevant part of the command chain
    let startIdx = text.lastIndexOf('{{');
    if (startIdx === -1) {
        startIdx = text.search(/{%-?\s*|\s*-?%}/); // Search for '{%' with optional hyphens before or after
    }
    startIdx = startIdx !== -1 ? startIdx + 2 : 0;

    const relevantText = text.slice(startIdx).trim();
    const parts = relevantText.split('.').filter(part => part); // Filter out empty parts

    let currentType = contextMap[parts[0]] || contextMap["This"];
    let genericType = '';

    if (!currentType) return null;

    if (parts.length === 1) {
        return { type: currentType, genericType };
    }

    for (const part of parts.slice(1)) {
        let properties = getInheritedProperties(currentType, model, genericType);
        currentType = properties[part]?.type || null;

        if (currentType && currentType.includes('<') && currentType.includes('>')) {
            const match = currentType.match(/<(.+)>/);
            if (match) {
                genericType = match[1];
                currentType = currentType.replace(/<.+>/, '');
            }
        }

        if (!currentType) return null;
    }

    return { type: currentType, genericType };
};

export function activate(context: vscode.ExtensionContext) {
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        'liquid',
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const completionItems: vscode.CompletionItem[] = [];
                const lineText = document.lineAt(position).text;
                const linePrefix = lineText.substr(0, position.character);
                const contextMap = getContextFromCommentsAndAssignments(document, position, thinkComposerModel);
                const currentContextInfo = getDynamicContext(linePrefix, thinkComposerModel, contextMap);

                console.log(`Line Prefix: ${linePrefix}`);
                console.log(`Context Map: ${JSON.stringify(contextMap)}`);
                console.log(`Current Context Info: ${JSON.stringify(currentContextInfo)}`);

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
        '.',
        '{',
        '%',
        ' ' // Trigger completion after a dot, braces, and spaces to capture all relevant contexts
    );

    context.subscriptions.push(completionProvider);
}

export function deactivate() {}
