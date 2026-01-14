import { BaseElement } from "../core/base-element.js";
import { springAnimate, gentleSpring } from "../core/spring-engine.js";

export class GlassAccordion extends BaseElement {
    static get observedAttributes() {
        return ["multiple"];
    }

    connectedCallback() {
        this.mount(`
            <div class="accordion">
                <slot></slot>
            </div>
        `, `
            :host {
                display: block;
            }
            .accordion {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
        `);

        // Handle item toggle
        this.addEventListener("accordion-toggle", ((e: CustomEvent) => {
            if (!this.hasAttribute("multiple")) {
                // Close other items
                this.querySelectorAll("glass-accordion-item[open]").forEach(item => {
                    if (item !== e.target) {
                        item.removeAttribute("open");
                    }
                });
            }
        }) as EventListener);
    }
}

customElements.define("glass-accordion", GlassAccordion);

export class GlassAccordionItem extends BaseElement {
    private contentEl?: HTMLElement;
    private contentHeight = 0;

    static get observedAttributes() {
        return ["open"];
    }

    connectedCallback() {
        this.mount(`
            <div class="item">
                <button class="header" aria-expanded="false">
                    <span class="title"><slot name="title"></slot></span>
                    <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </button>
                <div class="content-wrapper">
                    <div class="content">
                        <slot></slot>
                    </div>
                </div>
            </div>
        `, `
            :host {
                display: block;
            }
            .item {
                background: var(--lg-bg);
                backdrop-filter: blur(var(--lg-blur));
                border: 1px solid var(--lg-border);
                border-radius: var(--lg-radius);
                overflow: hidden;
            }
            .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 1rem 1.25rem;
                background: transparent;
                border: none;
                color: inherit;
                font: inherit;
                font-weight: 500;
                cursor: pointer;
                text-align: left;
                transition: background 0.2s ease;
            }
            .header:hover {
                background: rgba(255, 255, 255, 0.05);
            }
            .header:focus-visible {
                outline: 2px solid var(--lg-accent-focus);
                outline-offset: -2px;
            }
            .icon {
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                flex-shrink: 0;
                opacity: 0.7;
            }
            :host([open]) .icon {
                transform: rotate(180deg);
            }
            .content-wrapper {
                height: 0;
                overflow: hidden;
            }
            .content {
                padding: 0 1.25rem 1rem;
                opacity: 0.8;
                line-height: 1.6;
            }
        `);

        this.contentEl = this.root.querySelector(".content-wrapper")!;

        // Get content height
        requestAnimationFrame(() => {
            const content = this.root.querySelector<HTMLElement>(".content");
            if (content) {
                this.contentHeight = content.offsetHeight;
            }
            if (this.hasAttribute("open")) {
                this.contentEl!.style.height = `${this.contentHeight}px`;
            }
        });

        // Toggle on header click
        this.root.querySelector(".header")?.addEventListener("click", () => {
            this.toggle();
        });
    }

    toggle() {
        if (this.hasAttribute("open")) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.setAttribute("open", "");
        this.root.querySelector(".header")?.setAttribute("aria-expanded", "true");

        // Dispatch event for accordion parent
        this.dispatchEvent(new CustomEvent("accordion-toggle", { bubbles: true }));

        // Animate open
        if (this.contentEl) {
            const content = this.root.querySelector<HTMLElement>(".content");
            this.contentHeight = content?.offsetHeight || 0;

            springAnimate(0, this.contentHeight, (v) => {
                this.contentEl!.style.height = `${v}px`;
            }, gentleSpring);
        }
    }

    close() {
        this.removeAttribute("open");
        this.root.querySelector(".header")?.setAttribute("aria-expanded", "false");

        // Animate close
        if (this.contentEl) {
            const currentHeight = this.contentEl.offsetHeight;
            springAnimate(currentHeight, 0, (v) => {
                this.contentEl!.style.height = `${v}px`;
            }, gentleSpring);
        }
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === "open" && this.contentEl) {
            if (newValue !== null && oldValue === null) {
                // Opening
            } else if (newValue === null && oldValue !== null) {
                // Closing handled in close()
            }
        }
    }
}

customElements.define("glass-accordion-item", GlassAccordionItem);
