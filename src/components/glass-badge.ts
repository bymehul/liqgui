import { BaseElement } from "../core/base-element.js";

export class GlassBadge extends BaseElement {
    static get observedAttributes() {
        return ["variant", "size", "dot"];
    }

    connectedCallback() {
        const variant = this.getAttribute("variant") || "default";
        const size = this.getAttribute("size") || "md";
        const isDot = this.hasAttribute("dot");

        this.mount(`
            <span class="badge ${variant} ${size} ${isDot ? 'dot' : ''}">
                ${isDot ? '' : '<slot></slot>'}
            </span>
        `, `
            :host {
                display: inline-block;
            }
            .badge {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 0.25rem 0.6rem;
                border-radius: 999px;
                font-size: 0.75rem;
                font-weight: 600;
                background: var(--lg-bg);
                backdrop-filter: blur(var(--lg-blur));
                border: 1px solid var(--lg-border);
            }
            
            /* Sizes */
            .badge.sm { padding: 0.125rem 0.4rem; font-size: 0.625rem; }
            .badge.md { padding: 0.25rem 0.6rem; font-size: 0.75rem; }
            .badge.lg { padding: 0.375rem 0.75rem; font-size: 0.875rem; }
            
            /* Dot mode */
            .badge.dot {
                width: 8px;
                height: 8px;
                padding: 0;
                min-width: 8px;
            }
            .badge.dot.sm { width: 6px; height: 6px; }
            .badge.dot.lg { width: 10px; height: 10px; }
            
            /* Variants */
            .badge.default {
                background: rgba(255, 255, 255, 0.15);
            }
            .badge.primary {
                background: var(--lg-accent);
                border-color: transparent;
                color: white;
            }
            .badge.success {
                background: rgba(48, 209, 88, 0.2);
                border-color: rgba(48, 209, 88, 0.4);
                color: #30d158;
            }
            .badge.warning {
                background: rgba(255, 214, 10, 0.2);
                border-color: rgba(255, 214, 10, 0.4);
                color: #ffd60a;
            }
            .badge.error {
                background: rgba(255, 69, 58, 0.2);
                border-color: rgba(255, 69, 58, 0.4);
                color: #ff453a;
            }
            .badge.info {
                background: rgba(90, 200, 250, 0.2);
                border-color: rgba(90, 200, 250, 0.4);
                color: #5ac8fa;
            }
            
            /* Dot variants */
            .badge.dot.success { background: #30d158; }
            .badge.dot.warning { background: #ffd60a; }
            .badge.dot.error { background: #ff453a; }
            .badge.dot.info { background: #5ac8fa; }
            .badge.dot.primary { background: #007aff; }
        `);
    }
}

customElements.define("glass-badge", GlassBadge);

// Badge wrapper for adding badge to other elements
export class GlassBadgeWrapper extends BaseElement {
    static get observedAttributes() {
        return ["count", "variant", "max", "dot"];
    }

    connectedCallback() {
        const count = parseInt(this.getAttribute("count") || "0");
        const max = parseInt(this.getAttribute("max") || "99");
        const variant = this.getAttribute("variant") || "error";
        const isDot = this.hasAttribute("dot");
        const displayCount = count > max ? `${max}+` : String(count);

        this.mount(`
            <div class="wrapper">
                <slot></slot>
                ${(count > 0 || isDot) ? `
                    <span class="badge ${variant} ${isDot ? 'dot' : ''}">
                        ${isDot ? '' : displayCount}
                    </span>
                ` : ''}
            </div>
        `, `
            :host {
                display: inline-block;
            }
            .wrapper {
                position: relative;
                display: inline-block;
            }
            .badge {
                position: absolute;
                top: -4px;
                right: -4px;
                min-width: 18px;
                height: 18px;
                padding: 0 5px;
                border-radius: 999px;
                font-size: 0.625rem;
                font-weight: 700;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid rgba(18, 18, 22, 0.9);
                z-index: 1;
            }
            .badge.dot {
                width: 10px;
                height: 10px;
                min-width: 10px;
                padding: 0;
                top: -2px;
                right: -2px;
            }
            .badge.error { background: #ff453a; color: white; }
            .badge.success { background: #30d158; color: white; }
            .badge.warning { background: #ffd60a; color: black; }
            .badge.info { background: #5ac8fa; color: white; }
            .badge.primary { background: #007aff; color: white; }
        `);
    }

    attributeChangedCallback() {
        if (this.isConnected) {
            this.connectedCallback();
        }
    }
}

customElements.define("glass-badge-wrapper", GlassBadgeWrapper);
