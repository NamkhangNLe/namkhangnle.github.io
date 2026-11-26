// iPhone shell v2 — a proper rebuild, not a reskin of v1.
//
// What v1 got wrong (and this file deliberately does NOT repeat):
//  - a home screen that mixed the lock screen (big clock + date) with the
//    home screen. A real iPhone home screen has no big clock.
//  - a fake status bar: lucide Signal/Wifi/Battery outline icons and an
//    empty spacer pretending to be the Dynamic Island. This one draws the
//    actual iOS glyph shapes as filled SVG and includes a real island pill.
//  - generic flat-gradient tiles with thin outline glyphs. Icons now live in
//    icons.jsx as layered, filled, hand-drawn marks.
//  - Mac window components dropped into a white sheet. The views in views.jsx
//    are dedicated iOS screens built from ios.jsx primitives.
//  - scale/fade sheet transitions. Push transitions slide from the right with
//    the outgoing screen parallaxing left, and swipe-back from the left edge
//    works — the way iOS actually navigates.

import React, { useState, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { posts } from '../../data/posts';
import { researchNotes } from '../../data/research';
import { useClock } from './iosUtils';
import {
    ProjectsIcon, ExperienceIcon, AboutIcon, BlogIcon, ResearchIcon,
    ResumeIcon, LinkedInIcon, GitHubIcon,
} from './icons';
import { BlogListView, ResearchListView, ProjectsView, ExperienceView, AboutView, ResumeView } from './views';

// ---- Wallpaper: a dusk gradient with a sun glow, film grain, and a
// vignette. Layered light, not three flat radial blobs on black. ----
const NOISE_URI =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E";

function Wallpaper() {
    return (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(90% 42% at 50% 82%, rgba(255,176,102,0.60), transparent 62%),' +
                        'radial-gradient(65% 38% at 12% 8%, rgba(96,140,255,0.55), transparent 62%),' +
                        'radial-gradient(55% 30% at 88% 30%, rgba(168,85,247,0.35), transparent 65%),' +
                        'linear-gradient(180deg, #0B1035 0%, #2A1B5E 36%, #6E2A63 60%, #B4503F 80%, #DE8A4E 100%)',
                }}
            />
            <div
                className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
                style={{ backgroundImage: `url("${NOISE_URI}")` }}
            />
            <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.28) 100%)' }}
            />
        </div>
    );
}

// ---- Status bar: the real iOS glyphs, drawn as filled SVG shapes.
// Cellular bars ascend, wifi is three arcs + a dot, battery is a rounded
// rect with a fill and a nub. The black pill in the middle is the Dynamic
// Island — hardware, so it is black on every background. ----
function StatusBarIcons({ dark }) {
    const color = dark ? '#000000' : '#FFFFFF';
    return (
        <span className="flex items-center gap-[6px]" style={{ color }}>
            <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
                <g fill="currentColor">
                    <rect x="0" y="7" width="3" height="5" rx="1" />
                    <rect x="4.5" y="5" width="3" height="7" rx="1" />
                    <rect x="9" y="2.5" width="3" height="9.5" rx="1" />
                    <rect x="13.5" y="0" width="3" height="12" rx="1" />
                </g>
            </svg>
            <svg width="17" height="12" viewBox="0 0 17 12" aria-hidden="true">
                <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M1.5 4.2 a9.5 9.5 0 0 1 14 0" />
                    <path d="M4 7 a6 6 0 0 1 9 0" />
                    <path d="M6.6 9.6 a2.6 2.6 0 0 1 3.8 0" />
                </g>
                <circle cx="8.5" cy="10.8" r="1.1" fill="currentColor" />
            </svg>
            <svg width="27" height="12" viewBox="0 0 27 12" aria-hidden="true">
                <rect x="0.5" y="0.5" width="22" height="11" rx="3.5" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
                <rect x="2" y="2" width="16" height="8" rx="1.8" fill="currentColor" />
                <path d="M24 4 v4 a2.2 2.2 0 0 0 0 -4 z" fill="currentColor" fillOpacity="0.5" />
            </svg>
        </span>
    );
}

function StatusBar({ dark = false }) {
    const now = useClock();
    const time = now
        .toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
        .replace(/\s?[AP]M/i, '');
    return (
        <div
            className={`relative flex items-center justify-between pl-8 pr-7 shrink-0 ${
                dark ? 'text-black' : 'text-white'
            }`}
            style={{ height: 54, paddingTop: 8 }}
        >
            <span className="text-[15px] font-semibold tracking-tight">{time}</span>
            {/* Dynamic Island */}
            <span
                className="absolute left-1/2 top-[11px] -translate-x-1/2 w-[122px] h-[32px] rounded-full bg-black"
                aria-hidden="true"
            />
            <StatusBarIcons dark={dark} />
        </div>
    );
}

function HomeIndicator({ dark = false, onClick }) {
    return (
        <button
            onClick={onClick}
            aria-label="Home"
            className="shrink-0 w-full pt-2 pb-2 flex justify-center"
            style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
        >
            <span
                className={`block w-[134px] h-[5px] rounded-full ${dark ? 'bg-black' : 'bg-white'}`}
            />
        </button>
    );
}

