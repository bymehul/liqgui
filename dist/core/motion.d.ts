export declare const motion: {
    animate(element: HTMLElement, keyframes: Keyframe[], options: KeyframeAnimationOptions): Animation;
    fadeIn(element: HTMLElement, duration?: number): Animation;
    fadeOut(element: HTMLElement, duration?: number): Animation;
    scaleIn(element: HTMLElement, duration?: number): Animation;
    scaleOut(element: HTMLElement, duration?: number): Animation;
    slideInUp(element: HTMLElement, duration?: number): Animation;
    slideOutDown(element: HTMLElement, duration?: number): Animation;
    blurIn(element: HTMLElement, duration?: number): Animation;
    shimmer(element: HTMLElement): Animation;
    pulseGlow(element: HTMLElement): Animation;
};
