import { BaseElement } from "../core/base-element.js";
export declare class GlassProgress extends BaseElement {
    static get observedAttributes(): string[];
    get value(): number;
    set value(v: number);
    get max(): number;
    connectedCallback(): void;
    private mountLinear;
    private mountCircular;
    private updateProgress;
    attributeChangedCallback(name: string): void;
}
