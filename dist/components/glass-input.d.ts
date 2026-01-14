import { BaseElement } from "../core/base-element.js";
export declare class GlassInput extends BaseElement {
    static get observedAttributes(): string[];
    connectedCallback(): void;
    get value(): string;
    set value(val: string);
    attributeChangedCallback(name: string, _old: string, value: string): void;
}
