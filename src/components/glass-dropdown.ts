import { BaseElement } from "../core/base-element.js";
import { motion } from "../core/motion.js";

export class GlassDropdown extends BaseElement {
    private isOpen = false;
    private menuEl?: HTMLElement;

    static get observedAttributes() {
        return ["open", "disabled"];
    }

    connectedCallback() {
        this.mount(`
            <div class="dropdown">
                <button class="trigger" aria-haspopup="listbox" aria-expanded="false">
                    <span class="label"><slot name="trigger">Select</slot></span>
                    <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </button>
                <div class="menu" role="listbox">
                    <slot></slot>
                </div>
            </div>
        `, `
            :host {
                display: inline-block;
                position: relative;
            }
            .dropdown {
                position: relative;
            }
            .trigger {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem 1rem;
                min-width: 180px;
                background: var(--lg-bg);
                backdrop-filter: blur(var(--lg-blur));
                border: 1px solid var(--lg-border);
                border-radius: var(--lg-radius);
                color: inherit;
                font: inherit;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .trigger:hover {
                border-color: var(--lg-border-hover);
            }
            .trigger:focus-visible {
                outline: 2px solid var(--lg-accent-focus);
                outline-offset: 2px;
            }
            :host([disabled]) .trigger {
                opacity: 0.5;
                cursor: not-allowed;
            }
            .label {
                flex: 1;
                text-align: left;
            }
            .chevron {
                transition: transform 0.2s ease;
            }
            :host([open]) .chevron {
                transform: rotate(180deg);
            }
            .menu {
                position: absolute;
                top: calc(100% + 8px);
                left: 0;
                right: 0;
                background: var(--lg-bg);
                backdrop-filter: blur(var(--lg-blur));
                border: 1px solid var(--lg-border);
                border-radius: var(--lg-radius);
                box-shadow: var(--lg-shadow);
                padding: 0.5rem;
                display: none;
                flex-direction: column;
                gap: 0.25rem;
                z-index: 1000;
                max-height: 300px;
                overflow-y: auto;
            }
            :host([open]) .menu {
                display: flex;
            }
            ::slotted(button),
            ::slotted([role="option"]) {
                display: block;
                width: 100%;
                padding: 0.6rem 0.75rem;
                background: transparent;
                border: none;
                border-radius: calc(var(--lg-radius) - 8px);
                color: inherit;
                font: inherit;
                text-align: left;
                cursor: pointer;
                transition: background 0.15s ease;
            }
            ::slotted(button:hover),
            ::slotted([role="option"]:hover) {
                background: rgba(255, 255, 255, 0.1);
            }
            ::slotted([aria-selected="true"]) {
                background: rgba(255, 255, 255, 0.15);
            }
        `);

        const trigger = this.root.querySelector<HTMLButtonElement>(".trigger")!;
        this.menuEl = this.root.querySelector(".menu")!;

        trigger.addEventListener("click", () => {
            if (!this.hasAttribute("disabled")) {
                this.toggle();
            }
        });

        // Close on outside click
        document.addEventListener("click", (e) => {
            if (!this.contains(e.target as Node) && this.isOpen) {
                this.close();
            }
        });

        // Handle option selection
        this.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (target.matches("[role='option'], button:not(.trigger)")) {
                this.selectOption(target);
            }
        });

        // Keyboard navigation
        this.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Escape") this.close();
            if (e.key === "ArrowDown" && this.isOpen) {
                e.preventDefault();
                this.focusNextOption(1);
            }
            if (e.key === "ArrowUp" && this.isOpen) {
                e.preventDefault();
                this.focusNextOption(-1);
            }
        });
    }

    private toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.setAttribute("open", "");
        this.root.querySelector(".trigger")?.setAttribute("aria-expanded", "true");
        if (this.menuEl) motion.scaleIn(this.menuEl, 150);
    }

    close() {
        this.isOpen = false;
        this.removeAttribute("open");
        this.root.querySelector(".trigger")?.setAttribute("aria-expanded", "false");
    }

    private selectOption(option: HTMLElement) {
        // Update selection
        this.querySelectorAll("[role='option']").forEach(opt =>
            opt.setAttribute("aria-selected", "false")
        );
        option.setAttribute("aria-selected", "true");

        // Update trigger label
        const label = this.root.querySelector(".label slot") as HTMLSlotElement;
        const triggerContent = option.textContent || "";

        this.dispatchEvent(new CustomEvent("change", {
            detail: { value: option.dataset.value || triggerContent, label: triggerContent },
            bubbles: true
        }));

        this.close();
    }

    private focusNextOption(direction: number) {
        const options = Array.from(this.querySelectorAll<HTMLElement>("[role='option'], button"));
        const current = options.findIndex(opt => opt === document.activeElement);
        const next = options[current + direction];
        next?.focus();
    }
}

customElements.define("glass-dropdown", GlassDropdown);
