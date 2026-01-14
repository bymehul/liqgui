export class BaseElement extends HTMLElement {
    constructor() {
        super(...arguments);
        this.root = this.attachShadow({ mode: "open" });
    }
    mount(html, css) {
        this.root.innerHTML = `<style>${css}</style>${html}`;
    }
}
