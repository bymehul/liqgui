import { BaseElement } from "../core/base-element.js";
export declare class GlassTabs extends BaseElement {
    private indicator?;
    static get observedAttributes(): string[];
    connectedCallback(): void;
    private selectTab;
}
