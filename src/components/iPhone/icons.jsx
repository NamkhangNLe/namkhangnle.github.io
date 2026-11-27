// Hand-drawn app icons, v3 — REALISM pass.
//
// What v2 got wrong (Namkhang, Nov 27: "still feels kidish"): the icons
// were iOS *system* colors at full saturation — bright blue, yellow, green,
// orange-pink, teal — six candy tiles in a row. Real phones don't look like
// that. A real home screen's icons are mostly muted, designed product marks:
// desaturated palettes, three-stop gradients with a lit top and a shaded
// bottom, hairline inner edges, and glyphs with weight. This file redraws
// every icon that way. Nothing here is a pure saturated hue.
//
// Construction per icon: a squircle tile (22.37% radius, the iOS
// continuous-corner approximation) with a three-stop vertical gradient, a
// top inner highlight, a bottom inner shade, and a soft drop shadow; a
// FILLED, heavy glyph drawn as an SVG path, with a faint drop shadow so it
// sits *in* the tile instead of floating on it like a sticker.

import React from 'react';
import { Github } from 'lucide-react';

// The squircle tile every icon sits on.
export function IconTile({ background, children, size = 60 }) {
    return (
        <span
            className="flex items-center justify-center shrink-0 select-none"
            style={{
                width: size,
                height: size,
                borderRadius: '22.37%',
                background,
                boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.38), inset 0 -2px 3px rgba(0,0,0,0.14), inset 0 0 0 0.5px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.30), 0 1px 3px rgba(0,0,0,0.22)',
            }}
        >
            {children}
        </span>
    );
}

function Glyph({ children }) {
    return (
        <svg
            width="34"
            height="34"
            viewBox="0 0 60 60"
            aria-hidden="true"
            style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.16))' }}
        >
            {children}
        </svg>
    );
}

// Projects — a folder, steel blue. Muted from v2's #0A84FF system blue:
// desaturated slate blues, tab lighter than the body, front face with a
// top highlight and a shaded base, like the real Files icon on a cloudy day.
export function ProjectsIcon({ size = 60 }) {
    return (
        <IconTile size={size} background="linear-gradient(180deg, #8FB3DD 0%, #5E8CC4 52%, #3E6A9E 100%)">
            <Glyph>
                <defs>
                    <linearGradient id="folderBodyV3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7FA8D8" />
                        <stop offset="100%" stopColor="#4A76AD" />
                    </linearGradient>
                </defs>
                <path d="M13 13 h13 l4.5 5.5 H47 a3 3 0 0 1 3 3 v1 H10 v-6.5 a3 3 0 0 1 3-3 z" fill="#A9C6E8" />
                <path
                    d="M10 22.5 h40 a3 3 0 0 1 3 3 V42 a4 4 0 0 1 -4 4 H11 a4 4 0 0 1 -4 -4 V25.5 a3 3 0 0 1 3-3 z"
                    fill="url(#folderBodyV3)"
                />
                <rect x="10" y="22.5" width="40" height="2.5" rx="1" fill="#FFFFFF" opacity="0.35" />
                <rect x="10" y="42" width="40" height="4" rx="2" fill="#2F5378" opacity="0.30" />
            </Glyph>
        </IconTile>
    );
}

// Experience — the Notes icon, but the yellow is a soft cream/amber instead
// of v2's full-strength #FFD60A. Off-white top, muted parchment bottom,
// ruled lines in warm gray. Still reads as Notes at 60px.
export function ExperienceIcon({ size = 60 }) {
    return (
        <IconTile
            size={size}
            background="linear-gradient(180deg, #FCFAF2 0%, #F7F0D8 60%, #E7D6A0 100%)"
        >
            <Glyph>
                <g stroke="#8E8A80" strokeWidth="2.4" strokeLinecap="round">
                    <line x1="18" y1="20" x2="42" y2="20" />
                    <line x1="18" y1="28" x2="42" y2="28" />
                    <line x1="18" y1="36" x2="42" y2="36" />
                    <line x1="18" y1="44" x2="36" y2="44" />
                </g>
            </Glyph>
        </IconTile>
    );
}

