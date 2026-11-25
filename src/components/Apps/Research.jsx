import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, FlaskConical, Calendar, Tag } from 'lucide-react';
import { researchNotes } from '../../data/research';
import { formatDate } from '../../data/posts';

// Convert [text](url) inline markdown links into real anchor elements.
function renderInline(text) {
    const parts = [];
    const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
    let lastIndex = 0;
    let match;
    let key = 0;
    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        parts.push(
            <a
                key={key++}
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline decoration-blue-300 hover:decoration-blue-600 transition-colors"
            >
                {match[1]}
            </a>
        );
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }
    return parts;
}

function Block({ block }) {
    if (block.type === 'h2') {
        return (
            <h2 className="text-xl font-bold text-gray-900 tracking-tight mt-8">
                {renderInline(block.text)}
            </h2>
        );
    }
    if (block.type === 'quote') {
        return (
            <blockquote className="border-l-4 border-emerald-400 pl-4 py-1 text-lg italic text-gray-700">
                {renderInline(block.text)}
            </blockquote>
        );
    }
    if (block.type === 'code') {
        return (
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto text-[13px] leading-relaxed font-mono">
                {block.language && (
                    <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                        {block.language}
                    </div>
                )}
                <code>{block.text}</code>
            </pre>
        );
    }
    return (
        <p className="text-[15px] leading-relaxed text-gray-700">
            {renderInline(block.text)}
        </p>
    );
}

export default function Research({ initialNoteId = 'pura-battery-note' }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedNoteId, setSelectedNoteId] = useState(() =>
        researchNotes.some((note) => note.id === initialNoteId)
            ? initialNoteId
            : researchNotes[0]?.id
    );

    const sortedNotes = useMemo(() => {
        return [...researchNotes].sort((a, b) => b.date.localeCompare(a.date));
    }, []);

    const filteredNotes = useMemo(() => {
        if (!searchTerm) return sortedNotes;
        const term = searchTerm.toLowerCase();
        return sortedNotes.filter(
            (note) =>
                note.title.toLowerCase().includes(term) ||
                note.excerpt.toLowerCase().includes(term) ||
                note.tags.some((tag) => tag.toLowerCase().includes(term)) ||
                note.blocks.some((block) => block.text.toLowerCase().includes(term))
        );
    }, [searchTerm, sortedNotes]);

    const selectedNote =
        selectedNoteId
            ? researchNotes.find((note) => note.id === selectedNoteId) || filteredNotes[0] || sortedNotes[0]
            : null;

    // Keep the address bar and tab title in sync so copying the URL always
    // yields a shareable deep link.
    useEffect(() => {
        if (!selectedNoteId) {
            window.history.replaceState(null, '', '/');
            document.title = 'Namkhang Le';
            return;
        }
        window.history.replaceState(null, '', '?research=' + selectedNoteId);
        const note = researchNotes.find((n) => n.id === selectedNoteId);
        document.title = note ? `${note.title} — Namkhang Le` : 'Namkhang Le';
        return () => {
            document.title = 'Namkhang Le';
        };
    }, [selectedNoteId]);

    return (
        <div className="flex h-full bg-[#FCFCFD] text-gray-800 font-sans select-none overflow-hidden">
            {/* Sidebar — on phones it is the full view when no note is
                selected, and hidden while a note is open. */}
            <div className={`w-72 border-r border-[#E5E5E5] flex flex-col bg-[#F6F6F6]/90 backdrop-blur-xl ${selectedNote ? 'max-md:hidden' : 'max-md:w-full max-md:border-r-0'}`}>
                <div className="p-4 space-y-3">
                    <div className="flex items-center gap-1.5 text-[#8E8E93] text-[10px] font-black uppercase tracking-[0.15em] px-1">
                        <FlaskConical className="w-3 h-3" />
                        <span>Research Notes</span>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8E8E93] group-focus-within:text-[#3478F6] transition-colors" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search research"
                            className="w-full bg-[#E3E3E8] border-none rounded-md py-1.5 pl-9 pr-8 text-[13px] focus:ring-2 focus:ring-[#3478F6]/20 outline-none transition-all placeholder-[#8E8E93]"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-400/20 rounded-full transition-colors"
                            >
                                <X className="w-3 h-3 text-[#8E8E93]" />
                            </button>
                        )}
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#8E8E93] px-1">
                        Public research notes on LLM agents, agent harnesses, and evaluation — the work behind my move toward frontier AI research.
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((note) => (
                            <div
                                key={note.id}
                                onClick={() => setSelectedNoteId(note.id)}
                                className={`flex flex-col p-3 rounded-lg cursor-pointer transition-all ${
                                    selectedNoteId === note.id
                                        ? 'bg-[#A7D8C4] shadow-sm'
                                        : 'hover:bg-gray-200/50'
                                }`}
                            >
                                <span
                                    className={`text-[13px] font-bold truncate ${
                                        selectedNoteId === note.id ? 'text-gray-900' : 'text-gray-800'
                                    }`}
                                >
                                    {note.title}
                                </span>
                                <span
                                    className={`text-[11px] mt-0.5 flex items-center gap-1 ${
                                        selectedNoteId === note.id ? 'text-gray-700' : 'text-[#A1A1A1]'
                                    }`}
                                >
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(note.date)}
                                </span>
                                <span
                                    className={`text-[11px] truncate mt-1 ${
                                        selectedNoteId === note.id ? 'text-gray-700' : 'text-[#B0B0B0]'
                                    }`}
                                >
                                    {note.excerpt}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                            <Search className="w-8 h-8 text-[#E5E5E5] mb-2" />
                            <p className="text-[13px] font-medium text-[#8E8E93]">
                                No Results for &quot;{searchTerm}&quot;
                            </p>
                            <p className="text-[11px] text-[#A1A1A1] mt-1">Try a different search term.</p>
                        </div>
                    )}
                </div>

                <div className="p-3 border-t border-[#E5E5E5] text-center bg-[#F6F6F6]/50">
                    <span className="text-[10px] font-medium text-[#8E8E93] uppercase tracking-wider">
                        {filteredNotes.length} {filteredNotes.length === 1 ? 'Note' : 'Notes'}
                    </span>
                </div>
            </div>

            {/* Reading pane — hidden on phones until a note is picked. */}
            {selectedNote && (
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
                <div className="px-10 py-8 max-md:px-5 max-md:py-6 border-b border-[#F2F2F2] bg-white/80 backdrop-blur sticky top-0 z-10">
                    <h1 className="text-2xl font-black text-gray-900 leading-tight tracking-tight">
                        {selectedNote.title}
                    </h1>
                    <div className="mt-3 flex items-center gap-4 text-[12px] text-gray-500">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(selectedNote.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5" />
                            {selectedNote.tags.join(', ')}
                        </span>
                    </div>
                    {selectedNote.byline && (
                        <p className="mt-3 text-[13px] leading-relaxed text-gray-600 italic">
                            {selectedNote.byline}
                        </p>
                    )}
                </div>
                <div className="flex-1 overflow-y-auto px-10 py-8 max-md:px-5 max-md:py-6">
                    <div className="max-w-3xl space-y-5">
                        <button
                            onClick={() => setSelectedNoteId(null)}
                            className="md:hidden text-[13px] font-semibold text-[#3478F6]"
                        >
                            ← All notes
                        </button>
                        {selectedNote.blocks.map((block, i) => (
                            <Block key={i} block={block} />
                        ))}
                    </div>
                </div>
            </div>)}
        </div>
    );
}
