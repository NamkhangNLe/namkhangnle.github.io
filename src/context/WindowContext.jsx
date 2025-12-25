import React, { createContext, useContext, useState } from 'react';

const WindowContext = createContext();

export const useWindowContext = () => useContext(WindowContext);

export const WindowProvider = ({ children }) => {
    const [windows, setWindows] = useState([]);
    const [activeWindowId, setActiveWindowId] = useState(null);

    const openWindow = (id, title, content, initSize = { w: 600, h: 400 }) => {
        setWindows((prev) => {
            const existing = prev.find((w) => w.id === id);
            if (existing) {
                if (existing.isMinimized) {
                    return prev.map((w) => w.id === id ? { ...w, isMinimized: false, zIndex: getNextZIndex(prev) } : w);
                }
                setActiveWindowId(id);
                return prev.map((w) => w.id === id ? { ...w, zIndex: getNextZIndex(prev) } : w);
            }
            return [...prev, {
                id,
                title,
                content,
                size: initSize,
                position: { x: 100 + prev.length * 20, y: 100 + prev.length * 20 },
                isMinimized: false,
                zIndex: getNextZIndex(prev)
            }];
        });
        setActiveWindowId(id);
    };

    const closeWindow = (id) => {
        setWindows((prev) => prev.filter((w) => w.id !== id));
        if (activeWindowId === id) setActiveWindowId(null);
    };

    const focusWindow = (id) => {
        setActiveWindowId(id);
        setWindows((prev) => prev.map((w) => w.id === id ? { ...w, zIndex: getNextZIndex(prev) } : w));
    };

    const minimizeWindow = (id) => {
        setWindows((prev) => prev.map((w) => w.id === id ? { ...w, isMinimized: true } : w));
        setActiveWindowId(null);
    };

    const getNextZIndex = (currentWindows) => {
        const maxZ = Math.max(0, ...currentWindows.map((w) => w.zIndex || 0));
        return maxZ + 1;
    };

    return (
        <WindowContext.Provider value={{ windows, activeWindowId, openWindow, closeWindow, focusWindow, minimizeWindow }}>
            {children}
        </WindowContext.Provider>
    );
};
