import React, { useState } from 'react';
import { Folder, FileText, Download, ExternalLink, Activity, Type, Flashlight, Bot, Stethoscope, HeartPulse, PencilLine } from 'lucide-react';
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
            title: "DiagnoseMe",
            description: "Constructed a ChatGPT powered ElectronJS application for disease diagnosis supporting medical students and doctors in training. Streamlined user experience by creating 120 unique prompt-engineered scenarios through Pandas DataFrame consolidation. Achieved a 15% reduction in development time through REST APIs for seamless data exchange via JSON between React & Flask.",
            link: "https://devfolio.co/projects/diagnoseme-1992",
            linkText: "View on Devfolio",
            date: "Feb 2024"
        },
        scribbletex: {
            title: "ScribbleTex",
            description: "Developed a decision tree classifier and a convolutional neural network (CNN) using Keras achieving 97% translation accuracy. Preprocessed 3 datasets comprising over 200,000 samples. Implemented a React-based frontend built using HTML, CSS, and JavaScript connected to a Python Flask backend with REST API endpoints for optimized communication with the CNN model hosted on GCP Vertex AI.",
            link: "https://namkhangle.github.io/ScribbleTex/",
            linkText: "AI ATL Github Winners!",
            date: "Nov 2023"
        },
        morsetorch: {
            title: "MorseTorch",
            description: "Employed Swift-based iOS application for Morse code translation, integrating Torch and Carthage binary framework. Executed K-means clustering algorithm using CoreML enabling real-time translation of optical signals with a 75% accuracy rate. Using advanced computer vision technology, our app allows users to seamlessly communicate in Morse code.",
            link: "https://cpjoseph18.wixsite.com/morsetorch",
            linkText: "HackGT Hackathon",
            date: "Oct 2023"
        },
        hemodynamics: {
            title: "Hemodynamics Calculator",
            description: "Developed a full-stack application for the Emory University School of Medicine to be used by 10 clinicians to reduce measurement error daily, impacting over 1,000 patients within the ICU. Leveraged ReactJS, Express, and MongoDB to develop interactive visualizations of trends in patient data, reducing data-related errors by 34%.",
            link: "https://github.com/namkhangle/Emory-Hemodynamics",
            linkText: "GT CS Capstone",
            date: "2023-2024"
        }
    };

    const folders = {
        startups: [
            { id: 'bobalabs', title: 'Boba Labs', type: 'folder', icon: <Bot className="w-16 h-16 text-purple-500" strokeWidth={2.5} /> },
        ],
        hackathons: [
            { id: 'diagnoseme', title: 'DiagnoseMe', type: 'folder', icon: <HeartPulse className="w-16 h-16 text-red-500" strokeWidth={2.5} /> },
            { id: 'scribbletex', title: 'ScribbleTex', type: 'folder', icon: <PencilLine className="w-16 h-16 text-blue-500" strokeWidth={2.5} /> },
            { id: 'morsetorch', title: 'MorseTorch', type: 'folder', icon: <Flashlight className="w-16 h-16 text-orange-500" strokeWidth={2.5} /> },
        ],
        projects: [
            { id: 'hemodynamics', title: 'Emory Hemodynamics Calculator', type: 'folder', icon: <Stethoscope className="w-16 h-16 text-emerald-500" strokeWidth={2.5} /> },
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
                <div onClick={() => setActiveFolder('startups')} className={getSidebarItemClass('startups')}>
                    <Folder className="w-4 h-4 group-hover:text-blue-600" /> Startups
                </div>
                <div onClick={() => setActiveFolder('hackathons')} className={getSidebarItemClass('hackathons')}>
                    <Folder className="w-4 h-4 group-hover:text-blue-600" /> Hackathons
                </div>
                <div onClick={() => setActiveFolder('projects')} className={getSidebarItemClass('projects')}>
                    <Folder className="w-4 h-4 group-hover:text-blue-600" /> Projects
                </div>

                <div className="px-2 py-1 text-gray-500 text-xs font-bold mt-4 uppercase tracking-wider">iCloud</div>
                <div onClick={() => window.open('/Namkhang_Le_Resume.pdf', '_blank')} className={getSidebarItemClass('resume')}>
                    <FileText className="w-4 h-4 group-hover:text-blue-600" /> Resume
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
