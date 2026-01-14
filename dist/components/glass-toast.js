import { BaseElement } from "../core/base-element.js";
import { motion } from "../core/motion.js";
export class GlassToast extends BaseElement {
    static get observedAttributes() {
        return ["variant", "duration"];
    }
    connectedCallback() {
        var _a;
        const variant = this.getAttribute("variant") || "info";
        const duration = parseInt(this.getAttribute("duration") || "4000");
        this.mount(`
            <div class="toast ${variant}">
                <span class="icon">${this.getIcon(variant)}</span>
                <div class="content">
                    <slot></slot>
                </div>
                <button class="close" aria-label="Dismiss">×</button>
                <div class="progress"></div>
            </div>
        `, `
            :host {
                position: fixed;
                bottom: 1.5rem;
                right: 1.5rem;
                z-index: 10000;
            }
            .toast {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem 1.25rem;
                background: var(--lg-bg);
                backdrop-filter: blur(var(--lg-blur));
                -webkit-backdrop-filter: blur(var(--lg-blur));
                border-radius: var(--lg-radius);
                border: 1px solid var(--lg-border);
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                min-width: 280px;
                max-width: 400px;
                overflow: hidden;
            }
            .icon {
                font-size: 1.25rem;
                flex-shrink: 0;
            }
            .content {
                flex: 1;
                line-height: 1.4;
            }
            .close {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0.5;
                padding: 0;
                line-height: 1;
                transition: opacity 0.2s;
            }
            .close:hover {
                opacity: 1;
            }
            .progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: var(--accent-color, rgba(255, 255, 255, 0.5));
                animation: progress ${duration}ms linear forwards;
            }
            
            /* Variants */
            .toast.success { --accent-color: #30d158; }
            .toast.success .icon { color: #30d158; }
            
            .toast.error { --accent-color: #ff453a; }
            .toast.error .icon { color: #ff453a; }
            
            .toast.warning { --accent-color: #ffd60a; }
            .toast.warning .icon { color: #ffd60a; }
            
            .toast.info { --accent-color: #5ac8fa; }
            .toast.info .icon { color: #5ac8fa; }
            
            @keyframes progress {
                from { width: 100%; }
                to { width: 0%; }
            }
        `);
        // Animate in
        const toast = this.root.querySelector(".toast");
        motion.slideInUp(toast, 300);
        // Close button
        (_a = this.root.querySelector(".close")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.dismiss());
        // Auto dismiss
        if (duration > 0) {
            setTimeout(() => this.dismiss(), duration);
        }
    }
    getIcon(variant) {
        const icons = {
            success: "✓",
            error: "✕",
            warning: "⚠",
            info: "ℹ"
        };
        return icons[variant] || icons.info;
    }
    dismiss() {
        const toast = this.root.querySelector(".toast");
        if (toast) {
            motion.slideOutDown(toast, 200).finished.then(() => this.remove());
        }
        else {
            this.remove();
        }
    }
    // Static helper for creating toasts
    static show(message, variant = "info") {
        const toast = document.createElement("glass-toast");
        toast.setAttribute("variant", variant);
        toast.textContent = message;
        document.body.appendChild(toast);
        return toast;
    }
}
customElements.define("glass-toast", GlassToast);
