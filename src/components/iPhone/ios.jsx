// Shared iOS primitives for the phone shell. These are the visual language
// real iOS apps share: -apple-system type, inset separators, grouped lists,
// large titles, blue navigation. Nothing here reuses the Mac window
// components — the mobile views are built from these, not from the desktop.

import React from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { renderInline } from './iosUtils';

// ---- Article blocks (blog posts + research notes) ----
export function ArticleBlock({ block }) {
    if (block.type === 'h2') {
        return (
            <h2 className="text-[22px] leading-[1.25] font-bold text-[#1C1C1E] tracking-tight pt-4">
                {renderInline(block.text)}
            </h2>
        );
    }
    if (block.type === 'quote') {
        return (
            <blockquote className="border-l-[3px] border-[#007AFF] pl-4 py-0.5 text-[18px] leading-[1.5] text-[#3A3A3C] italic">
                {renderInline(block.text)}
            </blockquote>
        );
    }
    if (block.type === 'code') {
        return (
            <pre className="bg-[#1C1C1E] text-[#F2F2F7] rounded-[10px] px-4 py-3 overflow-x-auto text-[13px] leading-[1.6] font-mono">
                {block.language && (
                    <div className="text-[10px] uppercase tracking-[0.12em] text-[#8E8E93] mb-2">
                        {block.language}
                    </div>
                )}
                <code>{block.text}</code>
            </pre>
        );
    }
    return (
        <p className="text-[17px] leading-[1.55] text-[#1C1C1E]">{renderInline(block.text)}</p>
    );
}

// ---- iOS search field: the gray pill, not a bordered input ----
export function SearchField({ value, onChange, placeholder }) {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-[#E3E3E8] rounded-[10px] py-2 pl-9 pr-8 text-[17px] leading-none placeholder-[#8E8E93] focus:outline-none"
            />
            {value && (
                <button
                    onClick={() => onChange('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                    aria-label="Clear search"
                >
                    <X className="w-4 h-4 text-[#8E8E93]" />
                </button>
            )}
        </div>
    );
}

// ---- Grouped inset list (iOS Settings style) ----
export function GroupedSection({ title, footer, children }) {
    return (
        <div className="px-4 mt-6 first:mt-0">
            {title && (
                <p className="px-3 pb-1.5 text-[13px] leading-[1.2] text-[#6D6D72] uppercase tracking-wide">
                    {title}
                </p>
            )}
            <div className="bg-white rounded-[10px] overflow-hidden">{children}</div>
            {footer && (
                <p className="px-3 pt-1.5 text-[13px] leading-[1.35] text-[#6D6D72]">{footer}</p>
            )}
        </div>
    );
}

// ---- One row inside a grouped list. Separator is inset 16px from the left,
// the way iOS does it — never full-bleed. ----
export function Row({ onClick, icon, title, subtitle, detail, showChevron = true, last = false }) {
    return (
        <button onClick={onClick} className="w-full text-left active:bg-[#E9E9EB] transition-colors">
            <div className="flex items-center gap-3 pl-4 pr-3 min-h-[56px]">
                {icon}
                <div className="flex-1 min-w-0 py-2.5">
                    <p className="text-[17px] leading-[1.25] text-[#000000] truncate">{title}</p>
                    {subtitle && (
                        <p className="text-[15px] leading-[1.3] text-[#8E8E93] truncate mt-0.5">
                            {subtitle}
                        </p>
                    )}
                    {detail && (
                        <p className="text-[13px] leading-[1.3] text-[#8E8E93] truncate mt-0.5">
                            {detail}
                        </p>
                    )}
                </div>
                {showChevron && <ChevronRight className="w-5 h-5 text-[#C7C7CC] shrink-0" />}
            </div>
            {!last && <div className="h-px bg-[#C6C6C8]/60 ml-4" />}
        </button>
    );
}

// ---- Small colored rounded-square tile with a white glyph, the way iOS
// Settings / Files rows do list icons. ----
export function RowTile({ background, children }) {
    return (
        <span
            className="w-[30px] h-[30px] rounded-[7px] flex items-center justify-center shrink-0"
            style={{ background }}
        >
            {children}
        </span>
    );
}

// ---- Large title, the way it sits at the top of a root screen ----
export function LargeTitle({ children, right }) {
    return (
        <div className="px-5 pt-1 pb-2 flex items-end justify-between gap-3">
            <h1 className="text-[34px] leading-[1.1] font-bold text-[#000000] tracking-tight">
                {children}
            </h1>
            {right}
        </div>
    );
}
