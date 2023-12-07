export function generateSlug(text) {
    return text.toLowerCase().replace(/\s+/g, '-');
}
