import { BaseElement } from "../core/base-element.js";
export class GlassProgress extends BaseElement {
    static get observedAttributes() {
        return ["value", "max", "variant", "indeterminate"];
    }
    get value() { return parseFloat(this.getAttribute("value") || "0"); }
    set value(v) { this.setAttribute("value", String(v)); }
    get max() { return parseFloat(this.getAttribute("max") || "100"); }
    connectedCallback() {
        const variant = this.getAttribute("variant") || "linear";
        if (variant === "circular") {
            this.mountCircular();
        }
        else {
            this.mountLinear();
        }
    }
    mountLinear() {
        this.mount(`
            <div class="progress-track" role="progressbar" aria-valuenow="${this.value}" aria-valuemin="0" aria-valuemax="${this.max}">
                <div class="progress-fill"></div>
            </div>
            <span class="progress-label"><slot></slot></span>
        `, `
            :host {
                display: block;
            }
            .progress-track {
                height: 6px;
                background: rgba(255, 255, 255, 0.15);
                border-radius: 999px;
                overflow: hidden;
            }
            .progress-fill {
                height: 100%;
                background: var(--lg-accent);
                border-radius: 999px;
                transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            :host([indeterminate]) .progress-fill {
                width: 30% !important;
                animation: indeterminate 1.5s ease-in-out infinite;
            }
            .progress-label {
                display: block;
                margin-top: 0.5rem;
                font-size: 0.875rem;
                opacity: 0.7;
            }
            .progress-label:empty {
                display: none;
            }
            @keyframes indeterminate {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(400%); }
            }
        `);
        this.updateProgress();
    }
    mountCircular() {
        const size = 80;
        const strokeWidth = 6;
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        this.mount(`
            <div class="circular-wrapper">
                <svg class="circular-progress" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
                    <circle class="track" cx="${size / 2}" cy="${size / 2}" r="${radius}" />
                    <circle class="fill" cx="${size / 2}" cy="${size / 2}" r="${radius}" 
                        stroke-dasharray="${circumference}" 
                        stroke-dashoffset="${circumference}" />
                </svg>
                <span class="circular-label"><slot></slot></span>
            </div>
        `, `
            :host {
                display: inline-block;
            }
            .circular-wrapper {
                position: relative;
                display: inline-flex;
                align-items: center;
                justify-content: center;
            }
            .circular-progress {
                transform: rotate(-90deg);
            }
            .track {
                fill: none;
                stroke: rgba(255, 255, 255, 0.15);
                stroke-width: ${strokeWidth};
            }
            .fill {
                fill: none;
                stroke: url(#gradient) currentColor;
                stroke-width: ${strokeWidth};
                stroke-linecap: round;
                transition: stroke-dashoffset 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            :host([indeterminate]) .fill {
                animation: circular-spin 1.5s linear infinite;
                stroke-dashoffset: ${circumference * 0.75} !important;
            }
            :host([indeterminate]) .circular-progress {
                animation: rotate 2s linear infinite;
            }
            .circular-label {
                position: absolute;
                font-size: 1rem;
                font-weight: 600;
            }
            @keyframes circular-spin {
                0% { stroke-dashoffset: ${circumference}; }
                50% { stroke-dashoffset: ${circumference * 0.25}; }
                100% { stroke-dashoffset: ${circumference}; }
            }
            @keyframes rotate {
                100% { transform: rotate(270deg); }
            }
        `);
        // Add gradient definition
        const svg = this.root.querySelector("svg");
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        defs.innerHTML = `
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#5ac8fa" />
                <stop offset="100%" style="stop-color:#007aff" />
            </linearGradient>
        `;
        svg.prepend(defs);
        this.updateProgress();
    }
    updateProgress() {
        const percent = Math.min(100, Math.max(0, (this.value / this.max) * 100));
        const variant = this.getAttribute("variant") || "linear";
        if (variant === "circular") {
            const circle = this.root.querySelector(".fill");
            if (circle) {
                const radius = parseFloat(circle.getAttribute("r") || "37");
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (percent / 100) * circumference;
                circle.style.strokeDashoffset = String(offset);
            }
        }
        else {
            const fill = this.root.querySelector(".progress-fill");
            if (fill)
                fill.style.width = `${percent}%`;
        }
        const track = this.root.querySelector("[role='progressbar']");
        track === null || track === void 0 ? void 0 : track.setAttribute("aria-valuenow", String(this.value));
    }
    attributeChangedCallback(name) {
        if (name === "value" || name === "max") {
            this.updateProgress();
        }
    }
}
customElements.define("glass-progress", GlassProgress);
