// iPhone shell v3 — REALISM pass.
//
// What v2 got wrong (Namkhang, Nov 27: "still feels kidish and not state
// of the art" — "my Mac app feels realistic"): the Mac desktop feels real
// because it faithfully copies a real system — muted chrome, real content,
// nothing invented. v2 invented a candy iPhone that doesn't exist: a vivid
// purple-orange gradient wallpaper and six saturated system-color icons.
// This version fixes the visual identity, not the structure:
//  - the wallpaper is a REAL photograph (the SAME snow-capped mountain at
//    dusk as the Mac desktop — Unsplash photo-1477346611705-65d1883cee1e),
//    dimmed the way iOS dims wallpapers, with scrims behind the status bar
//    and the dock. No gradient, no flat color field.
//  - the empty middle is no longer empty: it is the mountain photograph —
//    slate sky, snow peaks, the rust alpenglow band, dark valley behind
//    the dock. Same photo as desktop, one identity on both form factors.
//  - every icon is redrawn muted and layered (see icons.jsx) — no pure
//    saturated hues anywhere on the home screen.
//  - the date widget is frosted glass over the photo and now carries the
//    live clock + "New York" — real data, no invented content.
//  - the empty middle is no longer empty: it is the skyline photograph.
// Structure kept from v2: home screen, push stack, swipe-back, deep links,
// the iOS readers, desktop untouched.

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

// ---- Wallpaper: a REAL photograph, not an invented gradient. ----
// The SAME snow-capped mountain range at dusk as the Mac desktop
// (Unsplash photo-1477346611705-65d1883cee1e — the only Unsplash URL in the
// live bundle, w=2070 on desktop). Portrait focal-point crop (fp-x=0.55)
// keeps the main peak cluster centred and catches the rust alpenglow band
// on the right; the full height is kept, so the dark valley sits behind
// the dock. Verified 200, 828x1792 JPEG, viewed before use.
// This photo is already dark and muted, so the iOS dim is lighter than
// v3's skyline treatment: the sky is slate blue-grey (not pale), so the
// top scrim is weaker, and the valley is near-black, so the bottom scrim
// is only a whisper. Peaks + alpenglow stay visible in the middle.
const WALLPAPER_URL =
    'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&w=828&h=1792&crop=focalpoint&fp-x=0.55&fp-y=0.45&fp-z=1&q=70';

function Wallpaper() {
    return (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <img
                src={WALLPAPER_URL}
                alt=""
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter: 'saturate(0.95) brightness(0.97)' }}
            />
            <div className="absolute inset-0" style={{ background: 'rgba(4,10,24,0.08)' }} />
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(3,8,20,0.34) 0%, rgba(3,8,20,0.12) 14%, transparent 26%)' }}
            />
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(0deg, rgba(3,8,20,0.22) 0%, transparent 16%)' }}
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
    const time = now
        .toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
        .replace(/\s?[AP]M/i, '');

    return (
        <div className="absolute inset-0 flex flex-col">
            <Wallpaper />
            <div className="relative flex flex-col h-full">
                <StatusBar />
                {/* Date widget — frosted glass over the photograph, the way a
                    real widget sits on a real wallpaper. Real date on the
                    left; the live clock and "New York" on the right. No
                    invented events, no fake weather, no fake notifications. */}
                <div className="px-6 pt-3 shrink-0">
                    <div className="rounded-[24px] bg-white/[0.14] backdrop-blur-2xl border border-white/25 shadow-lg shadow-black/20 px-4 py-3 flex items-center gap-3">
                        <span className="text-[34px] leading-none font-bold text-white tracking-tight">
                            {day}
                        </span>
                        <span className="text-[14px] font-medium text-white/85">
                            {weekday}
                            <span className="block text-[12px] text-white/65">{monthYear}</span>
                        </span>
                        <span className="w-px self-stretch bg-white/25 mx-1" />
                        <span className="ml-auto text-right">
                            <span className="block text-[26px] leading-none font-semibold text-white tracking-tight tabular-nums">
                                {time}
                            </span>
                            <span className="block text-[12px] text-white/65 mt-1">New York</span>
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

                {/* Dock — icons only, the way iOS does it. No labels.
                    Frosted glass over the photograph, not a bright tile. */}
                <div
                    className="px-4 shrink-0"
                    style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
                >
                    <div className="flex justify-center gap-6 px-4 py-3 bg-white/[0.16] backdrop-blur-2xl border border-white/20 rounded-[28px] shadow-lg shadow-black/20">
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
