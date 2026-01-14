export abstract class BaseElement extends HTMLElement {
  protected root = this.attachShadow({ mode: "open" });
  protected mount(html: string, css: string) {
    this.root.innerHTML = `<style>${css}</style>${html}`;
  }
}
