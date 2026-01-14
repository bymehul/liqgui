import { BaseElement } from "../core/base-element.js";
import { springAnimateMulti, gentleSpring } from "../core/spring-engine.js";

export class GlassCard extends BaseElement {
  private cancelTilt?: () => void;

  static get observedAttributes() {
    return ["no-tilt", "glow"];
  }

  connectedCallback() {
    this.mount(`
            <div class="card-glow"></div>
            <div class="card-content">
                <slot></slot>
            </div>
        `, `
            :host {
                display: block;
                position: relative;
                transform-style: preserve-3d;
                perspective: 1000px;
            }
            .card-content {
                position: relative;
                background: var(--lg-bg);
                backdrop-filter: blur(var(--lg-blur));
                -webkit-backdrop-filter: blur(var(--lg-blur));
                border-radius: var(--lg-radius);
                border: 1px solid var(--lg-border);
                box-shadow: var(--lg-shadow);
                padding: 1.5rem;
                transition: transform 0.1s ease-out, box-shadow 0.3s ease;
                overflow: hidden;
            }
            .card-content::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 1px;
                background: linear-gradient(90deg, 
                    transparent, 
                    rgba(255, 255, 255, 0.5), 
                    transparent
                );
            }
            :host(:hover) .card-content {
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
            }
            .card-glow {
                position: absolute;
                inset: -4px;
                background: var(--lg-accent);
                filter: blur(20px);
                opacity: 0;
                z-index: -1;
                border-radius: var(--lg-radius);
                transition: opacity 0.4s ease;
            }
            :host([glow]:hover) .card-glow {
                opacity: 0.4;
            }
        `);

    if (!this.hasAttribute("no-tilt")) {
      this.setupTiltEffect();
    }
  }

  private setupTiltEffect() {
    const card = this.root.querySelector<HTMLElement>(".card-content")!;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    const handleMove = (e: MouseEvent) => {
      const rect = this.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      targetRotateX = ((e.clientY - centerY) / (rect.height / 2)) * -8;
      targetRotateY = ((e.clientX - centerX) / (rect.width / 2)) * 8;
    };

    const handleLeave = () => {
      this.cancelTilt = springAnimateMulti(
        [currentRotateX, currentRotateY],
        [0, 0],
        ([rx, ry]) => {
          currentRotateX = rx;
          currentRotateY = ry;
          card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        },
        gentleSpring
      );
    };

    // Smooth animation loop for tilt
    const animate = () => {
      currentRotateX += (targetRotateX - currentRotateX) * 0.1;
      currentRotateY += (targetRotateY - currentRotateY) * 0.1;
      card.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
      requestAnimationFrame(animate);
    };

    this.addEventListener("mousemove", handleMove);
    this.addEventListener("mouseleave", handleLeave);
    animate();
  }

  disconnectedCallback() {
    this.cancelTilt?.();
  }
}

customElements.define("glass-card", GlassCard);
