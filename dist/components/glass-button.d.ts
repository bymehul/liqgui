import { BaseElement } from "../core/base-element.js";
export declare class GlassButton extends BaseElement {
    static get observedAttributes(): string[];
    connectedCallback(): void;
    attributeChangedCallback(name: string, _old: string, value: string): void;
}
