export function scriptExists(url) {
    return document.querySelectorAll(`script[src="${url}"]`).length > 0;
}
