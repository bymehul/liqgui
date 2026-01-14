import { BaseElement } from "../core/base-element.js";

export class GlassAvatar extends BaseElement {
    static get observedAttributes() {
        return ["src", "alt", "size", "status"];
    }

    connectedCallback() {
        const src = this.getAttribute("src");
        const alt = this.getAttribute("alt") || "";
        const size = this.getAttribute("size") || "md";
        const status = this.getAttribute("status");

        this.mount(`
            <div class="avatar ${size}">
                ${src
                ? `<img src="${src}" alt="${alt}" />`
                : `<span class="initials"><slot></slot></span>`
            }
                ${status ? `<span class="status ${status}"></span>` : ""}
            </div>
        `, `
            :host {
                display: inline-block;
            }
            .avatar {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: var(--lg-bg);
                backdrop-filter: blur(var(--lg-blur));
                border: 2px solid var(--lg-border);
                overflow: hidden;
            }
            
            /* Sizes */
            .avatar.xs { width: 24px; height: 24px; font-size: 0.625rem; }
            .avatar.sm { width: 32px; height: 32px; font-size: 0.75rem; }
            .avatar.md { width: 40px; height: 40px; font-size: 0.875rem; }
            .avatar.lg { width: 56px; height: 56px; font-size: 1.125rem; }
            .avatar.xl { width: 80px; height: 80px; font-size: 1.5rem; }
            
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .initials {
                font-weight: 600;
                text-transform: uppercase;
                color: rgba(255, 255, 255, 0.9);
            }
            .status {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 25%;
                height: 25%;
                min-width: 8px;
                min-height: 8px;
                border-radius: 50%;
                border: 2px solid rgba(18, 18, 22, 0.9);
            }
            .status.online { background: #30d158; }
            .status.offline { background: #8e8e93; }
            .status.busy { background: #ff453a; }
            .status.away { background: #ffd60a; }
        `);
    }

    attributeChangedCallback() {
        // Re-render on attribute changes
        if (this.isConnected) {
            this.connectedCallback();
        }
    }
}

customElements.define("glass-avatar", GlassAvatar);

// Avatar group for stacking
export class GlassAvatarGroup extends BaseElement {
    connectedCallback() {
        this.mount(`<slot></slot>`, `
            :host {
                display: inline-flex;
                flex-direction: row-reverse;
            }
            ::slotted(glass-avatar) {
                margin-left: -0.75rem;
                transition: transform 0.2s ease;
            }
            ::slotted(glass-avatar:hover) {
                transform: translateY(-4px);
                z-index: 1;
            }
            ::slotted(glass-avatar:last-child) {
                margin-left: 0;
            }
        `);
    }
}

customElements.define("glass-avatar-group", GlassAvatarGroup);
