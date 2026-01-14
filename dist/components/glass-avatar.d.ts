import { BaseElement } from "../core/base-element.js";
export declare class GlassAvatar extends BaseElement {
    static get observedAttributes(): string[];
    connectedCallback(): void;
    attributeChangedCallback(): void;
}
export declare class GlassAvatarGroup extends BaseElement {
    connectedCallback(): void;
}
