import { BaseElement } from "../core/base-element.js";
import { springAnimate, bouncySpring } from "../core/spring-engine.js";
export class GlassToggle extends BaseElement {
    static get observedAttributes() {
        return ["checked", "disabled"];
    }
    connectedCallback() {
        this.mount(`
            <button role="switch" aria-checked="false">
                <span class="track">
                    <span class="thumb"></span>
                </span>
                <span class="label"><slot></slot></span>
            </button>
        `, `
            :host {
                display: inline-block;
            }
            button {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                background: none;
                border: none;
                color: inherit;
                font: inherit;
                cursor: pointer;
                padding: 0;
            }
            button:focus-visible .track {
                outline: 2px solid var(--lg-accent-focus, #5ac8fa);
                outline-offset: 2px;
            }
            button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            .track {
                position: relative;
                width: 52px;
                height: 32px;
                background: rgba(255, 255, 255, 0.15);
                border-radius: 999px;
                border: 1px solid var(--lg-border);
                transition: background 0.3s ease;
            }
            .thumb {
                position: absolute;
                top: 3px;
                left: 3px;
                width: 24px;
                height: 24px;
                background: white;
                border-radius: 50%;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            }
            :host([checked]) .track {
                background: var(--lg-accent);
            }
            .label {
                user-select: none;
            }
        `);
        const button = this.root.querySelector("button");
        const thumb = this.root.querySelector(".thumb");
        button.addEventListener("click", () => {
            if (this.hasAttribute("disabled"))
                return;
            this.toggleAttribute("checked");
        });
        // Spring animation for thumb
        this.updateThumb(thumb, false);
    }
    updateThumb(thumb, animate = true) {
        const checked = this.hasAttribute("checked");
        const target = checked ? 21 : 3;
        if (animate) {
            const current = parseFloat(thumb.style.left) || 3;
            springAnimate(current, target, v => {
                thumb.style.left = `${v}px`;
            }, bouncySpring);
        }
        else {
            thumb.style.left = `${target}px`;
        }
        const button = this.root.querySelector("button");
        button === null || button === void 0 ? void 0 : button.setAttribute("aria-checked", String(checked));
    }
    attributeChangedCallback(name) {
        if (name === "checked") {
            const thumb = this.root.querySelector(".thumb");
            if (thumb)
                this.updateThumb(thumb);
            this.dispatchEvent(new CustomEvent("change", {
                detail: { checked: this.hasAttribute("checked") },
                bubbles: true
            }));
        }
        if (name === "disabled") {
            const button = this.root.querySelector("button");
            if (button)
                button.disabled = this.hasAttribute("disabled");
        }
    }
    get checked() {
        return this.hasAttribute("checked");
    }
    set checked(value) {
        this.toggleAttribute("checked", value);
    }
}
customElements.define("glass-toggle", GlassToggle);
