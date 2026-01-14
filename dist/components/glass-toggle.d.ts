import { BaseElement } from "../core/base-element.js";
export declare class GlassToggle extends BaseElement {
    static get observedAttributes(): string[];
    connectedCallback(): void;
    private updateThumb;
    attributeChangedCallback(name: string): void;
    get checked(): boolean;
    set checked(value: boolean);
}
