import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { useWindowContext } from '../../context/WindowContext';

export default function Window({ window }) {
    const { closeWindow, focusWindow, minimizeWindow } = useWindowContext();
    const { id, title, content, zIndex, isMinimized, size, position } = window;

    if (isMinimized) return null;

    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={{ scale: 0.9, opacity: 0, x: position.x, y: position.y }}
            animate={{ scale: 1, opacity: 1, zIndex }}
            onDragStart={() => focusWindow(id)}
            onTapStart={() => focusWindow(id)}
            style={{ width: size.w, height: size.h, position: 'absolute' }}
            className="bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden text-white"
        >
            {/* Window Title Bar */}
            <div className="h-10 bg-white/5 border-b border-white/5 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing" onPointerDown={() => focusWindow(id)}>
                <div className="flex items-center gap-2 group">
                    <button onClick={(e) => { e.stopPropagation(); closeWindow(id); }} className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors">
                        <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center hover:bg-yellow-600 transition-colors">
                        <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100" />
                    </button>
                    <button className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors">
                        <Square className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100" />
                    </button>
                </div>
                <div className="text-sm font-medium text-white/50">{title}</div>
                <div className="w-14" /> {/* Spacer for centering */}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 relative">
                {content}
            </div>
        </motion.div>
    );
}
