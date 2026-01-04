import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, FileText, Calendar, ExternalLink, X } from 'lucide-react';

const experienceData = [
    {
        id: 'meta',
        company: 'Meta',
        url: 'https://about.meta.com/',
        title: 'Software Engineer',
        period: 'Aug 2025 - Present',
        location: 'Menlo Park, CA',
        skills: ['PyTorch', 'Generative AI', 'LLMs', 'Distributed Systems'],
        points: [
            'Developing and optimizing Large Language Models (LLMs) and Generative AI infrastructure.',
            'Architecting scalable backend services to support high-throughput AI inference and deployment.',
            'Collaborating with cross-functional teams to integrate state-of-the-art AI capabilities into core Meta products.'
        ]
    },
    {
        id: 'aws',
        company: 'AWS',
        url: 'https://aws.amazon.com/',
        title: 'SDE Intern',
        period: 'May 2024 - Aug 2024',
        location: 'Arlington, VA',
        skills: ['Java', 'Spring Boot', 'SWF', 'SNS', 'SQS', 'Bedrock'],
        points: [
            'Engineered a Java and Spring-based customer-facing communication service to automate the delivery of 10+ Government Cloud request email notifications per day by enabling seamless integration with 3 native AWS packages.',
            'Redesigned a 13-year-old email system into a scalable, end-to-end microservices architecture using AWS SWF, SNS, and SQS achieving a processing rate of over 5 transactions per second (TPS), ensuring redundancy and autoscaling across the application.',
            'Architected a 1st place-winning Amazon Bedrock-powered AI onboarding buddy, fine-tuned on internal documentation, to significantly reduce ramp-up lag time for new software engineers company-wide and reducing question response time.'
        ]
    },
    {
        id: 'citi',
        company: 'Citigroup',
        url: 'https://www.citigroup.com/',
        title: 'SWE Intern',
        period: 'June 2023 - Aug 2023',
        location: 'Tampa, FL',
        skills: ['Angular', 'Oracle DB', 'Java', 'Spring Boot', 'Python'],
        points: [
            'Spearheaded Event Master Central, a full stack application for real-time corporate action event monitoring of financial assets in Angular & Oracle Database increasing engineering awareness of deployment failures by 18%.',
            'Revamped authentication logic, fortifying API token validation for REST API calls, contributing an 85% uptime to production.',
            'Orchestrated seamless integration with Institutional Services Group’s Cloud services using Spring Boot, optimizing performance through JSON-based HTTP requests, and enhancing overall efficiency by 15% across the application.',
            'Leveraged Python’s Pandas DataFrame to analyze surface temperatures vs global domestic product, resulting in a 0.8 positive correlation within Tableu in support of Citi’s 1 trillion dollar commitment to sustainable finance.'
        ]
    },
    {
        id: 'lockheed',
        company: 'Lockheed',
        url: 'https://www.lockheedmartin.com/',
        title: 'SWE Intern',
        period: 'May 2022 - Aug 2022',
        location: 'Manassas, VA',
        skills: ['Python', 'Kubeflow', 'PyTorch', 'TensorFlow', 'Spring'],
        points: [
            'Trained a wildfire-based infrastructure identification AI model through Kubeflow, Pytorch, & Tensorflow, with 98% accuracy.',
            'Implemented a real-time data monitoring interface in Spring, driving a 20% increase in operator awareness & object tracking.',
            'Transformed codebase maintainability by converting logging levels from Apache Log4J to SLF4J, achieving 80% code coverage.',
            'Collaborated with quality analysis team to execute comprehensive testing, resulting in a 12% reduction in logging inefficiencies.'
        ]
    }
];

