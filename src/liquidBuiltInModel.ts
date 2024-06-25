export const liquidBuiltInModel = {
    IEnumerable: [
        { name: 'Size', summary: 'Gets the size of a collection of objects.', type: 'Int32' },
        { name: 'Any', summary: 'Indicates whether a collection has any content.', type: 'Boolean' },
        { name: 'First', summary: 'Gets the first element of the collection.', type: 'T' },
        { name: 'Last', summary: 'Gets the last element of the collection.', type: 'T' },
        { name: 'Where', summary: 'Filters objects in a collection by property value.', type: 'IEnumerable<T>' },
        { name: 'Sort', summary: 'Sorts elements of the collection.', type: 'IEnumerable<T>' },
        { name: 'Uniq', summary: 'Removes duplicate elements from a collection.', type: 'IEnumerable<T>' },
        { name: 'GetIdeasDefinedAs', summary: 'Gets from a Source collection of Ideas those based on Idea-Definitions having the specified Tech-Names.', type: 'IEnumerable<T>' },
        { name: 'GetElements', summary: 'Gets from a Source collection of Elements (IIdentifiableElement) those having the specified Tech-Names.', type: 'IEnumerable<T>' },
        { name: 'GetLinksByVariant', summary: 'Gets from a Source collection of Role-Based Links those having Variants with Tech-Name like those provided.', type: 'IEnumerable<T>' },
        { name: 'SelectMany', summary: 'From a Source collection of items having a property, which is also another collection, gets the union of all the items of these collections.', type: 'IEnumerable<T>' }
    ],
    EditableList: [
        { name: 'Size', summary: 'Gets the size of the editable list.', type: 'Int32' },
        { name: 'First', summary: 'Gets the first element of the editable list.', type: 'T' },
        { name: 'Last', summary: 'Gets the last element of the editable list.', type: 'T' },
        { name: 'Where', summary: 'Filters objects in an array by property value.', type: 'EditableList<T>' },
        { name: 'Sort', summary: 'Sorts elements of the array.', type: 'EditableList<T>' },
        { name: 'Uniq', summary: 'Removes duplicate elements from an array.', type: 'EditableList<T>' }
    ],
    String: [
        { name: 'Size', summary: 'Gets the size of a string.', type: 'Int32' },
        { name: 'AsChar', summary: 'Gets the character for the specified code or number (UTF-16).', type: 'String' },
        { name: 'Capitalize', summary: 'Capitalizes words in the input sentence.', type: 'String' },
        { name: 'Downcase', summary: 'Converts an input string to lowercase.', type: 'String' },
        { name: 'Upcase', summary: 'Converts an input string to uppercase.', type: 'String' },
        { name: 'Escape', summary: 'Escapes a string.', type: 'String' },
        { name: 'EscapeOnce', summary: 'Returns an escaped version of HTML without affecting existing escaped entities.', type: 'String' },
        { name: 'StripHtml', summary: 'Strips HTML from a string.', type: 'String' },
        { name: 'StripNewlines', summary: 'Strips all newlines from a string.', type: 'String' },
        { name: 'NewlineToBr', summary: 'Replaces each newline with HTML break.', type: 'String' },
        { name: 'Replace', summary: 'Replaces each occurrence of a substring.', type: 'String' },
        { name: 'ReplaceFirst', summary: 'Replaces the first occurrence of a substring.', type: 'String' },
        { name: 'Remove', summary: 'Removes each occurrence of a substring.', type: 'String' },
        { name: 'RemoveFirst', summary: 'Removes the first occurrence of a substring.', type: 'String' },
        { name: 'Truncate', summary: 'Truncates a string down to x characters.', type: 'String' },
        { name: 'TruncateWords', summary: 'Truncates a string down to x words.', type: 'String' },
        { name: 'Prepend', summary: 'Prepends a string.', type: 'String' },
        { name: 'Append', summary: 'Appends a string.', type: 'String' },
        { name: 'Split', summary: 'Splits a string on a matching pattern.', type: 'Array' }
    ],
    Array: [
        { name: 'Size', summary: 'Gets the size of an array.', type: 'Int32' },
        { name: 'First', summary: 'Gets the first element of the array.', type: 'Object' },
        { name: 'Last', summary: 'Gets the last element of the array.', type: 'Object' },
        { name: 'Join', summary: 'Joins elements of the array with a certain character between them.', type: 'String' },
        { name: 'Sort', summary: 'Sorts elements of the array.', type: 'Array' },
        { name: 'Map', summary: 'Maps/collects an array on a given property.', type: 'Array' }
    ],
    Number: [
        { name: 'Minus', summary: 'Subtraction.', type: 'Number' },
        { name: 'Plus', summary: 'Addition.', type: 'Number' },
        { name: 'Times', summary: 'Multiplication.', type: 'Number' },
        { name: 'DividedBy', summary: 'Division.', type: 'Number' },
        { name: 'Modulo', summary: 'Remainder.', type: 'Number' }
    ],
    Object: [
        { name: 'ToBase64', summary: 'Gets binary content in its Base-64 representation.', type: 'String' },
        { name: 'ToUnformattedText', summary: 'Gets rich-text as simple unformatted text.', type: 'String' },
        { name: 'ToPlainText', summary: 'Gets an arbitrary object in its simple text representation.', type: 'String' }
    ]
};
