import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, BookOpen, Calendar, Tag } from 'lucide-react';
import { posts, formatDate } from '../../data/posts';

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
            <blockquote className="border-l-4 border-blue-400 pl-4 py-1 text-lg italic text-gray-700">
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

export default function Blog({ initialPostId = 'obsession' }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPostId, setSelectedPostId] = useState(() =>
        posts.some((post) => post.id === initialPostId) ? initialPostId : 'obsession'
    );

    const sortedPosts = useMemo(() => {
        return [...posts].sort((a, b) => b.date.localeCompare(a.date));
    }, []);

    const filteredPosts = useMemo(() => {
        if (!searchTerm) return sortedPosts;
        const term = searchTerm.toLowerCase();
        return sortedPosts.filter(
            (post) =>
                post.title.toLowerCase().includes(term) ||
                post.excerpt.toLowerCase().includes(term) ||
                post.tags.some((tag) => tag.toLowerCase().includes(term)) ||
                post.blocks.some((block) => block.text.toLowerCase().includes(term))
        );
    }, [searchTerm, sortedPosts]);

    const selectedPost =
        posts.find((post) => post.id === selectedPostId) || filteredPosts[0] || sortedPosts[0];

    // Keep the address bar and tab title in sync so copying the URL always
    // yields a shareable deep link.
    useEffect(() => {
        window.history.replaceState(null, '', '?post=' + selectedPostId);
        const post = posts.find((p) => p.id === selectedPostId);
        document.title = post ? `${post.title} — Namkhang Le` : 'Namkhang Le';
        return () => {
            document.title = 'Namkhang Le';
        };
    }, [selectedPostId]);

    return (
        <div className="flex h-full bg-[#FCFCFD] text-gray-800 font-sans select-none overflow-hidden">
            {/* Sidebar */}
            <div className="w-72 border-r border-[#E5E5E5] flex flex-col bg-[#F6F6F6]/90 backdrop-blur-xl">
                <div className="p-4 space-y-3">
                    <div className="flex items-center gap-1.5 text-[#8E8E93] text-[10px] font-black uppercase tracking-[0.15em] px-1">
                        <BookOpen className="w-3 h-3" />
                        <span>Blog Posts</span>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8E8E93] group-focus-within:text-[#3478F6] transition-colors" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search posts"
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
                </div>

                <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <div
                                key={post.id}
                                onClick={() => setSelectedPostId(post.id)}
                                className={`flex flex-col p-3 rounded-lg cursor-pointer transition-all ${
                                    selectedPostId === post.id
                                        ? 'bg-[#EBCB8B] shadow-sm'
                                        : 'hover:bg-gray-200/50'
                                }`}
                            >
                                <span
                                    className={`text-[13px] font-bold truncate ${
                                        selectedPostId === post.id ? 'text-gray-900' : 'text-gray-800'
                                    }`}
                                >
                                    {post.title}
                                </span>
                                <span
                                    className={`text-[11px] mt-0.5 flex items-center gap-1 ${
                                        selectedPostId === post.id ? 'text-gray-700' : 'text-[#A1A1A1]'
                                    }`}
                                >
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(post.date)}
                                </span>
                                <span
                                    className={`text-[11px] truncate mt-1 ${
                                        selectedPostId === post.id ? 'text-gray-700' : 'text-[#B0B0B0]'
                                    }`}
                                >
                                    {post.excerpt}
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
                        {filteredPosts.length} {filteredPosts.length === 1 ? 'Post' : 'Posts'}
                    </span>
                </div>
            </div>

            {/* Reading pane */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
                <div className="px-10 py-8 border-b border-[#F2F2F2] bg-white/80 backdrop-blur sticky top-0 z-10">
                    <h1 className="text-2xl font-black text-gray-900 leading-tight tracking-tight">
                        {selectedPost.title}
                    </h1>
                    <div className="mt-3 flex items-center gap-4 text-[12px] text-gray-500">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(selectedPost.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5" />
                            {selectedPost.tags.join(', ')}
                        </span>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto px-10 py-8">
                    <div className="max-w-3xl space-y-5">
                        {selectedPost.blocks.map((block, i) => (
                            <Block key={i} block={block} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
