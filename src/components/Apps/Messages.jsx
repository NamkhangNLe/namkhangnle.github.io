import React, { useState, useEffect } from 'react';
import { Send, User } from 'lucide-react';

export default function Messages() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'Namkhang', text: "Hi! I'm Namkhang Le. 👋", time: 'Now' },
        { id: 2, sender: 'Namkhang', text: "I'm a 4th year CS student at Georgia Tech (May 2025) focusing on Intelligence and Info Internetworks.", time: 'Now' },
        { id: 3, sender: 'Namkhang', text: "I've interned at Citi and Lockheed Martin, building scalable web apps and modernizing UIs.", time: 'Now' },
        { id: 4, sender: 'Namkhang', text: "I love ML, Full Stack Dev, and Hackathons! 🚀", time: 'Now' },
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMsg = { id: Date.now(), sender: 'You', text: inputValue, time: 'Just now' };
        setMessages([...messages, newMsg]);
        setInputValue('');

        // Simulate reply or action
        setTimeout(() => {
            window.location.href = `mailto:NamkhangNLe@hotmail.com?subject=Hello from Portfolio&body=${inputValue}`;
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'Namkhang', text: "Thanks for the message! I've opened your email client to send it properly. 📧", time: 'Just now' }]);
        }, 1000);
    };

    return (
        <div className="flex h-full bg-white text-black">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col">
                <div className="p-4 border-b border-gray-200 font-bold text-lg">Messages</div>
                <div className="p-2">
                    <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">NL</div>
                        <div>
                            <div className="font-semibold">Namkhang Le</div>
                            <div className="text-xs text-gray-500">I'm a 4th year CS...</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] p-3 rounded-2xl ${msg.sender === 'You' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                <div className="text-sm">{msg.text}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-4 border-t border-gray-200 flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
