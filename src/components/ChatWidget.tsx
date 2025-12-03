import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { Message } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "PREVIOUSLY ON 'THE ARCHITECT'... \nAsk me anything to reveal the lore of The Protagonist!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const aiMsg: Message = { role: 'model', text: responseText };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "NARRATIVE DISRUPTION! THE SIGNAL IS LOST!", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-auto font-mono">
      <div 
        className={`bg-surface border-2 border-white shadow-comic-lg w-80 sm:w-96 overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100 mb-6 translate-y-0' : 'opacity-0 scale-75 translate-y-12 pointer-events-none h-0 mb-0'
        }`}
      >
        <div className="bg-secondary p-3 border-b-2 border-white flex justify-between items-center">
          <h3 className="text-white font-bold uppercase tracking-wide flex items-center gap-2 text-sm">
            <span className="w-3 h-3 bg-accent border border-black rounded-none animate-spin"></span>
            SYSTEM_NARRATOR
          </h3>
          <button onClick={toggleChat} className="text-white hover:text-black font-bold clickable px-2 active:scale-95 transition-transform">
            ✕
          </button>
        </div>
        
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-surface scrollbar-thin scrollbar-thumb-primary">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-3 border-2 border-white/20 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-black shadow-comic-sm' 
                    : 'bg-dark text-white shadow-none'
                } ${msg.isError ? 'bg-red-900/50 border-red-500' : ''}`}
              >
                <div className="whitespace-pre-wrap font-mono">{msg.text}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-dark p-3 border-2 border-white/20 flex gap-2 items-center">
                <span className="w-2 h-2 bg-primary animate-bounce"></span>
                <span className="w-2 h-2 bg-secondary animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-accent animate-bounce delay-200"></span>
                <span className="text-[10px] text-white ml-2">WRITING SCRIPT...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-3 bg-dark border-t-2 border-white">
          <div className="relative flex gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter plot twist..."
              className="w-full bg-black text-white pl-3 pr-3 py-2 text-sm focus:outline-none border-2 border-white/30 focus:border-accent clickable placeholder-gray-500 font-bold"
            />
            <button 
              type="submit" 
              disabled={isLoading || !inputValue.trim()}
              className="bg-accent text-black border-2 border-white p-2 hover:bg-white transition-all disabled:opacity-50 clickable active:scale-95 active:border-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <button 
        onClick={toggleChat}
        className={`p-4 border-2 border-white shadow-comic transition-all duration-200 hover:scale-110 hover:shadow-comic-lg clickable z-50 active:scale-90 active:border-accent ${
          isOpen ? 'bg-dark text-white' : 'bg-primary text-black'
        }`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
};