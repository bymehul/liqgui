import { BaseElement } from "../core/base-element.js";
import { glowCSS, createRipple } from "../core/glow.js";
import { springAnimate, snappySpring } from "../core/spring-engine.js";
export class GlassButton extends BaseElement {
    static get observedAttributes() {
        return ["variant", "disabled", "loading"];
    }
    connectedCallback() {
        const variant = this.getAttribute("variant") || "default";
        this.mount(`
            <button part="button">
                <span class="glow"></span>
                <span class="ripple-container"></span>
                <span class="content">
                    <span class="loader"></span>
                    <slot></slot>
                </span>
            </button>
        `, `
            :host {
                display: inline-block;
            }
            button {
                position: relative;
                padding: 0.75rem 1.5rem;
                border-radius: 999px;
                background: var(--lg-bg);
                backdrop-filter: blur(var(--lg-blur));
                border: 1px solid var(--lg-border);
                color: inherit;
                font: inherit;
                font-weight: 500;
                cursor: pointer;
                overflow: hidden;
                transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                will-change: transform; 
            }
            button:hover {
                border-color: rgba(255, 255, 255, 0.5);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            }
            button:focus-visible {
                outline: 2px solid var(--lg-accent-focus);
                outline-offset: 2px;
            }
            button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                pointer-events: none;
            }
            .glow { ${glowCSS("var(--lg-accent)")} }
            button:hover .glow { opacity: 0.5; }
            
            /* Variants */
            :host([variant="primary"]) button {
                background: var(--lg-accent);
                border-color: transparent;
                color: white;
            }
            :host([variant="ghost"]) button {
                background: transparent;
                border-color: transparent;
            }
            :host([variant="ghost"]) button:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            :host([variant="outline"]) button {
                background: transparent;
            }
            
            /* Loading state */
            .loader {
                display: none;
                width: 16px;
                height: 16px;
                border: 2px solid transparent;
                border-top-color: currentColor;
                border-radius: 50%;
                margin-right: 8px;
                animation: spin 0.8s linear infinite;
            }
            :host([loading]) .loader {
                display: inline-block;
            }
            :host([loading]) button {
                pointer-events: none;
            }
            
            .content {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `);
        const btn = this.root.querySelector("button");
        // Spring press animation
        btn.addEventListener("mousedown", () => {
            springAnimate(1, 0.96, v => btn.style.transform = `scale(${v})`, snappySpring);
        });
        btn.addEventListener("mouseup", () => {
            springAnimate(0.96, 1, v => btn.style.transform = `scale(${v})`, snappySpring);
        });
        btn.addEventListener("mouseleave", () => {
            var _a, _b;
            springAnimate(parseFloat(((_b = (_a = btn.style.transform) === null || _a === void 0 ? void 0 : _a.match(/scale\(([\d.]+)\)/)) === null || _b === void 0 ? void 0 : _b[1]) || "1"), 1, v => btn.style.transform = `scale(${v})`, snappySpring);
        });
        // Ripple effect
        btn.addEventListener("click", (e) => {
            if (!this.hasAttribute("disabled")) {
                createRipple(e, btn);
            }
        });
    }
    attributeChangedCallback(name, _old, value) {
        const btn = this.root.querySelector("button");
        if (btn && name === "disabled") {
            btn.disabled = value !== null;
        }
    }
}
customElements.define("glass-button", GlassButton);
