export interface SpringConfig {
    stiffness: number;
    damping: number;
    mass: number;
}
export declare const liquidSpring: SpringConfig;
export declare const bouncySpring: SpringConfig;
export declare const gentleSpring: SpringConfig;
export declare const snappySpring: SpringConfig;
export declare const sleekSpring: SpringConfig;
export declare function springAnimate(from: number, to: number, onUpdate: (v: number) => void, config?: SpringConfig, onComplete?: () => void): () => void;
export declare function springAnimateMulti(from: number[], to: number[], onUpdate: (values: number[]) => void, config?: SpringConfig, onComplete?: () => void): () => void;
