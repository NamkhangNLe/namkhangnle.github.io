import React from 'react';
import MenuBar from '../MenuBar/MenuBar';
import Dock from '../Dock/Dock';
import Window from '../Window/Window';
import { useWindowContext } from '../../context/WindowContext';
import { FileText, Linkedin, Github } from 'lucide-react';

const DesktopIcon = ({ icon, label, onClick }) => (
    <div
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className="flex flex-col items-center gap-1.5 p-2 rounded-lg cursor-pointer group hover:bg-white/10 transition-all w-24 select-none"
    >
        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-2xl group-hover:bg-white/20 transition-all transform group-active:scale-95">
            {icon}
        </div>
        <span className="text-[10px] text-white font-black text-shadow-sm px-2 py-0.5 rounded-md bg-black/30 backdrop-blur-md tracking-tight">
            {label}
        </span>
    </div>
);

export default function Desktop() {
    const { windows } = useWindowContext();

    return (
        <div
            className="w-full h-screen bg-cover bg-center overflow-hidden relative"
            style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop)',
            }}
            onClick={() => { }}
        >
            <div className="absolute inset-0 bg-black/10" />
            <MenuBar />

            {/* Desktop Icons Container */}
            <div className="absolute top-12 right-4 flex flex-col gap-4 items-end z-10">
                <DesktopIcon
                    icon={<FileText className="w-8 h-8 text-blue-400 drop-shadow-md" strokeWidth={2.5} />}
                    label="Namkhang's Resume"
                    onClick={() => window.open('/Namkhang_Le_Resume.pdf', '_blank')}
                />
                <DesktopIcon
                    icon={<Linkedin className="w-8 h-8 text-blue-500 drop-shadow-md" strokeWidth={2.5} />}
                    label="LinkedIn"
                    onClick={() => window.open('https://linkedin.com/in/namkhangle', '_blank')}
                />
                <DesktopIcon
                    icon={<Github className="w-8 h-8 text-white drop-shadow-md" strokeWidth={2.5} />}
                    label="GitHub"
                    onClick={() => window.open('https://github.com/namkhangle', '_blank')}
                />
            </div>

            {/* Desktop Area for Windows */}
            <div className="pt-8 pb-20 w-full h-full relative">
                {windows.map((window) => (
                    <Window key={window.id} window={window} />
                ))}
            </div>

            <Dock />
        </div>
    );
}
