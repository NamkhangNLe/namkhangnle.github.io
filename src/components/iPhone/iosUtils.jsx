// Non-component iOS shared values: constants, the clock hook, and the
// inline-markdown renderer. Kept in their own module so ios.jsx only
// exports components (react-refresh rule).

import { useState, useEffect } from 'react';

export const IOS_FONT =
    "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', 'Segoe UI', Arial, sans-serif";

export const IOS_BLUE = '#007AFF';
export const IOS_BG = '#F2F2F7';
export const IOS_LABEL = '#000000';
export const IOS_SECONDARY = '#8E8E93';
export const IOS_SEPARATOR = '#C6C6C8';
export const IOS_CHEVRON = '#C7C7CC';

export function useClock() {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 20000);
        return () => clearInterval(timer);
    }, []);
    return now;
}

// ---- Inline markdown links: [text](url) -> <a> ----
export function renderInline(text) {
    const parts = [];
    const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
    let lastIndex = 0;
    let match;
    let key = 0;
    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
        parts.push(
            <a
                key={key++}
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007AFF] underline decoration-[#007AFF]/40"
            >
                {match[1]}
            </a>
        );
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) parts.push(text.slice(lastIndex));
    return parts;
}
