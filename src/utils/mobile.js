import { useState, useEffect } from 'react';

// Matches Tailwind's `md` breakpoint: `max-md:` utilities apply below 768px,
// so the JS check uses the same boundary.
export const MOBILE_QUERY = '(max-width: 767px)';

export function isMobileViewport() {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(MOBILE_QUERY).matches;
}

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(() => isMobileViewport());

    useEffect(() => {
        const mq = window.matchMedia(MOBILE_QUERY);
        const onChange = (e) => setIsMobile(e.matches);
        mq.addEventListener('change', onChange);
        setIsMobile(mq.matches);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    return isMobile;
}
