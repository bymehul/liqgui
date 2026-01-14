import { BaseElement } from "../core/base-element.js";

export class GlassTooltip extends BaseElement {
    private tooltipEl?: HTMLElement;

    static get observedAttributes() {
        return ["position", "delay"];
    }

    connectedCallback() {
        const position = this.getAttribute("position") || "top";

        this.mount(`
            <div class="wrapper">
                <slot></slot>
                <div class="tooltip ${position}" role="tooltip">
                    <slot name="content"></slot>
                </div>
            </div>
        `, `
            :host {
                display: inline-block;
                position: relative;
            }
            .wrapper {
                position: relative;
                display: inline-block;
            }
            .tooltip {
                position: absolute;
                padding: 0.5rem 0.75rem;
                background: var(--lg-bg);
                backdrop-filter: blur(var(--lg-blur));
                border: 1px solid var(--lg-border);
                border-radius: calc(var(--lg-radius) / 2);
                box-shadow: var(--lg-shadow-sm);
                font-size: 0.875rem;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transform: scale(0.9);
                transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
                z-index: 10000;
                pointer-events: none;
            }
            .wrapper:hover .tooltip,
            .wrapper:focus-within .tooltip {
                opacity: 1;
                visibility: visible;
                transform: scale(1);
            }
            
            /* Positions */
            .tooltip.top {
                bottom: calc(100% + 8px);
                left: 50%;
                transform-origin: bottom center;
            }
            .wrapper:hover .tooltip.top,
            .wrapper:focus-within .tooltip.top {
                transform: translateX(-50%) scale(1);
            }
            .tooltip.top:not(:hover) {
                transform: translateX(-50%) scale(0.9);
            }
            
            .tooltip.bottom {
                top: calc(100% + 8px);
                left: 50%;
                transform-origin: top center;
            }
            .wrapper:hover .tooltip.bottom,
            .wrapper:focus-within .tooltip.bottom {
                transform: translateX(-50%) scale(1);
            }
            .tooltip.bottom:not(:hover) {
                transform: translateX(-50%) scale(0.9);
            }
            
            .tooltip.left {
                right: calc(100% + 8px);
                top: 50%;
                transform-origin: right center;
            }
            .wrapper:hover .tooltip.left,
            .wrapper:focus-within .tooltip.left {
                transform: translateY(-50%) scale(1);
            }
            .tooltip.left:not(:hover) {
                transform: translateY(-50%) scale(0.9);
            }
            
            .tooltip.right {
                left: calc(100% + 8px);
                top: 50%;
                transform-origin: left center;
            }
            .wrapper:hover .tooltip.right,
            .wrapper:focus-within .tooltip.right {
                transform: translateY(-50%) scale(1);
            }
            .tooltip.right:not(:hover) {
                transform: translateY(-50%) scale(0.9);
            }
        `);
    }
}

customElements.define("glass-tooltip", GlassTooltip);

// Popover with click trigger
export class GlassPopover extends BaseElement {
    private isOpen = false;

    static get observedAttributes() {
        return ["position", "open"];
    }

    connectedCallback() {
        const position = this.getAttribute("position") || "bottom";

        this.mount(`
            <div class="wrapper">
                <div class="trigger">
                    <slot name="trigger"></slot>
                </div>
                <div class="popover ${position}" role="dialog">
                    <slot></slot>
                </div>
            </div>
        `, `
            :host {
                display: inline-block;
                position: relative;
            }
            .wrapper {
                position: relative;
            }
            .trigger {
                cursor: pointer;
            }
            .popover {
                position: absolute;
                min-width: 200px;
                padding: 1rem;
                background: var(--lg-bg);
                backdrop-filter: blur(var(--lg-blur));
                border: 1px solid var(--lg-border);
                border-radius: var(--lg-radius);
                box-shadow: var(--lg-shadow);
                opacity: 0;
                visibility: hidden;
                transform: scale(0.95);
                transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                z-index: 10000;
            }
            :host([open]) .popover {
                opacity: 1;
                visibility: visible;
                transform: scale(1);
            }
            
            .popover.top {
                bottom: calc(100% + 8px);
                left: 50%;
                transform-origin: bottom center;
            }
            :host([open]) .popover.top { transform: translateX(-50%) scale(1); }
            .popover.top { transform: translateX(-50%) scale(0.95); }
            
            .popover.bottom {
                top: calc(100% + 8px);
                left: 50%;
                transform-origin: top center;
            }
            :host([open]) .popover.bottom { transform: translateX(-50%) scale(1); }
            .popover.bottom { transform: translateX(-50%) scale(0.95); }
            
            .popover.left {
                right: calc(100% + 8px);
                top: 50%;
                transform-origin: right center;
            }
            :host([open]) .popover.left { transform: translateY(-50%) scale(1); }
            .popover.left { transform: translateY(-50%) scale(0.95); }
            
            .popover.right {
                left: calc(100% + 8px);
                top: 50%;
                transform-origin: left center;
            }
            :host([open]) .popover.right { transform: translateY(-50%) scale(1); }
            .popover.right { transform: translateY(-50%) scale(0.95); }
        `);

        this.root.querySelector(".trigger")?.addEventListener("click", () => this.toggle());

        // Close on outside click
        document.addEventListener("click", (e) => {
            if (!this.contains(e.target as Node) && this.isOpen) {
                this.close();
            }
        });

        // Close on Escape
        this.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Escape") this.close();
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.setAttribute("open", "");
    }

    close() {
        this.isOpen = false;
        this.removeAttribute("open");
    }
}

customElements.define("glass-popover", GlassPopover);
