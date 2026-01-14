import { BaseElement } from "../core/base-element.js";
import { springAnimate, snappySpring } from "../core/spring-engine.js";
export class GlassSlider extends BaseElement {
    constructor() {
        super(...arguments);
        this.isDragging = false;
    }
    static get observedAttributes() {
        return ["value", "min", "max", "step", "disabled"];
    }
    get min() { return parseFloat(this.getAttribute("min") || "0"); }
    get max() { return parseFloat(this.getAttribute("max") || "100"); }
    get step() { return parseFloat(this.getAttribute("step") || "1"); }
    get value() { return parseFloat(this.getAttribute("value") || "50"); }
    set value(v) { this.setAttribute("value", String(v)); }
    connectedCallback() {
        this.mount(`
            <div class="slider" role="slider" tabindex="0"
                 aria-valuemin="${this.min}" 
                 aria-valuemax="${this.max}" 
                 aria-valuenow="${this.value}">
                <div class="track">
                    <div class="fill"></div>
                </div>
                <div class="thumb"></div>
            </div>
        `, `
            :host {
                display: block;
                padding: 0.5rem 0;
            }
            .slider {
                position: relative;
                height: 24px;
                display: flex;
                align-items: center;
                cursor: pointer;
            }
            .slider:focus-visible .thumb {
                outline: 2px solid var(--lg-accent-focus, #5ac8fa);
                outline-offset: 2px;
            }
            :host([disabled]) .slider {
                opacity: 0.5;
                cursor: not-allowed;
            }
            .track {
                position: absolute;
                left: 0;
                right: 0;
                height: 6px;
                background: rgba(255, 255, 255, 0.15);
                border-radius: 999px;
                overflow: hidden;
            }
            .fill {
                height: 100%;
                background: var(--lg-accent);
                border-radius: 999px;
                transition: width 0.1s ease-out;
            }
            .thumb {
                position: absolute;
                width: 20px;
                height: 20px;
                background: white;
                border-radius: 50%;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                transform: translateX(-50%);
                transition: transform 0.1s ease;
            }
            .thumb:hover {
                transform: translateX(-50%) scale(1.1);
            }
            .slider:active .thumb {
                transform: translateX(-50%) scale(0.95);
            }
        `);
        this.track = this.root.querySelector(".track");
        this.thumb = this.root.querySelector(".thumb");
        this.fill = this.root.querySelector(".fill");
        this.updateUI(false);
        this.setupInteraction();
    }
    setupInteraction() {
        const slider = this.root.querySelector(".slider");
        const updateFromEvent = (e) => {
            if (this.hasAttribute("disabled"))
                return;
            const rect = this.track.getBoundingClientRect();
            const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            const rawValue = this.min + percent * (this.max - this.min);
            const steppedValue = Math.round(rawValue / this.step) * this.step;
            this.value = Math.max(this.min, Math.min(this.max, steppedValue));
        };
        slider.addEventListener("mousedown", (e) => {
            this.isDragging = true;
            updateFromEvent(e);
        });
        slider.addEventListener("touchstart", (e) => {
            this.isDragging = true;
            updateFromEvent(e);
        }, { passive: true });
        window.addEventListener("mousemove", (e) => {
            if (this.isDragging)
                updateFromEvent(e);
        });
        window.addEventListener("touchmove", (e) => {
            if (this.isDragging)
                updateFromEvent(e);
        }, { passive: true });
        window.addEventListener("mouseup", () => this.isDragging = false);
        window.addEventListener("touchend", () => this.isDragging = false);
        // Keyboard support
        slider.addEventListener("keydown", (e) => {
            const key = e.key;
            if (this.hasAttribute("disabled"))
                return;
            let newValue = this.value;
            if (key === "ArrowRight" || key === "ArrowUp") {
                newValue = Math.min(this.max, this.value + this.step);
            }
            else if (key === "ArrowLeft" || key === "ArrowDown") {
                newValue = Math.max(this.min, this.value - this.step);
            }
            else if (key === "Home") {
                newValue = this.min;
            }
            else if (key === "End") {
                newValue = this.max;
            }
            else {
                return;
            }
            e.preventDefault();
            this.value = newValue;
        });
    }
    updateUI(animate = true) {
        const percent = ((this.value - this.min) / (this.max - this.min)) * 100;
        if (this.fill)
            this.fill.style.width = `${percent}%`;
        if (this.thumb) {
            if (animate && !this.isDragging) {
                const currentLeft = parseFloat(this.thumb.style.left) || 0;
                springAnimate(currentLeft, percent, v => {
                    this.thumb.style.left = `${v}%`;
                }, snappySpring);
            }
            else {
                this.thumb.style.left = `${percent}%`;
            }
        }
        const slider = this.root.querySelector(".slider");
        slider === null || slider === void 0 ? void 0 : slider.setAttribute("aria-valuenow", String(this.value));
    }
    attributeChangedCallback(name) {
        if (name === "value") {
            this.updateUI();
            this.dispatchEvent(new CustomEvent("input", {
                detail: { value: this.value },
                bubbles: true
            }));
        }
    }
}
customElements.define("glass-slider", GlassSlider);
