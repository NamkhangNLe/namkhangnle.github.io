import React from 'react';
import { AppWindow, MessageSquare, Folder, Github, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWindowContext } from '../../context/WindowContext';
import Messages from '../Apps/Messages';
import Finder from '../Apps/Finder';

export default function Dock() {
    const { openWindow } = useWindowContext();

    const handleAppClick = (id) => {
        switch (id) {
            case 'finder':
                openWindow('finder', 'Finder', <Finder />, { w: 800, h: 500 });
                break;
            case 'messages':
                openWindow('messages', 'Messages', <Messages />, { w: 800, h: 600 });
                break;
            case 'safari':
                window.open('https://linkedin.com/in/namkhangnle', '_blank');
                break;
            case 'github':
                window.open('https://github.com/namkhangnle', '_blank');
                break;
            default:
                break;
        }
    };

    const apps = [
        { id: 'finder', icon: <Folder className="w-8 h-8 text-blue-500 fill-blue-500" />, label: 'Finder' },
        { id: 'messages', icon: <MessageSquare className="w-8 h-8 text-green-500 fill-green-500" />, label: 'Messages' },
        { id: 'safari', icon: <Globe className="w-8 h-8 text-blue-400 fill-blue-400" />, label: 'Safari' },
        { id: 'github', icon: <Github className="w-8 h-8 text-white fill-black" />, label: 'GitHub' },
    ];

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-end gap-2 px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                {apps.map((app) => (
                    <motion.button
                        key={app.id}
                        onClick={() => handleAppClick(app.id)}
                        whileHover={{ scale: 1.2, translateY: -10 }}
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                        title={app.label}
                    >
                        {app.icon}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
