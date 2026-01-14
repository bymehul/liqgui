export function trapFocus(el) {
    const items = el.querySelectorAll("button,input,[tabindex]:not([tabindex='-1'])");
    const first = items[0], last = items[items.length - 1];
    function handler(e) {
        if (e.key !== "Tab")
            return;
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        }
        else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
    el.addEventListener("keydown", handler);
    first === null || first === void 0 ? void 0 : first.focus();
    return () => el.removeEventListener("keydown", handler);
}
