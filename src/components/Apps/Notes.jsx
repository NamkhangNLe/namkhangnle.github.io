import React, { useState } from 'react';
import { Search, ChevronRight, FileText, Calendar, ExternalLink } from 'lucide-react';

const experienceData = [
    {
        id: 'meta',
        company: 'Meta',
        url: 'https://about.meta.com/',
        title: 'Software Engineer',
        period: 'Aug 2025 - Present',
        location: 'Menlo Park, CA',
        points: [
            'Developing and optimizing Large Language Models (LLMs) and Generative AI infrastructure.',
            'Architecting scalable backend services to support high-throughput AI inference and deployment.',
            'Collaborating with cross-functional teams to integrate state-of-the-art AI capabilities into core Meta products.'
        ]
    },
    {
        id: 'aws',
        company: 'Amazon Web Services',
        url: 'https://aws.amazon.com/',
        title: 'Software Development Engineer Intern',
        period: 'May 2024 - Aug 2024',
        location: 'Arlington, VA',
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
        title: 'Software Engineer Intern',
        period: 'June 2023 - Aug 2023',
        location: 'Tampa, FL',
        points: [
            'Spearheaded Event Master Central, a full stack application for real-time corporate action event monitoring of financial assets in Angular & Oracle Database increasing engineering awareness of deployment failures by 18%.',
            'Revamped authentication logic, fortifying API token validation for REST API calls, contributing an 85% uptime to production.',
            'Orchestrated seamless integration with Institutional Services Group’s Cloud services using Spring Boot, optimizing performance through JSON-based HTTP requests, and enhancing overall efficiency by 15% across the application.',
            'Leveraged Python’s Pandas DataFrame to analyze surface temperatures vs global domestic product, resulting in a 0.8 positive correlation within Tableu in support of Citi’s 1 trillion dollar commitment to sustainable finance.'
        ]
    },
    {
        id: 'lockheed',
        company: 'Lockheed Martin',
        url: 'https://www.lockheedmartin.com/',
        title: 'Software Engineer Intern',
        period: 'May 2022 - Aug 2022',
        location: 'Manassas, VA',
        points: [
            'Trained a wildfire-based infrastructure identification AI model through Kubeflow, Pytorch, & Tensorflow, with 98% accuracy.',
            'Implemented a real-time data monitoring interface in Spring, driving a 20% increase in operator awareness & object tracking.',
            'Transformed codebase maintainability by converting logging levels from Apache Log4J to SLF4J, achieving 80% code coverage.',
            'Collaborated with quality analysis team to execute comprehensive testing, resulting in a 12% reduction in logging inefficiencies.'
        ]
    }
];

export default function Notes() {
    const [selectedRole, setSelectedRole] = useState(experienceData[0]);

    return (
        <div className="flex h-full bg-[#FCFCFD] text-gray-800 font-sans select-none">
            {/* Sidebar */}
            <div className="w-64 border-r border-[#E5E5E5] flex flex-col bg-[#F6F6F6]/50 backdrop-blur-xl">
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between text-[#8E8E93] text-xs font-semibold uppercase tracking-wider px-2">
                        <span>Notes</span>
                        <Search className="w-3.5 h-3.5 cursor-pointer hover:text-gray-600 transition-colors" />
                    </div>
                    <div className="space-y-0.5">
                        {experienceData.map((role) => (
                            <div
                                key={role.id}
                                onClick={() => setSelectedRole(role)}
                                className={`
                                    group flex flex-col p-2.5 rounded-lg cursor-pointer transition-all
                                    ${selectedRole.id === role.id
                                        ? 'bg-[#EBCB8B]/40 shadow-sm border border-[#EBCB8B]/20'
                                        : 'hover:bg-gray-200/50'}
                                `}
                            >
                                <div className="flex items-center justify-between gap-2 overflow-hidden">
                                    <span className={`text-[13px] font-bold truncate ${selectedRole.id === role.id ? 'text-gray-900' : 'text-gray-700'}`}>
                                        {role.company}
                                    </span>
                                    <span className="text-[10px] text-[#A1A1A1] whitespace-nowrap">
                                        {role.period.split('-')[0].trim()}
                                    </span>
                                </div>
                                <div className="text-[11px] text-[#8E8E93] truncate group-hover:text-[#636366] transition-colors leading-tight">
                                    {role.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content area */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden shadow-inner">
                {/* Content Header */}
                <div className="px-8 py-6 border-b border-[#F2F2F2] flex items-center justify-between bg-white/80 backdrop-blur sticky top-0 z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5 text-[#EBCB8B]">
                            <Calendar className="w-4 h-4" />
                            <span className="text-[12px] font-medium tracking-wide uppercase">{selectedRole.period}</span>
                        </div>
                        <h1 className="text-2xl font-black text-gray-900 leading-tight">
                            {selectedRole.title} at {' '}
                            <a
                                href={selectedRole.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#3478F6] hover:underline inline-flex items-center gap-1.5"
                            >
                                {selectedRole.company}
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-gray-100 rounded-md text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                            {selectedRole.location}
                        </div>
                    </div>
                </div>

                {/* Main Text Area */}
                <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar">
                    <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                        <div className="space-y-6">
                            <h2 className="text-[13px] font-black uppercase tracking-[0.1em] text-[#8E8E93] border-b border-gray-100 pb-2">
                                Role Description
                            </h2>
                            <ul className="space-y-4">
                                {selectedRole.points.map((point, i) => (
                                    <li key={i} className="flex gap-4 group">
                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#3478F6] flex-shrink-0 group-hover:scale-125 transition-transform" />
                                        <span className="text-[15px] leading-relaxed text-[#3C3C43] font-medium">
                                            {point}
                                        </span>
                                    </li>
                                ))}
                            </ul>
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
            `}</style>
        </div>
    );
}
