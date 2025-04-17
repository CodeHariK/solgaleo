export const Pattern = {
    Number: /^[0-9]+$/,
    Tel: /^(\+1\s?)?(\(?\d{0,3}\)?[\s.-]?)?\d{0,3}[\s.-]?\d{0,4}?$/,
};

export function SafeString(input: string): string {
    return input.replace(/[^a-zA-Z0-9]/g, '_');
}
