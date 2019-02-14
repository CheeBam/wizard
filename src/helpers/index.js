export function isEditPage(match) {
    const { params: { id } } = match;
    return Boolean(id);
}

export function countPhones(user) {
    let i = 1;
    while (true) {
        if (user[`phone${i}`]) {
            ++i;
        } else{
            return --i;
        }
    }
}

export function scriptExists(url) {
    return document.querySelectorAll(`script[src="${url}"]`).length > 0;
}
