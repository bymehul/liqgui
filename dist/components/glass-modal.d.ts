import { BaseElement } from "../core/base-element.js";
export declare class GlassModal extends BaseElement {
    private release?;
    private panel?;
    private backdrop?;
    static get observedAttributes(): string[];
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    open(): void;
    close(): void;
}
