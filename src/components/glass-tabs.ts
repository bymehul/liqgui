import { BaseElement } from "../core/base-element.js";
import { springAnimate, snappySpring } from "../core/spring-engine.js";

export class GlassTabs extends BaseElement {
  private indicator?: HTMLElement;

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
                border-radius: 999px;
                border: 1px solid var(--lg-border);
            }
            .indicator {
                position: absolute;
                top: 0.25rem;
                bottom: 0.25rem;
                left: 0;
                background: rgba(255, 255, 255, 0.15);
                border-radius: 999px;
                transition: none;
                pointer-events: none;
                will-change: transform, width;
            }
            ::slotted(button) {
                position: relative;
                padding: 0.6rem 1.2rem;
                border: none;
                background: transparent;
                color: inherit;
                font: inherit;
                cursor: pointer;
                border-radius: 999px;
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

    this.indicator = this.root.querySelector(".indicator")!;

    // Handle tab clicks
    this.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON") {
        this.selectTab(target);
      }
    });

    // Initialize first tab
    requestAnimationFrame(() => {
      const firstTab = this.querySelector("button");
      if (firstTab) this.selectTab(firstTab, false);
    });
  }

  private selectTab(tab: HTMLElement, animate = true) {
    // Update aria states
    this.querySelectorAll("button").forEach(btn =>
      btn.setAttribute("aria-selected", "false")
    );
    tab.setAttribute("aria-selected", "true");

    // Animate indicator
    const rect = tab.getBoundingClientRect();
    const containerRect = this.getBoundingClientRect();
    const relativeLeft = rect.left - containerRect.left;
    const width = rect.width;

    if (animate && this.indicator) {
      // Get current values
      const style = window.getComputedStyle(this.indicator);
      const matrix = new DOMMatrix(style.transform);
      const currentX = matrix.e;
      const currentWidth = this.indicator.getBoundingClientRect().width;

      springAnimate(currentX, relativeLeft, v => {
        this.indicator!.style.transform = `translateX(${v}px)`;
      }, snappySpring);

      springAnimate(currentWidth, width, v => {
        this.indicator!.style.width = `${v}px`;
      }, snappySpring);

    } else if (this.indicator) {
      this.indicator.style.width = `${width}px`;
      this.indicator.style.transform = `translateX(${relativeLeft}px)`;
    }

    // Dispatch event
    this.dispatchEvent(new CustomEvent("change", {
      detail: { value: tab.dataset.value || tab.textContent },
      bubbles: true
    }));
  }
}

customElements.define("glass-tabs", GlassTabs);
