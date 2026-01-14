import { BaseElement } from "../core/base-element.js";
export declare class GlassAccordion extends BaseElement {
    static get observedAttributes(): string[];
    connectedCallback(): void;
}
export declare class GlassAccordionItem extends BaseElement {
    private contentEl?;
    private contentHeight;
    static get observedAttributes(): string[];
    connectedCallback(): void;
    toggle(): void;
    open(): void;
    close(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
