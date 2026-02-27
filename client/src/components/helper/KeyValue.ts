export const getKey = <T extends Record<string, string>>(
    enumObject: T, 
    comparedValue: string,
    prefixToRemove?: string
) : string | undefined => {
    const entry = Object.entries(enumObject).find(([_, value]) => value === comparedValue);
    if(!entry) return undefined;

    const [key] = entry;
    return prefixToRemove
        ? key.slice(prefixToRemove.length)
        : key;
}

export const getValue = <T extends Record<string, string>>(
    enumObject: T,
    comparedKey: string,
    prefixToRemove?: string
) : string | undefined => {
    const entry = Object.entries(enumObject).find(([key,_]) => key === comparedKey);
    if (!entry) return "Medical Center";

    const value = entry[1];
    return prefixToRemove
        ? value.slice[prefixToRemove.length]
        : value;
}