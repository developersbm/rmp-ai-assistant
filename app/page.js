'use client'
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! This is an AI that interacts as Rate My Professor! Please let me know about what professor you need more information!" },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);
    const userMessage = message;
    setMessage('');
    setMessages((messages) => [
        ...messages,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: '' },
    ]);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMessages((messages) => {
            let lastMessage = messages[messages.length - 1];
            let otherMessages = messages.slice(0, messages.length - 1);
            return [
                ...otherMessages,
                { ...lastMessage, content: data.message },
            ];
        });
    } catch (error) {
        console.error('Error:', error);
        setMessages((messages) => [
            ...messages,
            { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
        ]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="flex flex-col w-[500px] h-[700px] border border-gray-700 shadow-xl bg-opacity-70 bg-gray-800 p-4 space-y-4 rounded-lg backdrop-blur-md">
        <div className="flex flex-col space-y-4 flex-grow overflow-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`${
                  msg.role === 'assistant' ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-gradient-to-r from-green-400 to-teal-500'
                } text-white rounded-lg p-4 max-w-[80%] shadow-lg`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-2 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg transform transition-transform duration-300 hover:scale-105 shadow-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
