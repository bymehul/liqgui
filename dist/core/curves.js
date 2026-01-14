// Premium easing curves for liquid glass animations
export const liquidCurves = {
    // Standard curves
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    emphasized: "cubic-bezier(0.2, 0, 0, 1)",
    decelerate: "cubic-bezier(0, 0, 0.2, 1)",
    accelerate: "cubic-bezier(0.4, 0, 1, 1)",
    // Premium glass curves
    glassIn: "cubic-bezier(0.16, 1, 0.3, 1)",
    glassOut: "cubic-bezier(0.7, 0, 0.84, 0)",
    glassInOut: "cubic-bezier(0.87, 0, 0.13, 1)",
    // Elastic curves
    elasticOut: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    bounceOut: "cubic-bezier(0.34, 1.3, 0.64, 1)",
    // Smooth curves for subtle animations
    smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    smoothIn: "cubic-bezier(0.42, 0, 1, 1)",
    smoothOut: "cubic-bezier(0, 0, 0.58, 1)",
};
// Duration presets
export const durations = {
    instant: 100,
    fast: 150,
    normal: 250,
    slow: 400,
    reveal: 600,
};
// Helper to create transition strings
export function createTransition(properties, duration = durations.normal, curve = liquidCurves.standard) {
    const props = Array.isArray(properties) ? properties : [properties];
    return props.map(p => `${p} ${duration}ms ${curve}`).join(", ");
}
