import React from 'react';
import { Folder, FileText, Download } from 'lucide-react';
import { useWindowContext } from '../../context/WindowContext';

export default function Finder() {
    const { openWindow } = useWindowContext();

    const projects = [
        { id: 'diagnoseme', title: 'DiagnoseMe', type: 'folder', icon: <Folder className="w-16 h-16 text-blue-500 fill-blue-500" /> },
        { id: 'scribbletex', title: 'ScribbleTex', type: 'folder', icon: <Folder className="w-16 h-16 text-blue-500 fill-blue-500" /> },
        { id: 'morsetorch', title: 'MorseTorch', type: 'folder', icon: <Folder className="w-16 h-16 text-blue-500 fill-blue-500" /> },
        { id: 'resume', title: 'Resume.pdf', type: 'file', icon: <FileText className="w-16 h-16 text-gray-400" /> },
    ];

    const handleOpen = (item) => {
        if (item.type === 'folder') {
            // Open folder content (mock)
            openWindow(`project-${item.id}`, item.title, <div className="p-4 text-white">Project Details for {item.title}... <br /><a href="#" className="text-blue-400 underline">View content</a></div>);
        } else {
            // Open file
            window.open('https://linkedin.com/in/namkhangnle', '_blank'); // Mock resume link
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
                            onDoubleClick={() => handleOpen(item)}
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
