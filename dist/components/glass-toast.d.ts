import { BaseElement } from "../core/base-element.js";
export declare class GlassToast extends BaseElement {
    static get observedAttributes(): string[];
    connectedCallback(): void;
    private getIcon;
    private dismiss;
    static show(message: string, variant?: "success" | "error" | "warning" | "info"): HTMLElement;
}
