import { BaseElement } from "../core/base-element.js";
export class GlassInput extends BaseElement {
    static get observedAttributes() {
        return ["placeholder", "type", "value", "disabled", "error"];
    }
    connectedCallback() {
        const placeholder = this.getAttribute("placeholder") || "";
        const type = this.getAttribute("type") || "text";
        const value = this.getAttribute("value") || "";
        this.mount(`
            <div class="input-wrapper">
                <input type="${type}" placeholder="${placeholder}" value="${value}" />
                <span class="focus-ring"></span>
                <span class="error-icon">!</span>
            </div>
            <span class="error-message"><slot name="error"></slot></span>
        `, `
            :host {
                display: block;
            }
            .input-wrapper {
                position: relative;
            }
            input {
                width: 100%;
                padding: 0.875rem 1rem;
                border-radius: var(--lg-radius);
                background: var(--lg-bg);
                backdrop-filter: blur(var(--lg-blur));
                -webkit-backdrop-filter: blur(var(--lg-blur));
                border: 1px solid var(--lg-border);
                color: inherit;
                font: inherit;
                outline: none;
                transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                box-sizing: border-box;
            }
            input::placeholder {
                color: rgba(255, 255, 255, 0.4);
            }
            input:hover {
                border-color: rgba(255, 255, 255, 0.4);
            }
            input:focus {
                border-color: var(--lg-accent-focus, #5ac8fa);
                box-shadow: 0 0 0 3px rgba(90, 200, 250, 0.2);
            }
            input:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            /* Focus ring animation */
            .focus-ring {
                position: absolute;
                inset: -2px;
                border-radius: calc(var(--lg-radius) + 2px);
                border: 2px solid var(--lg-accent-focus, #5ac8fa);
                opacity: 0;
                transform: scale(0.98);
                transition: all 0.2s ease;
                pointer-events: none;
            }
            input:focus ~ .focus-ring {
                opacity: 1;
                transform: scale(1);
            }
            
            /* Error state */
            :host([error]) input {
                border-color: #ff453a;
            }
            :host([error]) input:focus {
                box-shadow: 0 0 0 3px rgba(255, 69, 58, 0.2);
            }
            .error-icon {
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                width: 20px;
                height: 20px;
                background: #ff453a;
                border-radius: 50%;
                color: white;
                font-size: 14px;
                font-weight: bold;
                display: none;
                align-items: center;
                justify-content: center;
            }
            :host([error]) .error-icon {
                display: flex;
            }
            .error-message {
                display: block;
                color: #ff453a;
                font-size: 0.85em;
                margin-top: 0.5rem;
                opacity: 0;
                transform: translateY(-5px);
                transition: all 0.2s ease;
            }
            :host([error]) .error-message {
                opacity: 1;
                transform: translateY(0);
            }
        `);
        // Sync input events to host
        const input = this.root.querySelector("input");
        input.addEventListener("input", () => {
            this.dispatchEvent(new CustomEvent("input", {
                detail: { value: input.value },
                bubbles: true
            }));
        });
        input.addEventListener("change", () => {
            this.dispatchEvent(new CustomEvent("change", {
                detail: { value: input.value },
                bubbles: true
            }));
        });
    }
    get value() {
        var _a;
        return ((_a = this.root.querySelector("input")) === null || _a === void 0 ? void 0 : _a.value) || "";
    }
    set value(val) {
        const input = this.root.querySelector("input");
        if (input)
            input.value = val;
    }
    attributeChangedCallback(name, _old, value) {
        const input = this.root.querySelector("input");
        if (!input)
            return;
        if (name === "disabled") {
            input.disabled = value !== null;
        }
        else if (name === "placeholder") {
            input.placeholder = value || "";
        }
        else if (name === "value") {
            input.value = value || "";
        }
        else if (name === "type") {
            input.type = value || "text";
        }
    }
}
customElements.define("glass-input", GlassInput);
