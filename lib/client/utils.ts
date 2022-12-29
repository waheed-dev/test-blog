export function markWithEllipsis(text :string) {
    if (text.length > 70) {
        return text.substring(0, 70) + '...';
    }
    return text;
}