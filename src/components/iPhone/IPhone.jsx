import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    BookOpen, ChevronLeft, FileText, FlaskConical, Folder,
    Github, Linkedin, MessageSquare, Signal, Wifi, BatteryFull,
} from 'lucide-react';
import { useWindowContext } from '../../context/WindowContext';
import Blog from '../Apps/Blog';
import Research from '../Apps/Research';
import Resume from '../Apps/Resume';
import Finder from '../Apps/Finder';
import Notes from '../Apps/Notes';
import Messages from '../Apps/Messages';

// iPhone shell: on phone widths the site stops being a shrunken Mac desktop
// and becomes an iPhone home screen. Desktop is untouched — this component
// only renders below the 767px breakpoint (gated in App.jsx via useIsMobile).
//
// The window stack from WindowContext is the screen stack: the home screen
// is the bottom, each open window is a full-screen "app" on top of it.
// Tapping an icon calls the same openWindow() the Dock uses, so deep links
// (?post= / ?research=) land inside the right app, and Finder's project
// windows open as pushed screens with the back chevron returning to Finder.

const WALLPAPER = {
    background:
        'radial-gradient(120% 60% at 85% 0%, rgba(56,130,246,0.28), transparent 60%),' +
        'radial-gradient(100% 55% at 0% 100%, rgba(168,85,247,0.20), transparent 60%),' +
        'radial-gradient(80% 45% at 50% 45%, rgba(16,185,129,0.12), transparent 60%),' +
        '#0a0a0a',
};

function useClock() {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 30000);
        return () => clearInterval(timer);
    }, []);
    return now;
}

function StatusBar({ dark = false }) {
    const now = useClock();
    const time = now
        .toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
        .replace(/\s?[AP]M/i, '');
    return (
        <div className={`flex items-center justify-between px-7 pt-3 pb-1 shrink-0 ${dark ? 'text-gray-900' : 'text-white'}`}>
            <span className="text-[15px] font-semibold tracking-tight">{time}</span>
            <span className="w-20 shrink-0" aria-hidden="true" />
            <span className="flex items-center gap-1.5">
                <Signal className="w-4 h-4" />
                <Wifi className="w-4 h-4" />
                <BatteryFull className="w-6 h-6" />
            </span>
        </div>
    );
}

const GRID_APPS = [
    { id: 'finder', title: 'Projects', label: 'Projects', gradient: 'linear-gradient(180deg,#30B0FF,#0A84FF)', icon: <Folder className="w-7 h-7 text-white" strokeWidth={2.2} />, content: <Finder /> },
    { id: 'notes', title: 'Experience', label: 'Experience', gradient: 'linear-gradient(180deg,#FFD60A,#FF9F0A)', icon: <FileText className="w-7 h-7 text-white" strokeWidth={2.2} />, content: <Notes /> },
    { id: 'messages', title: 'About', label: 'About', gradient: 'linear-gradient(180deg,#30D158,#28CD41)', icon: <MessageSquare className="w-7 h-7 text-white" strokeWidth={2.2} />, content: <Messages /> },
    { id: 'blog', title: 'Blog', label: 'Blog', gradient: 'linear-gradient(180deg,#FF9F0A,#FF375F)', icon: <BookOpen className="w-7 h-7 text-white" strokeWidth={2.2} />, content: <Blog /> },
    { id: 'research', title: 'Research', label: 'Research', gradient: 'linear-gradient(180deg,#34C759,#00C7BE)', icon: <FlaskConical className="w-7 h-7 text-white" strokeWidth={2.2} />, content: <Research /> },
    { id: 'resume', title: 'Resume', label: 'Resume', gradient: 'linear-gradient(180deg,#FFFFFF,#E5E5EA)', icon: <FileText className="w-7 h-7 text-[#3478F6]" strokeWidth={2.2} />, content: <Resume /> },
];

const DOCK_APPS = [
    { id: 'linkedin', label: 'LinkedIn', background: '#0A66C2', icon: <Linkedin className="w-7 h-7 text-white" strokeWidth={2.2} />, url: 'https://linkedin.com/in/namkhangnle' },
    { id: 'github', label: 'GitHub', background: '#1C1C1E', icon: <Github className="w-7 h-7 text-white" strokeWidth={2.2} />, url: 'https://github.com/NamkhangNLe' },
];

