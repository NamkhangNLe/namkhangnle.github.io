import React, { useState, useEffect } from 'react';
import { Apple, Battery, Wifi } from 'lucide-react';

export default function MenuBar() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <div className="w-full h-8 bg-black/20 backdrop-blur-md flex items-center justify-between px-4 text-white text-sm fixed top-0 left-0 z-50 select-none">
            <div className="flex items-center gap-4">
                <Apple className="w-4 h-4 fill-white" />
                <span className="font-bold">Finder</span>
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
                <span>Go</span>
                <span>Window</span>
                <span>Help</span>
            </div>
            <div className="flex items-center gap-4">
                <Wifi className="w-4 h-4" />
                <Battery className="w-4 h-4" />
                <span>{formatDate(time)}</span>
                <span>{formatTime(time)}</span>
            </div>
        </div>
    );
}
