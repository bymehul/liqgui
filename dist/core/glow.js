// Glow effect CSS
export const glowCSS = (accent) => `
  position: absolute;
  inset: -2px;
  background: ${accent};
  filter: blur(12px);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: -1;
  border-radius: inherit;
`;
// Ripple effect
export function createRipple(event, element, color = "rgba(255, 255, 255, 0.4)") {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const ripple = document.createElement("span");
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: ${color};
        border-radius: 50%;
        transform: scale(0);
        opacity: 1;
        pointer-events: none;
        animation: ripple-expand 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `;
    element.style.position = "relative";
    element.style.overflow = "hidden";
    element.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
}
// Inject ripple keyframes
export function injectRippleStyles() {
    if (document.getElementById("lg-ripple-styles"))
        return;
    const style = document.createElement("style");
    style.id = "lg-ripple-styles";
    style.textContent = `
        @keyframes ripple-expand {
            to {
                transform: scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
// Init on load
if (typeof document !== "undefined") {
    injectRippleStyles();
}
