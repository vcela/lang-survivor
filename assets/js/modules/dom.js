export function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

export function escapeAttribute(value) {
    return escapeHtml(value);
}

export function iconBookmark() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m12 20-6.5-3.6V5.7A1.7 1.7 0 0 1 7.2 4h9.6a1.7 1.7 0 0 1 1.7 1.7v10.7z"></path></svg>';
}

export function iconCheck() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m5 12 4.2 4.2L19 6.5"></path></svg>';
}

export function iconAlert() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 7v6.5"></path><path d="M12 17.5h.01"></path><path d="M10 3.8h4l6.2 11L18 20.2H6l-2.2-5.4z"></path></svg>';
}

export function shuffle(items) {
    const array = [...items];
    for (let index = array.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
    }
    return array;
}
