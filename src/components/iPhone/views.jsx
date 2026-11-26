// Dedicated iOS-native views for the phone shell. Each view is built from
// the iOS primitives (grouped lists, large titles, inset separators, article
// typography) and reads from the same data files as the desktop — but none of
// them renders a Mac window component. That is the whole point of the rebuild.

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, ExternalLink, Send, Bot, HeartPulse, PencilLine, Flashlight, Stethoscope, Trophy, Mail, MapPin } from 'lucide-react';
import { posts, formatDate } from '../../data/posts';
import { researchNotes } from '../../data/research';
import { projects, projectFolders, experience, awards, about } from './data';
import {
    IOS_BLUE, IOS_BG, IOS_SECONDARY,
    SearchField, GroupedSection, Row, RowTile, LargeTitle, ArticleBlock,
} from './ios';

// ---------------------------------------------------------------------------
// Article reader (shared by Blog and Research). Apple News style: 28px bold
// title, gray meta, 17px body with 1.55 leading.
// ---------------------------------------------------------------------------
function Reader({ item, kind, onBackToList }) {
    const isNote = kind === 'note';
    useEffect(() => {
        const param = isNote ? 'research' : 'post';
        window.history.replaceState(null, '', `?${param}=${item.id}`);
        document.title = `${item.title} — Namkhang Le`;
        return () => {
            document.title = 'Namkhang Le';
        };
    }, [item.id, item.title, isNote]);

    return (
        <div className="px-5 pt-2 pb-8">
            <h2 className="text-[28px] leading-[1.2] font-bold text-[#000000] tracking-tight">
                {item.title}
            </h2>
            <p className="mt-2 text-[13px] text-[#8E8E93]">
                {formatDate(item.date)}
                {' · '}
                {item.tags.join(', ')}
            </p>
            {item.byline && (
                <p className="mt-3 text-[13px] leading-[1.45] text-[#6D6D72] italic">{item.byline}</p>
            )}
            <div className="mt-5 space-y-5">
                {item.blocks.map((block, i) => {
                    // The research note opens with an editor's note about the
                    // missing references / Figure 1a — present it as a callout
                    // card, not a body quote.
                    if (isNote && i === 0 && block.type === 'quote') {
                        return (
                            <div key={i} className="bg-[#F2F2F7] rounded-[10px] px-4 py-3">
                                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6D6D72] mb-1">
                                    Editor’s note
                                </p>
                                <p className="text-[15px] leading-[1.5] text-[#3A3A3C]">{block.text}</p>
                            </div>
                        );
                    }
                    return <ArticleBlock key={i} block={block} />;
                })}
            </div>
            <button
                onClick={onBackToList}
                className="mt-8 text-[17px] font-semibold text-[#007AFF] active:opacity-60"
            >
                ← All {isNote ? 'notes' : 'posts'}
            </button>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Blog: grouped list of posts, tap to push the reader.
// ---------------------------------------------------------------------------
export function BlogListView({ nav, initialPostId }) {
    const [searchTerm, setSearchTerm] = useState('');
    const openedInitialRef = useRef(false);

    const sorted = useMemo(() => [...posts].sort((a, b) => b.date.localeCompare(a.date)), []);
    const filtered = useMemo(() => {
        if (!searchTerm) return sorted;
        const t = searchTerm.toLowerCase();
        return sorted.filter(
            (p) =>
                p.title.toLowerCase().includes(t) ||
                p.excerpt.toLowerCase().includes(t) ||
                p.tags.some((tag) => tag.toLowerCase().includes(t)) ||
                p.blocks.some((b) => b.text.toLowerCase().includes(t))
        );
    }, [searchTerm, sorted]);

    const openPost = (post) => {
        nav.push({
            key: `post-${post.id}`,
            title: post.title,
            backTitle: 'Blog',
            bg: '#FFFFFF',
            render: ({ pop }) => <Reader item={post} kind="post" onBackToList={pop} />,
        });
    };

    // Deep link: open the requested post on top of the list.
    useEffect(() => {
        if (!openedInitialRef.current && initialPostId && posts.some((p) => p.id === initialPostId)) {
            openedInitialRef.current = true;
            const post = posts.find((p) => p.id === initialPostId);
            openPost(post);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialPostId]);

    return (
        <div className="pb-6">
            <LargeTitle>Blog</LargeTitle>
            <div className="px-4 pb-2">
                <SearchField value={searchTerm} onChange={setSearchTerm} placeholder="Search" />
            </div>
            <GroupedSection
                title="Writing"
                footer="Writing on careers, resumes, and AI."
            >
                {filtered.length > 0 ? (
                    filtered.map((post, i) => (
                        <Row
                            key={post.id}
                            last={i === filtered.length - 1}
                            title={post.title}
                            subtitle={post.excerpt}
                            detail={formatDate(post.date)}
                            onClick={() => openPost(post)}
                        />
                    ))
                ) : (
                    <p className="px-4 py-8 text-center text-[15px] text-[#8E8E93]">
                        No results for “{searchTerm}”
                    </p>
                )}
            </GroupedSection>
            <p className="px-8 pt-4 text-center text-[13px] text-[#8E8E93]">
                {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
            </p>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Research: same shape, teal accent in spirit, byline + editor's note.
// ---------------------------------------------------------------------------
export function ResearchListView({ nav, initialNoteId }) {
    const [searchTerm, setSearchTerm] = useState('');
    const openedInitialRef = useRef(false);

    const sorted = useMemo(() => [...researchNotes].sort((a, b) => b.date.localeCompare(a.date)), []);
    const filtered = useMemo(() => {
        if (!searchTerm) return sorted;
        const t = searchTerm.toLowerCase();
        return sorted.filter(
            (n) =>
                n.title.toLowerCase().includes(t) ||
                n.excerpt.toLowerCase().includes(t) ||
                n.tags.some((tag) => tag.toLowerCase().includes(t)) ||
                n.blocks.some((b) => b.text.toLowerCase().includes(t))
        );
    }, [searchTerm, sorted]);

    const openNote = (note) => {
        nav.push({
            key: `note-${note.id}`,
            title: note.title,
            backTitle: 'Research',
            bg: '#FFFFFF',
            render: ({ pop }) => <Reader item={note} kind="note" onBackToList={pop} />,
        });
    };

    useEffect(() => {
        if (!openedInitialRef.current && initialNoteId && researchNotes.some((n) => n.id === initialNoteId)) {
            openedInitialRef.current = true;
            openNote(researchNotes.find((n) => n.id === initialNoteId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialNoteId]);

    return (
        <div className="pb-6">
            <LargeTitle>Research</LargeTitle>
            <div className="px-4 pb-2">
                <SearchField value={searchTerm} onChange={setSearchTerm} placeholder="Search" />
            </div>
            <GroupedSection
                title="Research notes"
                footer="Public research notes on LLM agents, agent harnesses, and evaluation — the work behind my move toward frontier AI research."
            >
                {filtered.length > 0 ? (
                    filtered.map((note, i) => (
                        <Row
                            key={note.id}
                            last={i === filtered.length - 1}
                            title={note.title}
                            subtitle={note.excerpt}
                            detail={formatDate(note.date)}
                            onClick={() => openNote(note)}
                        />
                    ))
                ) : (
                    <p className="px-4 py-8 text-center text-[15px] text-[#8E8E93]">
                        No results for “{searchTerm}”
                    </p>
                )}
            </GroupedSection>
            <p className="px-8 pt-4 text-center text-[13px] text-[#8E8E93]">
                {filtered.length} {filtered.length === 1 ? 'note' : 'notes'}
            </p>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Projects: grouped by folder, Settings-style rows with a colored tile,
// detail screen with the description and a link button.
// ---------------------------------------------------------------------------
const PROJECT_GLYPHS = {
    bobalabs: <Bot className="w-5 h-5 text-white" strokeWidth={2.5} />,
    diagnoseme: <HeartPulse className="w-5 h-5 text-white" strokeWidth={2.5} />,
    scribbletex: <PencilLine className="w-5 h-5 text-white" strokeWidth={2.5} />,
    morsetorch: <Flashlight className="w-5 h-5 text-white" strokeWidth={2.5} />,
    hemodynamics: <Stethoscope className="w-5 h-5 text-white" strokeWidth={2.5} />,
};

function ProjectDetail({ project }) {
    return (
        <div className="px-5 pt-2 pb-8">
            <div className="flex items-center gap-3">
                <RowTile background={project.tile}>{PROJECT_GLYPHS[project.id]}</RowTile>
                <div>
                    <h2 className="text-[22px] leading-[1.2] font-bold text-[#000000] tracking-tight">
                        {project.title}
                    </h2>
                    <p className="text-[13px] text-[#8E8E93]">{project.date}</p>
                </div>
            </div>
            <p className="mt-5 text-[17px] leading-[1.55] text-[#1C1C1E]">{project.description}</p>
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-[12px] bg-[#007AFF] text-white text-[17px] font-semibold active:opacity-70"
            >
                <ExternalLink className="w-4 h-4" />
                {project.linkText}
            </a>
        </div>
    );
}

export function ProjectsView({ nav }) {
    const openProject = (project) => {
        nav.push({
            key: `project-${project.id}`,
            title: project.title,
            backTitle: 'Projects',
            bg: '#FFFFFF',
            render: () => <ProjectDetail project={project} />,
        });
    };
    return (
        <div className="pb-6">
            <LargeTitle>Projects</LargeTitle>
            {projectFolders.map((folder) => {
                const items = projects.filter((p) => p.folder === folder);
                if (items.length === 0) return null;
                return (
                    <GroupedSection key={folder} title={folder}>
                        {items.map((project, i) => (
                            <Row
                                key={project.id}
                                last={i === items.length - 1}
                                icon={
                                    <RowTile background={project.tile}>
                                        {PROJECT_GLYPHS[project.id]}
                                    </RowTile>
                                }
                                title={project.title}
                                detail={project.date}
                                onClick={() => openProject(project)}
                            />
                        ))}
                    </GroupedSection>
                );
            })}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Experience: role list, detail with impact bullets, skills, awards.
// ---------------------------------------------------------------------------
function RoleDetail({ role }) {
    return (
        <div className="pb-8">
            <div className="px-5 pt-2">
                <h2 className="text-[28px] leading-[1.2] font-bold text-[#000000] tracking-tight">
                    {role.title}
                </h2>
                <p className="mt-1 text-[17px] text-[#007AFF] font-medium">
                    <a href={role.url} target="_blank" rel="noopener noreferrer">
                        {role.company}
                    </a>
                </p>
                <p className="mt-1 text-[15px] text-[#8E8E93]">
                    {role.period} · {role.location}
                </p>
            </div>
            <GroupedSection title="Impact">
                <div className="px-4 py-3 space-y-4">
                    {role.points.map((point, i) => (
                        <div key={i} className="flex gap-3">
                            <span className="mt-[9px] w-[7px] h-[7px] rounded-full bg-[#007AFF] shrink-0" />
                            <p className="text-[16px] leading-[1.5] text-[#1C1C1E]">{point}</p>
                        </div>
                    ))}
                </div>
            </GroupedSection>
            <GroupedSection title="Skills">
                <div className="px-4 py-3 flex flex-wrap gap-2">
                    {role.skills.map((skill) => (
                        <span
                            key={skill}
                            className="px-3 py-1.5 rounded-full bg-[#F2F2F7] text-[14px] font-medium text-[#3A3A3C]"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </GroupedSection>
        </div>
    );
}

export function ExperienceView({ nav }) {
    const [searchTerm, setSearchTerm] = useState('');
    const filtered = useMemo(() => {
        if (!searchTerm) return experience;
        const t = searchTerm.toLowerCase();
        return experience.filter(
            (r) =>
                r.company.toLowerCase().includes(t) ||
                r.title.toLowerCase().includes(t) ||
                r.points.some((p) => p.toLowerCase().includes(t))
        );
    }, [searchTerm]);

    const openRole = (role) => {
        nav.push({
            key: `role-${role.id}`,
            title: role.company,
            backTitle: 'Experience',
            bg: '#FFFFFF',
            render: () => <RoleDetail role={role} />,
        });
    };

    return (
        <div className="pb-6">
            <LargeTitle>Experience</LargeTitle>
            <div className="px-4 pb-2">
                <SearchField value={searchTerm} onChange={setSearchTerm} placeholder="Search" />
            </div>
            <GroupedSection title="Roles">
                {filtered.length > 0 ? (
                    filtered.map((role, i) => (
                        <Row
                            key={role.id}
                            last={i === filtered.length - 1}
                            title={role.company}
                            subtitle={role.title}
                            detail={`${role.period} · ${role.location}`}
                            onClick={() => openRole(role)}
                        />
                    ))
                ) : (
                    <p className="px-4 py-8 text-center text-[15px] text-[#8E8E93]">
                        No results for “{searchTerm}”
                    </p>
                )}
            </GroupedSection>
            <GroupedSection title="Awards">
                {awards.map((award, i) => (
                    <Row
                        key={award}
                        last={i === awards.length - 1}
                        showChevron={false}
                        icon={
                            <RowTile background="#FFD60A">
                                <Trophy className="w-5 h-5 text-white" strokeWidth={2.5} />
                            </RowTile>
                        }
                        title={award}
                    />
                ))}
            </GroupedSection>
        </div>
    );
}

// ---------------------------------------------------------------------------
// About: a real iOS Messages conversation, rebuilt as a dedicated mobile
// view — proper bubbles, typing indicator, Delivered label, input bar that
// opens a mail draft. Tapping the contact header opens a contact card.
// ---------------------------------------------------------------------------
const ABOUT_MESSAGES = [
    { id: 1, text: 'Hi! I’m Namkhang Le.' },
    { id: 2, text: 'I’m a Software Engineer at Meta, where I work on LLMs and generative AI — agent harnesses and evaluation for the AI assistants used across the company.' },
    { id: 3, text: 'Before Meta: AWS, Lockheed Martin, and Citi. Georgia Tech CS ’25, focuses in AI and computer networking.' },
    { id: 4, text: 'Technologies I’ve been working with: Python · TypeScript · React.js · PyTorch · Node.js · Java' },
    { id: 5, text: 'Outside of work I love building things at hackathons, I’m nerdy about tech gadgets, I love literary fiction, and I play way too many battle royale games. 🎮' },
];

function ContactCard() {
    const rows = [
        { icon: <Mail className="w-5 h-5 text-white" strokeWidth={2.5} />, tile: '#007AFF', label: 'Email', value: about.email, href: `mailto:${about.email}` },
        { icon: <MapPin className="w-5 h-5 text-white" strokeWidth={2.5} />, tile: '#30D158', label: 'Location', value: 'New York, NY', href: null },
    ];
    return (
        <div className="pb-8">
            <div className="flex flex-col items-center pt-2 pb-1">
                <div
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-white text-[26px] font-bold"
                    style={{ background: 'linear-gradient(135deg, #0A84FF, #AF52DE)' }}
                >
                    NL
                </div>
                <h2 className="mt-3 text-[22px] font-bold text-[#000000]">{about.name}</h2>
                <p className="mt-0.5 px-8 text-center text-[15px] text-[#8E8E93]">{about.role}</p>
                <p className="mt-0.5 px-8 text-center text-[13px] text-[#8E8E93]">{about.school}</p>
            </div>
            <GroupedSection title="Contact">
                {rows.map((row, i) => (
                    <Row
                        key={row.label}
                        last={i === rows.length - 1}
                        showChevron={!!row.href}
                        icon={<RowTile background={row.tile}>{row.icon}</RowTile>}
                        title={row.label}
                        subtitle={row.value}
                        onClick={row.href ? () => window.open(row.href, '_blank') : undefined}
                    />
                ))}
            </GroupedSection>
            <GroupedSection title="Elsewhere">
                <Row
                    last={false}
                    title="LinkedIn"
                    subtitle="linkedin.com/in/namkhangnle"
                    onClick={() => window.open('https://linkedin.com/in/namkhangnle', '_blank')}
                />
                <Row
                    last
                    title="GitHub"
                    subtitle="github.com/NamkhangNLe"
                    onClick={() => window.open('https://github.com/NamkhangNLe', '_blank')}
                />
            </GroupedSection>
        </div>
    );
}

export function AboutView({ nav }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);

    useEffect(() => {
        const timers = [];
        ABOUT_MESSAGES.forEach((msg, index) => {
            timers.push(
                setTimeout(() => setIsTyping(true), (index + 1) * 800 - 450),
                setTimeout(() => {
                    setIsTyping(false);
                    setMessages((prev) =>
                        prev.find((m) => m.id === msg.id) ? prev : [...prev, { ...msg, sender: 'Namkhang' }]
                    );
                }, (index + 1) * 800)
            );
        });
        return () => timers.forEach(clearTimeout);
    }, []);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        const text = inputValue;
        const userMsg = { id: Date.now(), sender: 'You', text };
        setMessages((prev) => [...prev, userMsg]);
        setInputValue('');
        setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                window.location.href = `mailto:${about.email}?subject=Hello from Portfolio&body=${encodeURIComponent(text)}`;
                setMessages((prev) => [
                    ...prev,
                    { id: Date.now() + 1, sender: 'Namkhang', text: 'Thanks for the message! I’ve opened your email client to send it properly. 📧' },
                ]);
            }, 1500);
        }, 800);
    };

    const openContact = () => {
        nav.push({
            key: 'contact-card',
            title: 'Contact',
            backTitle: 'About',
            bg: '#F2F2F7',
            render: () => <ContactCard />,
        });
    };

    return (
        <div className="flex flex-col h-full">
            {/* Contact header — tap for the contact card. */}
            <button
                onClick={openContact}
                className="flex flex-col items-center pt-1 pb-3 shrink-0 active:opacity-70"
            >
                <div
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white text-[19px] font-bold"
                    style={{ background: 'linear-gradient(135deg, #0A84FF, #AF52DE)' }}
                >
                    NL
                </div>
                <p className="mt-1.5 text-[15px] font-semibold text-[#000000]">
                    {about.name} <span className="text-[#8E8E93] font-normal">›</span>
                </p>
            </button>

            <div className="flex-1 overflow-y-auto px-4 space-y-2.5 pb-3">
                {messages.map((msg, index) => (
                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                        <div
                            className={`max-w-[80%] px-3.5 py-2 rounded-[20px] text-[17px] leading-[1.35] ${
                                msg.sender === 'You'
                                    ? 'bg-[#007AFF] text-white rounded-br-[4px]'
                                    : 'bg-[#E9E9EB] text-[#000000] rounded-bl-[4px]'
                            }`}
                        >
                            {msg.text}
                        </div>
                        {index === messages.length - 1 && msg.sender === 'Namkhang' && (
                            <p className="text-[12px] text-[#8E8E93] ml-1 mt-1">Delivered</p>
                        )}
                    </div>
                ))}
                {isTyping && (
                    <div className="flex">
                        <div className="bg-[#E9E9EB] px-3.5 py-3 rounded-[20px] rounded-bl-[4px]">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-[#8E8E93] rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-2 h-2 bg-[#8E8E93] rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-2 h-2 bg-[#8E8E93] rounded-full animate-bounce" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <form
                onSubmit={handleSend}
                className="shrink-0 px-3 pt-1.5 pb-1 flex gap-2 items-center"
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    placeholder="iMessage"
                    className="flex-1 px-4 py-2 border border-[#C6C6C8] rounded-full text-[17px] focus:outline-none focus:border-[#007AFF]"
                />
                <button
                    type="submit"
                    aria-label="Send"
                    className="w-9 h-9 rounded-full bg-[#007AFF] text-white flex items-center justify-center shrink-0 active:opacity-70 disabled:opacity-40"
                    disabled={!inputValue.trim()}
                >
                    <Send className="w-4 h-4 ml-0.5" />
                </button>
            </form>
            {inputFocused && <p className="shrink-0 text-center text-[11px] text-[#8E8E93] pb-1">Messages go to {about.email}</p>}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Resume: the PDF's content as iOS grouped sections — readable, not a
// shrunken document window. Contact header + Download PDF button.
// ---------------------------------------------------------------------------
const RESUME_ROLES = [
    {
        company: 'Meta',
        title: 'Software Engineer',
        period: 'Aug 2025 – Present',
        location: 'New York, NY',
        bullets: [
            'Architected a semantic search and embedding-based retrieval system, improving content discovery and content accuracy.',
            'Standardized LLM evaluation pipelines to benchmark GenAI features, reducing hallucination rates by 34% and increasing accuracy by 12%.',
            'Shipped a new GenAI feature on Android, launching AI-powered summaries and contextual suggestions to 3B+ users.',
            'Led development of an internal full-stack application (React, GraphQL) that scaled Facebook’s meme strategy across surfaces, enabling automated content analysis, curation workflows, and cross-functional collaboration.',
        ],
    },
    {
        company: 'Amazon Web Services',
        title: 'Software Development Engineer Intern',
        period: 'May 2024 – Aug 2024',
        location: 'Arlington, VA',
        bullets: [
            'Engineered a Java and Spring-based customer-facing communication service to automate the delivery of 10+ Government Cloud request email notifications per day by enabling seamless integration with 3 native AWS packages.',
            'Redesigned a 13-year-old email system into a scalable, end-to-end microservices architecture using AWS SWF, SNS, and SQS, achieving a processing rate of over 5 transactions per second (TPS), ensuring redundancy and autoscaling across the application.',
            'Architected a 1st place-winning Amazon Bedrock-powered AI onboarding buddy, fine-tuned on internal documentation, to significantly reduce ramp-up lag time for new software engineers company-wide and reducing question response time.',
        ],
    },
    {
        company: 'Citigroup',
        title: 'Software Engineer Intern',
        period: 'Jun 2023 – Aug 2023',
        location: 'Tampa, FL',
        bullets: [
            'Spearheaded Event Master Central, a full stack application for real-time corporate action event monitoring of financial assets in Angular & Oracle Database, increasing engineering awareness of deployment failures by 18%.',
            'Revamped authentication logic, fortifying API token validation for REST API calls, contributing an 85% uptime to production.',
            'Orchestrated seamless integration with Institutional Services Group’s Cloud services using Spring Boot, optimizing performance through JSON-based HTTP requests, and enhancing overall efficiency by 15% across the application.',
            'Leveraged Python’s Pandas DataFrame to analyze surface temperatures vs global domestic product, resulting in a 0.8 positive correlation within Tableau in support of Citi’s 1 trillion dollar commitment to sustainable finance.',
        ],
    },
    {
        company: 'Lockheed Martin',
        title: 'Software Engineer Intern',
        period: 'May 2022 – Aug 2022',
        location: 'Manassas, VA',
        bullets: [
            'Trained a wildfire-based infrastructure identification AI model through Kubeflow, PyTorch, & TensorFlow, with 98% accuracy.',
            'Implemented a real-time data monitoring interface in Spring, driving a 20% increase in operator awareness & object tracking.',
            'Transformed codebase maintainability by converting logging levels from Apache Log4J to SLF4J, achieving 80% code coverage.',
            'Collaborated with quality analysis team to execute comprehensive testing, resulting in a 12% reduction in logging inefficiencies.',
        ],
    },
];

const RESUME_PROJECTS = [
    {
        name: 'Georgia Tech CS Capstone — Hemodynamics Calculator',
        meta: 'JavaScript, ReactJS, MongoDB, ExpressJS, NodeJS · Aug 2023 – May 2024',
        bullets: [
            'Developed a Hemodynamics Calculator, a full-stack application for the Emory University School of Medicine, to be used by 10 clinicians to reduce measurement error daily, impacting over 1,000 patients within the intensive care unit.',
            'Leveraged ReactJS, Express, and MongoDB to develop user-friendly interactive visualizations of trends in patient data and a reduction in data-related errors by 34%.',
        ],
    },
    {
        name: 'ScribbleTex (AI ATL Hackathon GitHub Winner)',
        meta: 'JavaScript, GCP, VertexAI, Flask, ReactJS · Nov 2023',
        bullets: [
            'Preprocessed 3 datasets comprising over 200,000 samples for the training of a custom machine learning model in Scikit-learn.',
            'Developed a decision tree classifier and a convolutional neural network using Keras achieving a 97% translation accuracy.',
            'Implemented a React-based frontend built using HTML, CSS, and JavaScript connected to a Python Flask backend with REST API endpoints for optimized communication with the CNN model hosted on Google Cloud’s Vertex AI platform.',
        ],
    },
];

export function ResumeView() {
    return (
        <div className="pb-8">
            <LargeTitle>Resume</LargeTitle>
            <div className="px-5 pt-1 pb-2 text-center">
                <h2 className="text-[22px] font-bold text-[#000000]">{about.name}</h2>
                <p className="mt-1 text-[14px] leading-[1.45] text-[#6D6D72]">
                    {about.email} · (571) 443-0967
                    <br />
                    New York, NY · linkedin.com/in/namkhangnle
                </p>
                <a
                    href="/Namkhang_Le_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#007AFF] text-white text-[15px] font-semibold active:opacity-70"
                >
                    Download PDF
                </a>
            </div>

            <GroupedSection title="Experience">
                {RESUME_ROLES.map((role, ri) => (
                    <div key={role.company} className="px-4 py-3">
                        <div className="flex items-baseline justify-between gap-3">
                            <p className="text-[17px] font-semibold text-[#000000]">{role.company}</p>
                            <p className="text-[13px] text-[#8E8E93] whitespace-nowrap">{role.period}</p>
                        </div>
                        <p className="text-[15px] text-[#6D6D72]">
                            {role.title} · {role.location}
                        </p>
                        <ul className="mt-2 space-y-1.5">
                            {role.bullets.map((b, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="mt-[8px] w-[5px] h-[5px] rounded-full bg-[#007AFF] shrink-0" />
                                    <span className="text-[15px] leading-[1.45] text-[#1C1C1E]">{b}</span>
                                </li>
                            ))}
                        </ul>
                        {ri < RESUME_ROLES.length - 1 && <div className="h-px bg-[#C6C6C8]/60 mt-4 -mx-4" />}
                    </div>
                ))}
            </GroupedSection>

            <GroupedSection title="Projects">
                {RESUME_PROJECTS.map((proj, pi) => (
                    <div key={proj.name} className="px-4 py-3">
                        <p className="text-[17px] font-semibold text-[#000000] leading-[1.3]">{proj.name}</p>
                        <p className="text-[13px] text-[#8E8E93] mt-0.5">{proj.meta}</p>
                        <ul className="mt-2 space-y-1.5">
                            {proj.bullets.map((b, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="mt-[8px] w-[5px] h-[5px] rounded-full bg-[#007AFF] shrink-0" />
                                    <span className="text-[15px] leading-[1.45] text-[#1C1C1E]">{b}</span>
                                </li>
                            ))}
                        </ul>
                        {pi < RESUME_PROJECTS.length - 1 && <div className="h-px bg-[#C6C6C8]/60 mt-4 -mx-4" />}
                    </div>
                ))}
            </GroupedSection>

            <GroupedSection title="Education">
                <div className="px-4 py-3">
                    <p className="text-[17px] font-semibold text-[#000000]">Georgia Institute of Technology</p>
                    <p className="mt-1 text-[15px] leading-[1.45] text-[#1C1C1E]">
                        B.S. Computer Science, concentrations in Intelligence (AI/ML) and Information Internetworks
                    </p>
                    <p className="mt-2 text-[14px] leading-[1.45] text-[#6D6D72]">
                        Data Structures &amp; Algorithms · Artificial Intelligence · Design &amp; Analysis of
                        Algorithms · Computer Organization &amp; Programming · Probability &amp; Statistics ·
                        Combinatorics · Linear Algebra · Computer Systems &amp; Networks · Database Systems
                    </p>
                </div>
            </GroupedSection>

            <GroupedSection title="Skills">
                <div className="px-4 py-3 space-y-3 text-[15px] leading-[1.5] text-[#1C1C1E]">
                    <p>
                        <span className="font-semibold text-[#000000]">Languages: </span>
                        Hack, Java, Python, C, SQL, JavaScript, CSS, HTML, UML, C#, R, Swift, LaTeX
                    </p>
                    <p>
                        <span className="font-semibold text-[#000000]">Technologies: </span>
                        GraphQL, Spring Boot, Angular, Android Studio, Bootstrap, RESTful APIs, Gradle, Pandas,
                        Postman, React, Linux
                    </p>
                    <p>
                        <span className="font-semibold text-[#000000]">Software Development: </span>
                        Agile, Jira, CI/CD, DevSecOps, CLI, Confluence, Coverity, Jenkins, Artifactory, Unit Test, Git
                    </p>
                    <p>
                        <span className="font-semibold text-[#000000]">Spoken Languages: </span>
                        English (Native), Vietnamese (Fluent), Spanish (Limited Working Proficiency)
                    </p>
                </div>
            </GroupedSection>
        </div>
    );
}