export default function Notes() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoleId, setSelectedRoleId] = useState(experienceData[0].id);

    const filteredExperience = useMemo(() => {
        if (!searchTerm) return experienceData;
        const term = searchTerm.toLowerCase();
        return experienceData.filter(role =>
            role.company.toLowerCase().includes(term) ||
            role.title.toLowerCase().includes(term) ||
            role.points.some(p => p.toLowerCase().includes(term))
        );
    }, [searchTerm]);

    const selectedRole = experienceData.find(r => r.id === selectedRoleId) || filteredExperience[0] || experienceData[0];

    return (
        <div className="flex h-full bg-[#FCFCFD] text-gray-800 font-sans select-none overflow-hidden">
            {/* Sidebar */}
            <div className="w-72 border-r border-[#E5E5E5] flex flex-col bg-[#F6F6F6]/90 backdrop-blur-xl">
                {/* Search Bar */}
                <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-[#8E8E93] text-[10px] font-black uppercase tracking-[0.15em] px-1">
                        <div className="flex items-center gap-1.5">
                            <FileText className="w-3 h-3" />
                            <span>All Notes</span>
                        </div>
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#8E8E93] hover:text-[#3478F6] cursor-pointer transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8E8E93] group-focus-within:text-[#3478F6] transition-colors" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search"
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

                <div className="flex-1 overflow-y-auto px-2 space-y-0.5 custom-scrollbar">
                    {filteredExperience.length > 0 ? (
                        filteredExperience.map((role) => (
                            <div
                                key={role.id}
                                onClick={() => setSelectedRoleId(role.id)}
                                className={`
                                    group flex flex-col p-3 rounded-lg cursor-pointer transition-all relative
                                    ${selectedRoleId === role.id
                                        ? 'bg-[#EBCB8B] shadow-sm'
                                        : 'hover:bg-gray-200/50'}
                                `}
                            >
                                <div className="flex items-center justify-between gap-2 overflow-hidden mb-0.5">
                                    <span className={`text-[13px] font-bold truncate ${selectedRoleId === role.id ? 'text-gray-900' : 'text-gray-800'}`}>
                                        {role.company}
                                    </span>
                                    <span className={`text-[10px] whitespace-nowrap ${selectedRoleId === role.id ? 'text-gray-700' : 'text-[#A1A1A1]'}`}>
                                        {role.id === 'meta' ? "Present" : role.period.split('-')[1].trim()}
                                    </span>
                                </div>
                                <div className={`text-[11px] truncate leading-tight ${selectedRoleId === role.id ? 'text-gray-800' : 'text-[#8E8E93]'} flex justify-between gap-2`}>
                                    <span className="truncate">{role.title}</span>
                                    <span className="opacity-50 text-[10px] flex-shrink-0">{role.location}</span>
                                </div>
                                <div className={`text-[11px] truncate mt-1 ${selectedRoleId === role.id ? 'text-gray-700' : 'text-[#B0B0B0]'}`}>
                                    {role.points[0]}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                            <Search className="w-8 h-8 text-[#E5E5E5] mb-2" />
                            <p className="text-[13px] font-medium text-[#8E8E93]">No Results for "{searchTerm}"</p>
                            <p className="text-[11px] text-[#A1A1A1] mt-1">Try a different company or skill.</p>
                        </div>
                    )}
                </div>

                {/* Sidebar Footer */}
                <div className="p-3 border-t border-[#E5E5E5] text-center bg-[#F6F6F6]/50">
                    <span className="text-[10px] font-medium text-[#8E8E93] uppercase tracking-wider">
                        {filteredExperience.length} {filteredExperience.length === 1 ? 'Note' : 'Notes'}
                    </span>
                </div>
            </div>

            {/* Content area */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden shadow-inner relative">
                {/* Content Header */}
                <div className="px-10 py-8 border-b border-[#F2F2F2] flex items-center justify-between bg-white/80 backdrop-blur sticky top-0 z-10">
                    <h1 className="text-2xl font-black text-gray-900 leading-tight flex items-center justify-between w-full gap-x-6">
                        <div className="flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">
                            {selectedRole.title} at{' '}
                            <a
                                href={selectedRole.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#3478F6] hover:underline"
                            >
                                {selectedRole.company}
                            </a>
                        </div>
                        <div className="px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest shadow-sm leading-none flex-shrink-0">
                            {selectedRole.location}
                        </div>
                    </h1>
                </div>

                {/* Main Text Area */}
                <div className="flex-1 overflow-y-auto px-10 py-6 custom-scrollbar">
                    <div className="max-w-3xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-[1px] flex-1 bg-gray-100" />
                                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#C1C1C1]">
                                    Professional Impact
                                </h2>
                                <div className="h-[1px] flex-1 bg-gray-100" />
                            </div>
                            <ul className="space-y-5">
                                {selectedRole.points.map((point, i) => (
                                    <li key={i} className="flex gap-5 group">
                                        <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#3478F6] flex-shrink-0 group-hover:scale-125 transition-transform shadow-sm shadow-blue-200" />
                                        <span className="text-[16px] leading-relaxed text-[#3C3C43] font-medium tracking-tight">
                                            {point}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tech Stack Footer */}
                        <div className="pt-10 border-t border-gray-100/60 pb-10">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="h-[1px] w-12 bg-gray-100" />
                                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C1C1C1]">
                                    Tech Stack
                                </h2>
                                <div className="h-[1px] flex-1 bg-gray-100" />
                            </div>
                            <div className="flex flex-nowrap overflow-x-auto gap-2 pb-2 custom-scrollbar-h">
                                {selectedRole.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 bg-gray-50/50 border border-gray-100 rounded-lg text-[11px] font-bold text-gray-500 hover:border-[#3478F6]/30 hover:bg-white hover:text-[#3478F6] transition-all cursor-default shadow-sm hover:shadow-md whitespace-nowrap"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E5E5E5;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #D1D1D6;
                }
                .custom-scrollbar-h::-webkit-scrollbar {
                    height: 4px;
                }
                .custom-scrollbar-h::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar-h::-webkit-scrollbar-thumb {
                    background: #F0F0F0;
                    border-radius: 10px;
                }
                .custom-scrollbar-h::-webkit-scrollbar-thumb:hover {
                    background: #E5E5E5;
                }
            `}</style>
        </div >
    );
}
