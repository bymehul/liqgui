import { liquidCurves, durations } from "./curves.js";
export const motion = {
    // Basic animation
    animate(element, keyframes, options) {
        return element.animate(keyframes, options);
    },
    // Fade in animation
    fadeIn(element, duration = durations.normal) {
        return element.animate([{ opacity: 0 }, { opacity: 1 }], { duration, easing: liquidCurves.decelerate, fill: "forwards" });
    },
    // Fade out animation
    fadeOut(element, duration = durations.normal) {
        return element.animate([{ opacity: 1 }, { opacity: 0 }], { duration, easing: liquidCurves.accelerate, fill: "forwards" });
    },
    // Scale in animation (from smaller)
    scaleIn(element, duration = durations.normal) {
        return element.animate([
            { opacity: 0, transform: "scale(0.9)" },
            { opacity: 1, transform: "scale(1)" }
        ], { duration, easing: liquidCurves.glassIn, fill: "forwards" });
    },
    // Scale out animation
    scaleOut(element, duration = durations.normal) {
        return element.animate([
            { opacity: 1, transform: "scale(1)" },
            { opacity: 0, transform: "scale(0.9)" }
        ], { duration, easing: liquidCurves.glassOut, fill: "forwards" });
    },
    // Slide in from bottom
    slideInUp(element, duration = durations.slow) {
        return element.animate([
            { opacity: 0, transform: "translateY(20px)" },
            { opacity: 1, transform: "translateY(0)" }
        ], { duration, easing: liquidCurves.glassIn, fill: "forwards" });
    },
    // Slide out to bottom
    slideOutDown(element, duration = durations.slow) {
        return element.animate([
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0, transform: "translateY(20px)" }
        ], { duration, easing: liquidCurves.glassOut, fill: "forwards" });
    },
    // Blur in animation
    blurIn(element, duration = durations.slow) {
        return element.animate([
            { opacity: 0, filter: "blur(10px)" },
            { opacity: 1, filter: "blur(0px)" }
        ], { duration, easing: liquidCurves.decelerate, fill: "forwards" });
    },
    // Shimmer effect for loading states
    shimmer(element) {
        return element.animate([
            { backgroundPosition: "-200% 0" },
            { backgroundPosition: "200% 0" }
        ], { duration: 1500, iterations: Infinity, easing: "linear" });
    },
    // Pulse glow effect
    pulseGlow(element) {
        return element.animate([
            { boxShadow: "0 0 0 0 rgba(90, 200, 250, 0.4)" },
            { boxShadow: "0 0 0 10px rgba(90, 200, 250, 0)" }
        ], { duration: 1000, iterations: Infinity, easing: liquidCurves.standard });
    }
};
