export declare abstract class BaseElement extends HTMLElement {
    protected root: ShadowRoot;
    protected mount(html: string, css: string): void;
}
