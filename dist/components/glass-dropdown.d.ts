import { BaseElement } from "../core/base-element.js";
export declare class GlassDropdown extends BaseElement {
    private isOpen;
    private menuEl?;
    static get observedAttributes(): string[];
    connectedCallback(): void;
    private toggle;
    open(): void;
    close(): void;
    private selectOption;
    private focusNextOption;
}