function AppIcon({ label, background, icon, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center gap-1.5 select-none active:scale-90 transition-transform"
        >
            <span
                className="w-[60px] h-[60px] rounded-[16px] flex items-center justify-center shadow-lg shadow-black/40"
                style={{ background }}
            >
                {icon}
            </span>
            <span className="text-[11px] font-medium text-white leading-none">{label}</span>
        </button>
    );
}

export default function IPhone() {
    const { windows, activeWindowId, openWindow, closeWindow } = useWindowContext();
    const now = useClock();

    // Only non-minimized windows are screens (nothing can minimize on mobile,
    // but this keeps the shell correct if a window ever arrives minimized).
    const visible = windows.filter((w) => !w.isMinimized);
    const active = visible.find((w) => w.id === activeWindowId) || visible[visible.length - 1];

    const openApp = (app) => openWindow(app.id, app.title, app.content, { w: 900, h: 600 });
    const goHome = () => visible.forEach((w) => closeWindow(w.id));

    const dateLine = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
    const bigTime = now
        .toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
        .replace(/\s?[AP]M/i, '');

    return (
        <div className="h-dvh w-full overflow-hidden relative bg-[#0a0a0a] text-white select-none">
            {/* Home screen — always underneath, visible when no app is open. */}
            <div className="absolute inset-0 flex flex-col" style={WALLPAPER}>
                <StatusBar />
                <div className="px-7 pt-5 shrink-0">
                    <p className="text-[15px] font-semibold text-white/80">{dateLine}</p>
                    <p className="text-[64px] leading-[1.05] font-bold text-white tracking-tight">{bigTime}</p>
                    <p className="text-[15px] text-white/70 mt-1">Namkhang Le</p>
                    <p className="text-[13px] text-white/50">Software Engineer II, Agentic Systems @ Meta</p>
                </div>

                <div className="grid grid-cols-4 gap-x-3 gap-y-6 px-6 pt-10">
                    {GRID_APPS.map((app) => (
                        <AppIcon
                            key={app.id}
                            label={app.label}
                            background={app.gradient}
                            icon={app.icon}
                            onClick={() => openApp(app)}
                        />
                    ))}
                </div>

                <div className="flex-1" />

                {/* Dock — the external links, same two the Mac Dock holds. */}
                <div
                    className="px-4 shrink-0"
                    style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
                >
                    <div className="flex justify-center gap-5 px-4 py-3 bg-white/15 backdrop-blur-xl border border-white/15 rounded-[28px]">
                        {DOCK_APPS.map((app) => (
                            <AppIcon
                                key={app.id}
                                label={app.label}
                                background={app.background}
                                icon={app.icon}
                                onClick={() => window.open(app.url, '_blank')}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Open app — a full-screen iOS sheet over the home screen. */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        key={active.id}
                        initial={{ opacity: 0, scale: 0.92, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="absolute inset-0 bg-white text-gray-900 flex flex-col"
                    >
                        <StatusBar dark />
                        {/* Nav bar — back chevron returns to the previous
                            screen (home, or the app that opened this one). */}
                        <div className="flex items-center px-2 h-11 shrink-0">
                            <button
                                onClick={() => closeWindow(active.id)}
                                className="flex items-center text-[#007AFF] text-[17px] shrink-0"
                            >
                                <ChevronLeft className="w-7 h-7" />
                                <span className="-ml-1">Home</span>
                            </button>
                            <div className="flex-1 text-center text-[15px] font-semibold truncate px-2">
                                {active.title}
                            </div>
                            <div className="w-[76px] shrink-0" />
                        </div>
                        {/* Large title, iOS style. */}
                        <h1 className="px-5 pt-1 pb-3 text-[32px] leading-none font-bold shrink-0">
                            {active.title}
                        </h1>
                        {/* App content. The wrapper scrolls for tall pages
                            (Resume); h-full apps (Blog, Research, Finder,
                            Notes, Messages) fill it and scroll internally. */}
                        <div className="flex-1 min-h-0 overflow-y-auto bg-white">
                            {active.content}
                        </div>
                        {/* Home indicator — tap to go home. */}
                        <button
                            onClick={goHome}
                            aria-label="Home"
                            className="shrink-0 w-full bg-white pt-2 flex justify-center"
                            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
                        >
                            <span className="block w-32 h-[5px] rounded-full bg-gray-900" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
