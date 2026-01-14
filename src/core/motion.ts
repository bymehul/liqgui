import { liquidCurves, durations } from "./curves.js";

export const motion = {
    animate(
        element: HTMLElement,
        keyframes: Keyframe[],
        options: KeyframeAnimationOptions
    ): Animation {
        return element.animate(keyframes, options);
    },

    fadeIn(element: HTMLElement, duration: number = durations.normal): Animation {
        return element.animate(
            [{ opacity: 0 }, { opacity: 1 }],
            { duration, easing: liquidCurves.decelerate, fill: "forwards" }
        );
    },

    fadeOut(element: HTMLElement, duration: number = durations.normal): Animation {
        return element.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { duration, easing: liquidCurves.accelerate, fill: "forwards" }
        );
    },

    scaleIn(element: HTMLElement, duration: number = durations.normal): Animation {
        return element.animate(
            [
                { opacity: 0, transform: "scale(0.9)" },
                { opacity: 1, transform: "scale(1)" }
            ],
            { duration, easing: liquidCurves.glassIn, fill: "forwards" }
        );
    },

    scaleOut(element: HTMLElement, duration: number = durations.normal): Animation {
        return element.animate(
            [
                { opacity: 1, transform: "scale(1)" },
                { opacity: 0, transform: "scale(0.9)" }
            ],
            { duration, easing: liquidCurves.glassOut, fill: "forwards" }
        );
    },

    slideInUp(element: HTMLElement, duration: number = durations.slow): Animation {
        return element.animate(
            [
                { opacity: 0, transform: "translateY(20px)" },
                { opacity: 1, transform: "translateY(0)" }
            ],
            { duration, easing: liquidCurves.glassIn, fill: "forwards" }
        );
    },

    slideOutDown(element: HTMLElement, duration: number = durations.slow): Animation {
        return element.animate(
            [
                { opacity: 1, transform: "translateY(0)" },
                { opacity: 0, transform: "translateY(20px)" }
            ],
            { duration, easing: liquidCurves.glassOut, fill: "forwards" }
        );
    },

    blurIn(element: HTMLElement, duration: number = durations.slow): Animation {
        return element.animate(
            [
                { opacity: 0, filter: "blur(10px)" },
                { opacity: 1, filter: "blur(0px)" }
            ],
            { duration, easing: liquidCurves.decelerate, fill: "forwards" }
        );
    },

    shimmer(element: HTMLElement): Animation {
        return element.animate(
            [
                { backgroundPosition: "-200% 0" },
                { backgroundPosition: "200% 0" }
            ],
            { duration: 1500, iterations: Infinity, easing: "linear" }
        );
    },

    pulseGlow(element: HTMLElement): Animation {
        return element.animate(
            [
                { boxShadow: "0 0 0 0 rgba(90, 200, 250, 0.4)" },
                { boxShadow: "0 0 0 10px rgba(90, 200, 250, 0)" }
            ],
            { duration: 1000, iterations: Infinity, easing: liquidCurves.standard }
        );
    }
};
