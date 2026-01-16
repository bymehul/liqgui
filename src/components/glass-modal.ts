import { BaseElement } from "../core/base-element.js";
import { trapFocus } from "../core/focus-trap.js";
import { motion } from "../core/motion.js";

export class GlassModal extends BaseElement {
  private release?: () => void;
  private panel?: HTMLElement;
  private backdrop?: HTMLElement;

  static get observedAttributes() {
    return ["open"];
  }

  connectedCallback() {
    this.mount(`
            <div class="backdrop"></div>
            <div class="panel" role="dialog" aria-modal="true">
                <button class="close-btn" aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
                <slot></slot>
            </div>
        `, `
            :host {
                position: fixed;
                inset: 0;
                display: none;
                place-items: center;
                z-index: 9999;
            }
            :host([open]) {
                display: grid;
            }
            .backdrop {
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(4px);
                will-change: opacity;
            }
            .panel {
                position: relative;
                background: var(--lg-bg);
                backdrop-filter: blur(var(--lg-blur));
                -webkit-backdrop-filter: blur(var(--lg-blur));
                border-radius: var(--lg-radius);
                border: 1px solid var(--lg-border);
                box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
                padding: 2rem;
                width: min(100% - 2rem, 500px);
                min-width: min(320px, 90vw);
                max-width: 90vw;
                max-height: 85vh;
                overflow: auto;
            }
            .panel::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 1px;
                background: linear-gradient(90deg, 
                    transparent, 
                    rgba(255, 255, 255, 0.4), 
                    transparent
                );
            }
            .close-btn {
                position: absolute;
                top: 1rem;
                right: 1rem;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: inherit;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            .close-btn:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            .close-btn:focus-visible {
                outline: 2px solid var(--lg-accent-focus, #5ac8fa);
                outline-offset: 2px;
            }
        `);

    this.panel = this.root.querySelector(".panel")!;
    this.backdrop = this.root.querySelector(".backdrop")!;

    // Close on backdrop click
    this.backdrop.addEventListener("click", () => this.close());

    // Close button
    this.root.querySelector(".close-btn")?.addEventListener("click", () => this.close());

    // Close on Escape
    this.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape") this.close();
    });
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name !== "open" || !this.panel || !this.backdrop) return;

    if (this.hasAttribute("open")) {
      // Opening animation
      motion.fadeIn(this.backdrop, 200);
      motion.scaleIn(this.panel, 300);
      this.release = trapFocus(this.panel);
      document.body.style.overflow = "hidden";
    } else if (oldValue !== null) {
      // Closing animation
      motion.fadeOut(this.backdrop, 150);
      motion.scaleOut(this.panel, 200);
      this.release?.();
      document.body.style.overflow = "";
    }
  }

  open() {
    this.setAttribute("open", "");
  }

  close() {
    this.removeAttribute("open");
    this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
  }
}

customElements.define("glass-modal", GlassModal);
