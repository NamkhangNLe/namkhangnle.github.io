// Hand-drawn app icons, built the way real iOS icons are built: a squircle
// (22.37% radius, the iOS continuous-corner approximation), a layered
// background with a top inner highlight and a bottom shade, and a FILLED,
// heavy glyph drawn as an SVG path — not a flat gradient with a thin outline
// icon on top. That last part is exactly what made v1 look like a costume.

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
                    'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.10), 0 6px 14px rgba(0,0,0,0.35)',
            }}
        >
            {children}
        </span>
    );
}

function Glyph({ children }) {
    return (
        <svg width="34" height="34" viewBox="0 0 60 60" aria-hidden="true">
            {children}
        </svg>
    );
}

// Projects — a folder with a tab and a front face, like Files/Finder.
// Two blues give it depth instead of one flat fill. The tab is drawn
// large and the front face carries a top highlight, so the folder reads
// as a folder at 60px instead of a blue tile with a dash.
export function ProjectsIcon({ size = 60 }) {
    return (
        <IconTile size={size} background="linear-gradient(180deg, #5AC8FA 0%, #0A84FF 55%, #0071E3 100%)">
            <Glyph>
                <defs>
                    <linearGradient id="folderBody" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4DB2FF" />
                        <stop offset="100%" stopColor="#0A84FF" />
                    </linearGradient>
                </defs>
                <path d="M13 13 h13 l4.5 5.5 H47 a3 3 0 0 1 3 3 v1 H10 v-6.5 a3 3 0 0 1 3-3 z" fill="#8ED6FF" />
                <path
                    d="M10 22.5 h40 a3 3 0 0 1 3 3 V42 a4 4 0 0 1 -4 4 H11 a4 4 0 0 1 -4 -4 V25.5 a3 3 0 0 1 3-3 z"
                    fill="url(#folderBody)"
                />
                <rect x="10" y="22.5" width="40" height="2.5" rx="1" fill="#FFFFFF" opacity="0.45" />
                <rect x="10" y="42" width="40" height="4" rx="2" fill="#005CB8" opacity="0.35" />
            </Glyph>
        </IconTile>
    );
}

// Experience — the Notes icon: white top, yellow bottom, ruled lines.
// Instantly recognizable because it copies the real icon's construction.
export function ExperienceIcon({ size = 60 }) {
    return (
        <IconTile
            size={size}
            background="linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #FFD60A 60%, #FF9F0A 100%)"
        >
            <Glyph>
                <g stroke="#8E8E93" strokeWidth="2.4" strokeLinecap="round">
                    <line x1="18" y1="20" x2="42" y2="20" />
                    <line x1="18" y1="28" x2="42" y2="28" />
                    <line x1="18" y1="36" x2="42" y2="36" />
                    <line x1="18" y1="44" x2="36" y2="44" />
                </g>
            </Glyph>
        </IconTile>
    );
}

// About — the Messages bubble: a filled white bubble with a tail, on the
// green gradient. One solid shape, no outline stroke.
export function AboutIcon({ size = 60 }) {
    return (
        <IconTile size={size} background="linear-gradient(180deg, #63E691 0%, #30D158 55%, #28CD41 100%)">
            <Glyph>
                <path
                    d="M30 13 c-9.9 0 -18 6.2 -18 13.5 c0 4.2 2.7 7.9 6.9 10.2 L17 45 l8.6 -4.4 c1.4 0.3 2.9 0.4 4.4 0.4 c9.9 0 18 -6.2 18 -13.5 C48 19.2 39.9 13 30 13 z"
                    fill="#FFFFFF"
                />
            </Glyph>
        </IconTile>
    );
}

// Blog — an open book, filled white, spine crease in the background color.
export function BlogIcon({ size = 60 }) {
    return (
        <IconTile size={size} background="linear-gradient(180deg, #FF9F0A 0%, #FF375F 100%)">
            <Glyph>
                <path
                    d="M30 17 c-4.5 -3.5 -10.5 -3.5 -15 -1.5 V43 c4.5 -2 10.5 -2 15 1.5 c4.5 -3.5 10.5 -3.5 15 -1.5 V15.5 c-4.5 -2 -10.5 -2 -15 1.5 z"
                    fill="#FFFFFF"
                />
                <line x1="30" y1="17" x2="30" y2="44.5" stroke="#FF375F" strokeWidth="1.6" />
            </Glyph>
        </IconTile>
    );
}

// Research — a filled Erlenmeyer flask with a liquid line and bubbles.
export function ResearchIcon({ size = 60 }) {
    return (
        <IconTile size={size} background="linear-gradient(180deg, #30D158 0%, #00C7BE 100%)">
            <Glyph>
                <path
                    d="M26 10 h8 v12 l7.5 17.5 a4 4 0 0 1 -3.7 5.5 H22.2 a4 4 0 0 1 -3.7 -5.5 L26 22 z"
                    fill="#FFFFFF"
                />
                <line x1="22.5" y1="35" x2="37.5" y2="35" stroke="#00C7BE" strokeWidth="2.4" strokeLinecap="round" />
                <circle cx="27" cy="30" r="1.8" fill="#00C7BE" />
                <circle cx="33.5" cy="39.5" r="1.4" fill="#00C7BE" />
            </Glyph>
        </IconTile>
    );
}

// Resume — a white document with a folded corner and blue ruled lines.
export function ResumeIcon({ size = 60 }) {
    return (
        <IconTile size={size} background="linear-gradient(180deg, #FFFFFF 0%, #E9E9EF 100%)">
            <Glyph>
                <path
                    d="M18 10 h17 l9 9 V48 a2 2 0 0 1 -2 2 H18 a2 2 0 0 1 -2 -2 V12 a2 2 0 0 1 2-2 z"
                    fill="#F2F2F7"
                    stroke="#D1D1D6"
                    strokeWidth="1"
                />
                <path d="M35 10 l9 9 h-7 a2 2 0 0 1 -2 -2 z" fill="#D1D1D6" />
                <g stroke="#0A84FF" strokeWidth="2.6" strokeLinecap="round">
                    <line x1="21" y1="26" x2="39" y2="26" />
                    <line x1="21" y1="33" x2="39" y2="33" />
                    <line x1="21" y1="40" x2="32" y2="40" />
                </g>
            </Glyph>
        </IconTile>
    );
}

// LinkedIn — the real mark: bold white "in" on #0A66C2.
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

// GitHub — the octocat mark on near-black.
export function GitHubIcon({ size = 60 }) {
    return (
        <IconTile size={size} background="#1C1C1E">
            <Github className="w-[30px] h-[30px] text-white" strokeWidth={2} />
        </IconTile>
    );
}
