import React, { useState, useEffect } from 'react';
import { Send, User, ExternalLink } from 'lucide-react';

const CompanyLink = ({ href, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-600 font-semibold inline-flex items-center gap-0.5 hover:underline"
    >
        {children}
    </a>
);

export default function Messages() {
    const fullMessages = [
        {
            id: 1,
            sender: 'Namkhang',
            content: <span>Hi! I'm Namkhang Le.</span>,
            time: 'Now'
        },
        {
            id: 2,
            sender: 'Namkhang',
            content: (
                <span>
                    I am currently a Software Engineer at <CompanyLink href="https://about.meta.com/">Meta</CompanyLink>,
                    where I work on LLMs and Generative AI.
                </span>
            ),
            time: 'Now'
        },
        {
            id: 3,
            sender: 'Namkhang',
            content: (
                <span>
                    Previously, I was at <CompanyLink href="https://aws.amazon.com/">Amazon Web Services</CompanyLink>,{' '}
                    <CompanyLink href="https://www.lockheedmartin.com/">Lockheed Martin</CompanyLink>,{' '}
                    and <CompanyLink href="https://www.citigroup.com/">Citi</CompanyLink>.
                    I am a <CompanyLink href="https://www.gatech.edu/">Georgia Tech</CompanyLink> Grad with focuses in Artificial Intelligence and Computer Networking.
                </span>
            ),
            time: 'Now'
        },
        {
            id: 4,
            sender: 'Namkhang',
            content: (
                <div className="space-y-2">
                    <p>Here are some technologies I have been working with:</p>
                    <ul className="grid grid-cols-2 gap-1 text-[11px] font-mono text-gray-600">
                        <li className="flex items-center gap-1">▹ Python</li>
                        <li className="flex items-center gap-1">▹ TypeScript</li>
                        <li className="flex items-center gap-1">▹ React.js</li>
                        <li className="flex items-center gap-1">▹ LLMs / GenAI</li>
                        <li className="flex items-center gap-1">▹ Node.js</li>
                        <li className="flex items-center gap-1">▹ C++</li>
                    </ul>
                </div>
            ),
            time: 'Now'
        },
        {
            id: 5,
            sender: 'Namkhang',
            content: (
                <span>
                    Outside of work, I love building things at Hackathons (check them out in Finder!),
                    am nerdy about tech gadgets, love literary fiction, and play way too many battle royale games. 🎮
                </span>
            ),
            time: 'Now'
        },
    ];

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const timers = [];
        // Clear potential existing messages to avoid duplicates in strict mode
        setMessages([]);

        fullMessages.forEach((msg, index) => {
            const timer = setTimeout(() => {
                setMessages(prev => {
                    if (prev.find(m => m.id === msg.id)) return prev;
                    return [...prev, msg];
                });
            }, (index + 1) * 800);
            timers.push(timer);
        });

        return () => timers.forEach(clearTimeout);
    }, []);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMsg = { id: Date.now(), sender: 'You', content: inputValue, time: 'Just now' };
        setMessages([...messages, newMsg]);
        setInputValue('');

        setTimeout(() => {
            window.location.href = `mailto:NamkhangNLe@hotmail.com?subject=Hello from Portfolio&body=${inputValue}`;
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'Namkhang',
                content: "Thanks for the message! I've opened your email client to send it properly. 📧",
                time: 'Just now'
            }]);
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
                            <div className="font-semibold text-sm">Namkhang Le</div>
                            <div className="text-[10px] text-gray-500">
                                <a href="https://www.gatech.edu/" target="_blank" rel="noopener noreferrer" className="hover:underline">Georgia Tech Grad</a>, Meta SWE
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
                <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                            <div className={`max-w-[85%] p-3 rounded-2xl ${msg.sender === 'You' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                <div className="text-[13px] leading-relaxed">{msg.content}</div>
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
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-sm">
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}
