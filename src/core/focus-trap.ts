export function trapFocus(el: HTMLElement) {
    const items = el.querySelectorAll<HTMLElement>(
        "button,input,[tabindex]:not([tabindex='-1'])"
    );
    const first = items[0], last = items[items.length - 1];

    function handler(e: KeyboardEvent) {
        if (e.key !== "Tab") return;
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    }

    el.addEventListener("keydown", handler);
    first?.focus();
    return () => el.removeEventListener("keydown", handler);
}
