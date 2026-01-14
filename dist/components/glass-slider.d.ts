import { BaseElement } from "../core/base-element.js";
export declare class GlassSlider extends BaseElement {
    private track?;
    private thumb?;
    private fill?;
    private isDragging;
    static get observedAttributes(): string[];
    get min(): number;
    get max(): number;
    get step(): number;
    get value(): number;
    set value(v: number);
    connectedCallback(): void;
    private setupInteraction;
    private updateUI;
    attributeChangedCallback(name: string): void;
}
