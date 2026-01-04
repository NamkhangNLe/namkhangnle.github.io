import React, { useState, useEffect } from 'react';
import { Apple, Battery, Wifi } from 'lucide-react';

export default function MenuBar() {
    const [time, setTime] = useState(new Date());
    const [activeMenu, setActiveMenu] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 60000);
        const handleClickOutside = () => setActiveMenu(null);
        window.addEventListener('click', handleClickOutside);
        return () => {
            clearInterval(timer);
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const MenuItem = ({ label, children, isApple }) => (
        <div className="relative">
            <div
                onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === label ? null : label); }}
                className={`px-3 py-1 rounded-md cursor-default flex items-center transition-colors ${activeMenu === label ? 'bg-white/20' : 'hover:bg-white/10'}`}
            >
                {isApple ? <Apple className="w-4 h-4 fill-white" /> : <span className={label === 'Finder' ? 'font-bold' : ''}>{label}</span>}
            </div>
            {activeMenu === label && (
                <div className="absolute top-8 left-0 w-56 bg-[#1A1A1A]/80 backdrop-blur-2xl border border-white/10 rounded-lg shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95 duration-100 flex flex-col">
                    {children}
                </div>
            )}
        </div>
    );

    const DropdownItem = ({ label, shortcut, onClick, danger }) => (
        <div
            onClick={onClick}
            className={`px-3 py-1.5 rounded-md flex items-center justify-between text-[13px] hover:bg-[#3478F6] hover:text-white group cursor-default ${danger ? 'text-red-400' : 'text-white/90'}`}
        >
            <span>{label}</span>
            {shortcut && <span className="text-[11px] opacity-40 group-hover:opacity-100">{shortcut}</span>}
        </div>
    );

    return (
        <div className="w-full h-8 bg-black/20 backdrop-blur-md flex items-center justify-between px-2 text-white text-sm fixed top-0 left-0 z-50 select-none border-b border-white/5">
            <div className="flex items-center gap-1">
                <MenuItem label="apple" isApple>
                    <DropdownItem label="About This Mac" />
                    <div className="h-[1px] bg-white/10 my-1 mx-2" />
                    <DropdownItem label="System Settings..." />
                    <DropdownItem label="App Store..." shortcut="13 updates" />
                    <div className="h-[1px] bg-white/10 my-1 mx-2" />
                    <DropdownItem label="Recent Items" />
                    <div className="h-[1px] bg-white/10 my-1 mx-2" />
                    <DropdownItem label="Force Quit..." shortcut="⌥⌘⎋" />
                    <div className="h-[1px] bg-white/10 my-1 mx-2" />
                    <DropdownItem label="Sleep" />
                    <DropdownItem label="Restart..." />
                    <DropdownItem label="Shut Down..." />
                    <div className="h-[1px] bg-white/10 my-1 mx-2" />
                    <DropdownItem label="Lock Screen" shortcut="⌃⌘Q" />
                    <DropdownItem label="Log Out Namkhang..." shortcut="⇧⌘Q" />
                </MenuItem>
                <MenuItem label="Finder">
                    <DropdownItem label="About Finder" />
                    <div className="h-[1px] bg-white/10 my-1 mx-2" />
                    <DropdownItem label="Settings..." shortcut="⌘," />
                    <div className="h-[1px] bg-white/10 my-1 mx-2" />
                    <DropdownItem label="Empty Bin..." />
                </MenuItem>
                <MenuItem label="File">
                    <DropdownItem label="New Finder Window" shortcut="⌘N" />
                    <DropdownItem label="New Folder" shortcut="⇧⌘N" />
                    <DropdownItem label="Open" shortcut="⌘O" />
                    <DropdownItem label="Print" shortcut="⌘P" />
                </MenuItem>
                <MenuItem label="Edit" />
                <MenuItem label="View" />
                <MenuItem label="Go" />
                <MenuItem label="Window" />
                <MenuItem label="Help" />
            </div>
            <div className="flex items-center gap-4 px-3">
                <Wifi className="w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity" />
                <Battery className="w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity" />
                <span className="cursor-default hover:bg-white/10 px-2 py-0.5 rounded transition-colors">{formatDate(time)}</span>
                <span className="cursor-default hover:bg-white/10 px-2 py-0.5 rounded transition-colors">{formatTime(time)}</span>
            </div>
        </div>
    );
}
