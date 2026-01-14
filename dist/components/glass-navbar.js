import { BaseElement } from "../core/base-element.js";
export class GlassNavbar extends BaseElement {
    constructor() {
        super(...arguments);
        this.lastScroll = 0;
    }
    connectedCallback() {
        this.mount(`
            <nav>
                <div class="brand"><slot name="brand"></slot></div>
                <div class="content"><slot></slot></div>
                <div class="actions"><slot name="actions"></slot></div>
            </nav>
        `, `
            :host {
                display: block;
                position: sticky;
                top: 0;
                z-index: 100;
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            :host([hidden-nav]) {
                transform: translateY(-100%);
            }
            nav {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 2rem;
                padding: 1rem 2rem;
                background: var(--lg-bg);
                backdrop-filter: blur(var(--lg-blur));
                -webkit-backdrop-filter: blur(var(--lg-blur));
                border-bottom: 1px solid var(--lg-border);
                transition: all 0.3s ease;
            }
            :host([scrolled]) nav {
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
            }
            .brand {
                font-weight: 700;
                font-size: 1.2rem;
            }
            .content {
                display: flex;
                align-items: center;
                gap: 1.5rem;
            }
            .actions {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            ::slotted(a) {
                text-decoration: none;
                color: inherit;
                opacity: 0.8;
                transition: opacity 0.2s;
            }
            ::slotted(a:hover) {
                opacity: 1;
            }
        `);
        // Auto-hide on scroll
        if (this.hasAttribute("auto-hide")) {
            window.addEventListener("scroll", this.handleScroll.bind(this), { passive: true });
        }
        // Scrolled state
        window.addEventListener("scroll", () => {
            this.toggleAttribute("scrolled", window.scrollY > 10);
        }, { passive: true });
    }
    handleScroll() {
        const currentScroll = window.scrollY;
        if (currentScroll > this.lastScroll && currentScroll > 100) {
            this.setAttribute("hidden-nav", "");
        }
        else {
            this.removeAttribute("hidden-nav");
        }
        this.lastScroll = currentScroll;
    }
}
customElements.define("glass-navbar", GlassNavbar);
