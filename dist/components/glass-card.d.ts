import { BaseElement } from "../core/base-element.js";
export declare class GlassCard extends BaseElement {
    private cancelTilt?;
    static get observedAttributes(): string[];
    connectedCallback(): void;
    private setupTiltEffect;
    disconnectedCallback(): void;
}
