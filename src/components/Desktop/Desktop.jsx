import React from 'react';
import MenuBar from '../MenuBar/MenuBar';
import Dock from '../Dock/Dock';
import Window from '../Window/Window';
import { useWindowContext } from '../../context/WindowContext';

export default function Desktop() {
    const { windows } = useWindowContext();

    return (
        <div
            className="w-full h-screen bg-cover bg-center overflow-hidden relative"
            style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop)',
            }}
        >
            <div className="absolute inset-0 bg-black/10" />
            <MenuBar />

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
