import React from 'react';
import { Folder, FileText, Download, ExternalLink } from 'lucide-react';
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
        }
    };

    const projects = [
        { id: 'diagnoseme', title: 'DiagnoseMe', type: 'folder', icon: <Folder className="w-16 h-16 text-blue-500 fill-blue-500" /> },
        { id: 'scribbletex', title: 'ScribbleTex', type: 'folder', icon: <Folder className="w-16 h-16 text-blue-500 fill-blue-500" /> },
        { id: 'morsetorch', title: 'MorseTorch', type: 'folder', icon: <Folder className="w-16 h-16 text-blue-500 fill-blue-500" /> },
        { id: 'resume', title: 'Resume.pdf', type: 'file', icon: <FileText className="w-16 h-16 text-gray-400" /> },
    ];

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
            window.open('/Website/Namkhang_Le_Resume.pdf', '_blank');
        }
    };

    return (
        <div className="flex h-full bg-white text-black">
            {/* Sidebar */}
            <div className="w-48 bg-gray-100/90 backdrop-blur border-r border-gray-200 p-2 space-y-1 text-sm font-medium">
                <div className="px-2 py-1 text-gray-500 text-xs font-bold">Favorites</div>
                <div className="flex items-center gap-2 px-2 py-1 bg-blue-500/10 text-blue-600 rounded cursor-pointer">
                    <Download className="w-4 h-4" /> Desktop
                </div>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded cursor-pointer">
                    <Download className="w-4 h-4" /> Downloads
                </div>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded cursor-pointer">
                    <Folder className="w-4 h-4" /> Applications
                </div>
                <div className="px-2 py-1 text-gray-500 text-xs font-bold mt-4">iCloud</div>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded cursor-pointer">
                    <Folder className="w-4 h-4" /> Documents
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white p-4">
                <div className="grid grid-cols-4 gap-4">
                    {projects.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleOpen(item)}
                            className="flex flex-col items-center gap-2 p-2 hover:bg-blue-50 rounded-lg cursor-pointer group"
                        >
                            {item.icon}
                            <span className="text-sm text-center group-hover:text-blue-600">{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
