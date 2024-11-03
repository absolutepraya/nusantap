import { useState, useEffect } from 'react';

export function useViewportHeight(threshold = 888) {
    const [isTall, setIsTall] = useState(false);

    useEffect(() => {
        const checkHeight = () => {
            setIsTall(window.innerHeight > threshold);
        };

        checkHeight();
        window.addEventListener('resize', checkHeight);
        return () => window.removeEventListener('resize', checkHeight);
    }, [threshold]);

    return isTall;
}