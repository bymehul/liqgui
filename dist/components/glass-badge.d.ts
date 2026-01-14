import { BaseElement } from "../core/base-element.js";
export declare class GlassBadge extends BaseElement {
    static get observedAttributes(): string[];
    connectedCallback(): void;
}
export declare class GlassBadgeWrapper extends BaseElement {
    static get observedAttributes(): string[];
    connectedCallback(): void;
    attributeChangedCallback(): void;
}
