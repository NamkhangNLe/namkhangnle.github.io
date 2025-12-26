import React, { useState } from 'react';
import { Folder, FileText, Download, ExternalLink, Activity, Type, Flashlight, Bot } from 'lucide-react';
import { useWindowContext } from '../../context/WindowContext';

const ProjectContent = ({ title, description, link, linkText }) => (
    <div className="p-6 text-white space-y-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-300 leading-relaxed">{description}</p>
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors"
        >
            <ExternalLink className="w-4 h-4" />
            {linkText}
        </a>
    </div>
);

export default function Finder() {
    const { openWindow } = useWindowContext();
    const [activeFolder, setActiveFolder] = useState('hackathons');

    const projectData = {
        diagnoseme: {
            title: 'DiagnoseMe',
            description: 'An interactive GPT4 Electron.js application designed to simulate patient interactions. It leverages the power of AI to generate responses based on a variety of medical conditions, providing a user-friendly React interface for medical students to practice their diagnostic skills.',
            link: 'https://devfolio.co/projects/diagnoseme-1992',
            linkText: 'View on Devfolio'
        },
        scribbletex: {
            title: 'ScribbleTex',
            description: 'A web application that leverages custom machine learning to convert handwritten text to LaTeX code. This application utilizes a React frontend with a Flask backend, integrating a machine learning model hosted on Google Cloud\'s Vertex AI for handwriting recognition.',
            link: 'https://namkhangnle.github.io/ScribbleTex/',
            linkText: 'AI ATL Github Winners!'
        },
        morsetorch: {
            title: 'MorseTorch',
            description: 'A Swift-based iOS application designed to provide essential Morse code communication tools. Using advanced computer vision technology and state-of-the-art language processing, our app allows users to seamlessly communicate in Morse code. Whether you need to transmit messages in challenging situations or simply want to explore the world of Morse code, MorseTorch has you covered.',
            link: 'https://cpjoseph18.wixsite.com/morsetorch',
            linkText: 'My First Hackathon!'
        },
        bobalabs: {
            title: 'Boba Labs',
            description: 'Building careers for the 22nd century.',
            link: 'http://bobalabs.tech/',
            linkText: 'Visit Boba Labs'
        }
    };

    const folders = {
        hackathons: [
            { id: 'diagnoseme', title: 'DiagnoseMe', type: 'folder', icon: <Activity className="w-16 h-16 text-red-500" /> },
            { id: 'scribbletex', title: 'ScribbleTex', type: 'folder', icon: <Type className="w-16 h-16 text-blue-500" /> },
            { id: 'morsetorch', title: 'MorseTorch', type: 'folder', icon: <Flashlight className="w-16 h-16 text-orange-500" /> },
        ],
        startups: [
            { id: 'bobalabs', title: 'Boba Labs', type: 'folder', icon: <Bot className="w-16 h-16 text-purple-500" /> },
        ],
        resume: [
            { id: 'resume', title: 'Resume.pdf', type: 'file', icon: <FileText className="w-16 h-16 text-gray-400" /> },
        ]
    };

    const handleOpen = (item) => {
        if (item.type === 'folder') {
            const data = projectData[item.id];
            openWindow(
                `project-${item.id}`,
                item.title,
                <ProjectContent
                    title={data.title}
                    description={data.description}
                    link={data.link}
                    linkText={data.linkText}
                />
            );
        } else {
            window.open('/Namkhang_Le_Resume.pdf', '_blank');
        }
    };

    const getSidebarItemClass = (id) => `
        flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-colors group
        ${activeFolder === id ? 'bg-blue-500/10 text-blue-600' : 'hover:bg-gray-200'}
    `;

    return (
        <div className="flex h-full bg-white text-black">
            {/* Sidebar */}
            <div className="w-48 bg-gray-100/90 backdrop-blur border-r border-gray-200 p-2 space-y-1 text-sm font-medium">
                <div className="px-2 py-1 text-gray-500 text-xs font-bold uppercase tracking-wider">Favorites</div>
                <div onClick={() => setActiveFolder('hackathons')} className={getSidebarItemClass('hackathons')}>
                    <Folder className="w-4 h-4 group-hover:text-blue-600" /> Hackathons
                </div>
                <div onClick={() => setActiveFolder('startups')} className={getSidebarItemClass('startups')}>
                    <Folder className="w-4 h-4 group-hover:text-blue-600" /> Startups
                </div>

                <div className="px-2 py-1 text-gray-500 text-xs font-bold mt-4 uppercase tracking-wider">iCloud</div>
                <div onClick={() => setActiveFolder('resume')} className={getSidebarItemClass('resume')}>
                    <Download className="w-4 h-4 group-hover:text-blue-600" /> Resume
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white p-4 overflow-y-auto">
                <div className="grid grid-cols-4 gap-4">
                    {folders[activeFolder].map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleOpen(item)}
                            className="flex flex-col items-center gap-2 p-2 hover:bg-blue-50 rounded-lg cursor-pointer group"
                        >
                            <div className="transform transition-transform group-hover:scale-110">
                                {item.icon}
                            </div>
                            <span className="text-sm text-center group-hover:text-blue-600 font-medium">{item.title}</span>
                        </div>
                    ))}
                    {folders[activeFolder].length === 0 && (
                        <div className="col-span-4 flex items-center justify-center h-64 text-gray-400 italic">
                            Empty folder
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