// About — the Messages bubble on muted sage, not v2's #30D158 kelly green.
// Desaturated sea-green gradient; the white bubble is the only bright thing.
export function AboutIcon({ size = 60 }) {
    return (
        <IconTile size={size} background="linear-gradient(180deg, #8FC79B 0%, #63A873 52%, #4C8A5C 100%)">
            <Glyph>
                <path
                    d="M30 13 c-9.9 0 -18 6.2 -18 13.5 c0 4.2 2.7 7.9 6.9 10.2 L17 45 l8.6 -4.4 c1.4 0.3 2.9 0.4 4.4 0.4 c9.9 0 18 -6.2 18 -13.5 C48 19.2 39.9 13 30 13 z"
                    fill="#FFFFFF"
                />
            </Glyph>
        </IconTile>
    );
}

// Blog — an open book on muted terracotta, not v2's orange-to-pink. Warm
// clay gradient; spine crease in the dark end of the same hue.
export function BlogIcon({ size = 60 }) {
    return (
        <IconTile size={size} background="linear-gradient(180deg, #C98A76 0%, #A86652 55%, #8C4E40 100%)">
            <Glyph>
                <path
                    d="M30 17 c-4.5 -3.5 -10.5 -3.5 -15 -1.5 V43 c4.5 -2 10.5 -2 15 1.5 c4.5 -3.5 10.5 -3.5 15 -1.5 V15.5 c-4.5 -2 -10.5 -2 -15 1.5 z"
                    fill="#FFFFFF"
                />
                <line x1="30" y1="17" x2="30" y2="44.5" stroke="#8C4E40" strokeWidth="1.6" />
            </Glyph>
        </IconTile>
    );
}

// Research — an Erlenmeyer flask on dusty teal, not v2's bright green-teal.
// Muted blue-green gradient; liquid line and bubbles in the dark end.
export function ResearchIcon({ size = 60 }) {
    return (
        <IconTile size={size} background="linear-gradient(180deg, #7FB0A8 0%, #5B938C 55%, #467A73 100%)">
            <Glyph>
                <path
                    d="M26 10 h8 v12 l7.5 17.5 a4 4 0 0 1 -3.7 5.5 H22.2 a4 4 0 0 1 -3.7 -5.5 L26 22 z"
                    fill="#FFFFFF"
                />
                <line x1="22.5" y1="35" x2="37.5" y2="35" stroke="#467A73" strokeWidth="2.4" strokeLinecap="round" />
                <circle cx="27" cy="30" r="1.8" fill="#467A73" />
                <circle cx="33.5" cy="39.5" r="1.4" fill="#467A73" />
            </Glyph>
        </IconTile>
    );
}

// Resume — a paper document, warm off-white with a shaded base, ruled
// lines in muted slate instead of v2's bright #0A84FF. The quietest icon
// on the screen, the way a document icon should be.
export function ResumeIcon({ size = 60 }) {
    return (
        <IconTile size={size} background="linear-gradient(180deg, #F6F4EF 0%, #E9E6DC 100%)">
            <Glyph>
                <path
                    d="M18 10 h17 l9 9 V48 a2 2 0 0 1 -2 2 H18 a2 2 0 0 1 -2 -2 V12 a2 2 0 0 1 2-2 z"
                    fill="#FBFAF6"
                    stroke="#C9C4B8"
                    strokeWidth="1"
                />
                <path d="M35 10 l9 9 h-7 a2 2 0 0 1 -2 -2 z" fill="#C9C4B8" />
                <g stroke="#6E7B8A" strokeWidth="2.6" strokeLinecap="round">
                    <line x1="21" y1="26" x2="39" y2="26" />
                    <line x1="21" y1="33" x2="39" y2="33" />
                    <line x1="21" y1="40" x2="32" y2="40" />
                </g>
            </Glyph>
        </IconTile>
    );
}

// LinkedIn — the real mark: bold white "in" on #0A66C2. Brand colors are
// realistic by definition; unchanged from v2.
export function LinkedInIcon({ size = 60 }) {
    return (
        <IconTile size={size} background="#0A66C2">
            <svg width="34" height="34" viewBox="0 0 60 60" aria-hidden="true">
                <text
                    x="30"
                    y="42"
                    textAnchor="middle"
                    fontSize="30"
                    fontWeight="800"
                    letterSpacing="-2"
                    fill="#FFFFFF"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', Arial, sans-serif"
                >
                    in
                </text>
            </svg>
        </IconTile>
    );
}

// GitHub — the octocat mark on near-black. Unchanged from v2.
export function GitHubIcon({ size = 60 }) {
    return (
        <IconTile size={size} background="#1C1C1E">
            <Github className="w-[30px] h-[30px] text-white" strokeWidth={2} />
        </IconTile>
    );
}
