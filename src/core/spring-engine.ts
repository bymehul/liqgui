export interface SpringConfig {
    stiffness: number;
    damping: number;
    mass: number;
}

// Spring presets
export const liquidSpring: SpringConfig = {
    stiffness: 170,
    damping: 26,
    mass: 1
};

export const bouncySpring: SpringConfig = {
    stiffness: 180,
    damping: 12,
    mass: 1
};

export const gentleSpring: SpringConfig = {
    stiffness: 120,
    damping: 20,
    mass: 1
};

export const snappySpring: SpringConfig = {
    stiffness: 400,
    damping: 30,
    mass: 1
};

export const sleekSpring: SpringConfig = {
    stiffness: 200,
    damping: 24,
    mass: 0.8
};

export function springAnimate(
    from: number,
    to: number,
    onUpdate: (v: number) => void,
    config: SpringConfig = liquidSpring,
    onComplete?: () => void
): () => void {
    let velocity = 0;
    let value = from;
    const dt = 1 / 60;
    let rafId: number;
    let stopped = false;

    function step() {
        if (stopped) return;

        const force = -config.stiffness * (value - to);
        const dampingForce = -config.damping * velocity;
        velocity += (force + dampingForce) / config.mass * dt;
        value += velocity * dt;

        onUpdate(value);

        if (Math.abs(velocity) > 0.01 || Math.abs(value - to) > 0.01) {
            rafId = requestAnimationFrame(step);
        } else {
            onUpdate(to);
            onComplete?.();
        }
    }

    rafId = requestAnimationFrame(step);

    // Return cancel function
    return () => {
        stopped = true;
        cancelAnimationFrame(rafId);
    };
}

// Multi-value spring
export function springAnimateMulti(
    from: number[],
    to: number[],
    onUpdate: (values: number[]) => void,
    config: SpringConfig = liquidSpring,
    onComplete?: () => void
): () => void {
    const values = [...from];
    const velocities = from.map(() => 0);
    const dt = 1 / 60;
    let rafId: number;
    let stopped = false;

    function step() {
        if (stopped) return;

        let allSettled = true;

        for (let i = 0; i < values.length; i++) {
            const force = -config.stiffness * (values[i] - to[i]);
            const dampingForce = -config.damping * velocities[i];
            velocities[i] += (force + dampingForce) / config.mass * dt;
            values[i] += velocities[i] * dt;

            if (Math.abs(velocities[i]) > 0.01 || Math.abs(values[i] - to[i]) > 0.01) {
                allSettled = false;
            }
        }

        onUpdate([...values]);

        if (!allSettled) {
            rafId = requestAnimationFrame(step);
        } else {
            onUpdate([...to]);
            onComplete?.();
        }
    }

    rafId = requestAnimationFrame(step);

    return () => {
        stopped = true;
        cancelAnimationFrame(rafId);
    };
}
