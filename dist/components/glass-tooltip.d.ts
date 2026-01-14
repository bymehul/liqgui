import { BaseElement } from "../core/base-element.js";
export declare class GlassTooltip extends BaseElement {
    private tooltipEl?;
    static get observedAttributes(): string[];
    connectedCallback(): void;
}
export declare class GlassPopover extends BaseElement {
    private isOpen;
    static get observedAttributes(): string[];
    connectedCallback(): void;
    toggle(): void;
    open(): void;
    close(): void;
}