// ---------------------------------------------------------------------------
// Home screen
// ---------------------------------------------------------------------------
const GRID_APPS = [
    { id: 'projects', label: 'Projects', icon: <ProjectsIcon /> },
    { id: 'experience', label: 'Experience', icon: <ExperienceIcon /> },
    { id: 'about', label: 'About', icon: <AboutIcon /> },
    { id: 'blog', label: 'Blog', icon: <BlogIcon /> },
    { id: 'research', label: 'Research', icon: <ResearchIcon /> },
    { id: 'resume', label: 'Resume', icon: <ResumeIcon /> },
];

function HomeScreen({ onOpenApp, onOpenExternal }) {
    const now = useClock();
    const weekday = now.toLocaleDateString([], { weekday: 'long' });
    const day = now.getDate();
    const monthYear = now.toLocaleDateString([], { month: 'long', year: 'numeric' });

    return (
        <div className="absolute inset-0 flex flex-col">
            <Wallpaper />
            <div className="relative flex flex-col h-full">
                <StatusBar />
                {/* Date widget — the one widget a real home screen has room
                    for here. Real date, no invented events. */}
                <div className="px-6 pt-3 shrink-0">
                    <div className="rounded-[24px] bg-white/[0.28] backdrop-blur-xl border border-white/30 shadow-lg shadow-black/10 px-4 py-3 flex items-baseline gap-3">
                        <span className="text-[34px] leading-none font-bold text-white tracking-tight">
                            {day}
                        </span>
                        <span className="text-[14px] font-medium text-white/85">
                            {weekday}
                            <span className="block text-[12px] text-white/65">{monthYear}</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-x-2 gap-y-6 px-6 pt-8">
                    {GRID_APPS.map((app) => (
                        <button
                            key={app.id}
                            onClick={() => onOpenApp(app.id)}
                            className="flex flex-col items-center gap-1.5 select-none active:scale-90 transition-transform"
                        >
                            {app.icon}
                            <span
                                className="text-[12px] font-medium text-white leading-none"
                                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.55)' }}
                            >
                                {app.label}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="flex-1" />

                {/* Page dots */}
                <div className="flex justify-center gap-2 pb-3 shrink-0">
                    <span className="w-[7px] h-[7px] rounded-full bg-white" />
                    <span className="w-[7px] h-[7px] rounded-full bg-white/40" />
                </div>

                {/* Dock — icons only, the way iOS does it. No labels. */}
                <div
                    className="px-4 shrink-0"
                    style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
                >
                    <div className="flex justify-center gap-6 px-4 py-3 bg-white/25 backdrop-blur-2xl border border-white/20 rounded-[28px]">
                        <button
                            onClick={() => onOpenExternal('https://linkedin.com/in/namkhangnle')}
                            className="active:scale-90 transition-transform"
                            aria-label="LinkedIn"
                        >
                            <LinkedInIcon />
                        </button>
                        <button
                            onClick={() => onOpenExternal('https://github.com/NamkhangNLe')}
                            className="active:scale-90 transition-transform"
                            aria-label="GitHub"
                        >
                            <GitHubIcon />
                        </button>
                    </div>
                </div>
                <HomeIndicator onClick={() => {}} />
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Shell: a stack of screens. Push slides in from the right with the screen
// underneath parallaxing left and dimming; swipe right from the left edge
// pops. The home screen is always the bottom of the stack.
// ---------------------------------------------------------------------------
// Deep-link entry: ?post=<id> opens the Blog list (which opens the reader),
// ?research=<id> opens the Research list. Runs once, in the state
// initializer, so no effect is needed.
function initialStackFromURL() {
    if (typeof window === 'undefined') return [];
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('post');
    const researchId = params.get('research');
    if (postId && posts.some((p) => p.id === postId)) {
        return [blogRootScreen({ initialPostId: postId })];
    }
    if (researchId && researchNotes.some((n) => n.id === researchId)) {
        return [researchRootScreen({ initialNoteId: researchId })];
    }
    return [];
}

function blogRootScreen(props) {
    return {
        key: 'app-blog',
        appId: 'blog',
        title: 'Blog',
        backTitle: 'Home',
        fill: false,
        bg: '#F2F2F7',
        render: (n) => <BlogListView nav={n} initialPostId={props?.initialPostId} />,
    };
}

function researchRootScreen(props) {
    return {
        key: 'app-research',
        appId: 'research',
        title: 'Research',
        backTitle: 'Home',
        fill: false,
        bg: '#F2F2F7',
        render: (n) => <ResearchListView nav={n} initialNoteId={props?.initialNoteId} />,
    };
}

const APP_ROOTS = {
    projects: { title: 'Projects', render: (nav) => <ProjectsView nav={nav} /> },
    experience: { title: 'Experience', render: (nav) => <ExperienceView nav={nav} /> },
    about: { title: 'About', render: (nav) => <AboutView nav={nav} />, fill: true },
    blog: { title: 'Blog', render: (nav, props) => <BlogListView nav={nav} initialPostId={props?.initialPostId} /> },
    research: { title: 'Research', render: (nav, props) => <ResearchListView nav={nav} initialNoteId={props?.initialNoteId} /> },
    resume: { title: 'Resume', render: () => <ResumeView /> },
};

export default function IPhone() {
    // Deep links land directly in the right reader. Computed in the lazy
    // initializer (not an effect) so there is no mount-time setState.
    const [stack, setStack] = useState(() => initialStackFromURL());
    const [swipeX, setSwipeX] = useState(0);
    const swipeStart = useRef(null);
    const shellRef = useRef(null);

    const nav = {
        push: (screen) => setStack((prev) => [...prev, { ...screen, key: screen.key || `${Date.now()}-${Math.random()}` }]),
        pop: () => setStack((prev) => prev.slice(0, -1)),
    };

    const openApp = useCallback((appId, props) => {
        const root = APP_ROOTS[appId];
        if (!root) return;
        setStack([{ key: `app-${appId}`, appId, title: root.title, backTitle: 'Home', render: (n) => root.render(n, props), fill: root.fill, bg: '#F2F2F7' }]);
    }, []);

    const goHome = useCallback(() => setStack([]), []);

    // ---- Swipe-back from the left edge ----
    const onTouchStart = (e) => {
        if (stack.length === 0 || !shellRef.current) return;
        const rect = shellRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        swipeStart.current = { x, y: e.touches[0].clientY, valid: x < 32 };
    };
    const onTouchMove = (e) => {
        const s = swipeStart.current;
        if (!s?.valid) return;
        const rect = shellRef.current.getBoundingClientRect();
        const dx = e.touches[0].clientX - rect.left - s.x;
        const dy = e.touches[0].clientY - s.y;
        if (dx > 0 && Math.abs(dx) > Math.abs(dy)) setSwipeX(Math.min(dx, rect.width));
    };
    const onTouchEnd = () => {
        if (swipeX > 90) nav.pop();
        setSwipeX(0);
        swipeStart.current = null;
    };

    const topIndex = stack.length - 1;

    return (
        <div
            ref={shellRef}
            className="h-full w-full overflow-hidden relative bg-black text-white select-none"
            style={{ fontFamily: "'-apple-system', BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', 'Segoe UI', Arial, sans-serif", WebkitTapHighlightColor: 'transparent' }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div className="relative mx-auto h-full w-full max-w-[430px] overflow-hidden bg-black">
                <HomeScreen onOpenApp={openApp} onOpenExternal={(url) => window.open(url, '_blank')} />

                <AnimatePresence initial={false}>
                    {stack.map((screen, i) => {
                        const isTop = i === topIndex;
                        const depth = i + 1;
                        return (
                            <motion.div
                                key={screen.key}
                                initial={{ x: '100%' }}
                                animate={{ x: isTop ? 0 : '-6%', opacity: 1 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', stiffness: 380, damping: 38 }}
                                className="absolute inset-0 flex flex-col"
                                style={{
                                    background: screen.bg || '#F2F2F7',
                                    zIndex: 10 + i,
                                    boxShadow: isTop ? '-12px 0 32px rgba(0,0,0,0.25)' : 'none',
                                }}
                            >
                                <div
                                    className="flex-1 min-h-0 flex flex-col"
                                    style={isTop && swipeX > 0 ? { transform: `translateX(${swipeX}px)` } : undefined}
                                >
                                    <StatusBar dark />
                                    {/* Nav bar — back chevron shows the PREVIOUS
                                        screen's title, the way iOS does it. */}
                                    <div className="flex items-center h-11 shrink-0 px-1 bg-white/80 backdrop-blur-xl border-b border-black/[0.06]">
                                        <button
                                            onClick={nav.pop}
                                            className="flex items-center text-[#007AFF] text-[17px] active:opacity-60 shrink-0"
                                        >
                                            <ChevronLeft className="w-[26px] h-[26px] -mr-0.5" strokeWidth={2.4} />
                                            <span>{depth === 1 ? 'Home' : stack[i - 1]?.title || 'Back'}</span>
                                        </button>
                                        <div className="flex-1 text-center text-[17px] font-semibold text-black truncate px-2">
                                            {depth > 1 ? screen.title : ''}
                                        </div>
                                        <div className="w-[64px] shrink-0" />
                                    </div>
                                    {screen.fill ? (
                                        <div className="flex-1 min-h-0 flex flex-col bg-white">
                                            {screen.render(nav)}
                                        </div>
                                    ) : (
                                        <div
                                            className="flex-1 min-h-0 overflow-y-auto"
                                            style={{ background: screen.bg || '#F2F2F7' }}
                                        >
                                            {screen.render(nav)}
                                        </div>
                                    )}
                                    <div className="shrink-0" style={{ background: screen.bg || '#F2F2F7' }}>
                                        <HomeIndicator dark onClick={goHome} />
                                    </div>
                                </div>
                                {!isTop && (
                                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
