/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect, useRef } from "react";

export default function Loading({ text, isLoading }) {
    const [progress, setProgress] = useState(0);
    const [steps] = useState(() => {
        const firstStep = Math.random() * 40; // Between 0 and 40
        const stepsRandom = [];
        let previousStep = firstStep;

        for (let i = 0; i < 2; i++) {
            const min = previousStep + 5; // Minimum gap of 5%
            const max = 100 - (2 - i) * 5; // Adjust max to leave space for remaining steps
            const step = min + Math.random() * (max - min);
            stepsRandom.push(step);
            previousStep = step;
        }

        stepsRandom.sort((a, b) => a - b);
        stepsRandom.push(100);
        return [firstStep, ...stepsRandom];
    });
    const durationPerStep = 2000; // Duration for each animation step in ms
    const pauseDuration = 500; // Pause duration at each milestone in ms
    const easingFunction = (t) => {
        // Easing function: easeInOutCubic
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    const requestRef = useRef();
    const startTimeRef = useRef();
    const currentStepRef = useRef(0);
    const isPausedRef = useRef(false);

    // New State for Dot Animation
    const [dotCount, setDotCount] = useState(1);

    // useEffect for Progress Animation
    useEffect(() => {
        const animateStep = (timestamp) => {
            if (isPausedRef.current) {
                // If paused, do not proceed with animation
                requestRef.current = requestAnimationFrame(animateStep);
                return;
            }

            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const elapsed = timestamp - startTimeRef.current;
            const t = Math.min(elapsed / durationPerStep, 1); // Normalize time
            const easedT = easingFunction(t); // Apply easing
            const startProgress = currentStepRef.current === 0 ? 0 : steps[currentStepRef.current - 1];
            const targetProgress = steps[currentStepRef.current];
            const newProgress = startProgress + (targetProgress - startProgress) * easedT;
            setProgress(newProgress);

            if (elapsed < durationPerStep) {
                requestRef.current = requestAnimationFrame(animateStep);
            } else {
                // Animation for current step completed
                setProgress(targetProgress);
                currentStepRef.current += 1;

                if (currentStepRef.current < steps.length) {
                    // Pause before starting the next step
                    isPausedRef.current = true;
                    setTimeout(() => {
                        isPausedRef.current = false;
                        startTimeRef.current = null;
                        requestRef.current = requestAnimationFrame(animateStep);
                    }, pauseDuration);
                } else {
                    // All steps completed
                    cancelAnimationFrame(requestRef.current);
                }
            }
        };

        requestRef.current = requestAnimationFrame(animateStep);

        // Cleanup on unmount
        return () => {
            cancelAnimationFrame(requestRef.current);
        };
    }, [steps]);

    // New useEffect for Dot Animation
    useEffect(() => {
        const interval = setInterval(() => {
            setDotCount((prevCount) => (prevCount < 3 ? prevCount + 1 : 1));
        }, 500); // Change dots every 500 ms

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-[888px] w-[450px] bg-red-300 absolute z-50 top-0 left-0">
            <img
                src="/elements/loadingbg.svg"
                alt="Loading Background"
                className="w-full absolute h-auto object-cover"
            />
            <img
                src='/elements/logo.svg'
                alt='Logo'
                className='w-32 h-32 absolute z-10 bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2'
            />
            <div className="w-[75%] h-1 bg-gray-400 absolute right-1/2 translate-x-1/2 bottom-[35%] rounded-full">
                <div
                    style={{ width: `${progress}%` }}
                    className="h-1 bg-[#FF7518] rounded-full transition-width duration-100 relative"
                >
                    <div className="absolute right-0 bottom-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-[#FF7518]" />
                </div>
            </div>
            <div className="absolute bottom-52 left-1/2 transform -translate-x-1/2 text-white font-bold justify-center">
                <p className="text-center">
                    {Math.floor(progress)}%<br />
                    {text}
                    {'.'.repeat(dotCount)}
                </p>
            </div>
        </div>
    );
}
