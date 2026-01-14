export declare const liquidCurves: {
    standard: string;
    emphasized: string;
    decelerate: string;
    accelerate: string;
    glassIn: string;
    glassOut: string;
    glassInOut: string;
    elasticOut: string;
    bounceOut: string;
    smooth: string;
    smoothIn: string;
    smoothOut: string;
};
export declare const durations: {
    instant: number;
    fast: number;
    normal: number;
    slow: number;
    reveal: number;
};
export declare function createTransition(properties: string | string[], duration?: number, curve?: string): string;
