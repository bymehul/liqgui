import { BaseElement } from "../core/base-element.js";
import { springAnimate, snappySpring } from "../core/spring-engine.js";
export class GlassTabs extends BaseElement {
    static get observedAttributes() {
        return ["value"];
    }
    connectedCallback() {
        this.mount(`
            <div class="tabs-container">
                <div class="indicator"></div>
                <slot></slot>
            </div>
        `, `
            :host {
                display: inline-block;
            }
            .tabs-container {
                position: relative;
                display: flex;
                gap: 0.25rem;
                padding: 0.25rem;
                background: var(--lg-bg);
                backdrop-filter: blur(var(--lg-blur));
                -webkit-backdrop-filter: blur(var(--lg-blur));
                border-radius: var(--lg-radius);
                border: 1px solid var(--lg-border);
            }
            .indicator {
                position: absolute;
                top: 0.25rem;
                bottom: 0.25rem;
                left: 0;
                width: 1px; /* Base width for scaling */
                background: rgba(255, 255, 255, 0.15);
                border-radius: calc(var(--lg-radius) - 4px);
                transition: none;
                pointer-events: none;
                transform-origin: 0 0;
                will-change: transform;
            }
            ::slotted(button) {
                position: relative;
                padding: 0.6rem 1.2rem;
                border: none;
                background: transparent;
                color: inherit;
                font: inherit;
                cursor: pointer;
                border-radius: calc(var(--lg-radius) - 4px);
                opacity: 0.7;
                transition: opacity 0.2s;
                z-index: 1;
            }
            ::slotted(button:hover) {
                opacity: 1;
            }
            ::slotted(button:focus-visible) {
                 outline: none;
                 background: rgba(255, 255, 255, 0.1);
            }
            ::slotted(button[aria-selected="true"]) {
                opacity: 1;
            }
        `);
        this.indicator = this.root.querySelector(".indicator");
        // Handle tab clicks
        this.addEventListener("click", (e) => {
            const target = e.target;
            if (target.tagName === "BUTTON") {
                this.selectTab(target);
            }
        });
        // Initialize first tab
        requestAnimationFrame(() => {
            const firstTab = this.querySelector("button");
            if (firstTab)
                this.selectTab(firstTab, false);
        });
    }
    selectTab(tab, animate = true) {
        // Update aria states
        this.querySelectorAll("button").forEach(btn => btn.setAttribute("aria-selected", "false"));
        tab.setAttribute("aria-selected", "true");
        // Animate indicator
        const rect = tab.getBoundingClientRect();
        const containerRect = this.getBoundingClientRect();
        const relativeLeft = rect.left - containerRect.left;
        const width = rect.width;
        // We want to animate from current transform to new transform
        // New transform: translate(relativeLeft px) scaleX(width)
        // Note: The indicator has base width 1px, so scaleX = target width
        if (animate && this.indicator) {
            // Get current transform values
            const style = window.getComputedStyle(this.indicator);
            const matrix = new DOMMatrix(style.transform);
            const currentX = matrix.e;
            const currentScale = matrix.a;
            springAnimate(currentX, relativeLeft, v => {
                const currentWidth = parseFloat(this.indicator.getAttribute('data-width') || '0');
                // We need to synchronize the two animations, but springAnimate runs independently.
                // A better approach for concurrent related springs is needed, 
                // but for now we'll rely on the fact that both use the same physics config.
                this.indicator.style.transform = `translateX(${v}px) scaleX(${currentWidth})`;
            }, snappySpring);
            springAnimate(currentScale, width, v => {
                const currentPos = new DOMMatrix(getComputedStyle(this.indicator).transform).e;
                this.indicator.setAttribute('data-width', v.toString());
                this.indicator.style.transform = `translateX(${currentPos}px) scaleX(${v})`;
            }, snappySpring);
        }
        else if (this.indicator) {
            this.indicator.setAttribute('data-width', width.toString());
            this.indicator.style.transform = `translateX(${relativeLeft}px) scaleX(${width})`;
        }
        // Dispatch event
        this.dispatchEvent(new CustomEvent("change", {
            detail: { value: tab.dataset.value || tab.textContent },
            bubbles: true
        }));
    }
}
customElements.define("glass-tabs", GlassTabs);
