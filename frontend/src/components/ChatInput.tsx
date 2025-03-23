import React, { useState } from 'react';
import { Send, Sparkles, Mic, Paperclip } from 'lucide-react';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  loading: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, loading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center bg-zinc-800/50 rounded-2xl p-1 backdrop-blur-sm border border-zinc-700/50">
        <button 
          type="button" 
          className="p-2 rounded-full text-zinc-400 hover:text-zinc-100 transition-colors"
          title="Attach file"
        >
          <Paperclip size={20} />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-3 bg-transparent border-none focus:outline-none text-white placeholder-zinc-500"
          placeholder="Message AI Assistant..."
        />
        
        <button 
          type="button" 
          className="p-2 rounded-full text-zinc-400 hover:text-zinc-100 transition-colors"
          title="Voice input"
        >
          <Mic size={20} />
        </button>
        
        <button
          type="submit"
          disabled={!message.trim() || loading}
          className={`p-3 rounded-xl ${
            message.trim() && !loading
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
              : 'bg-zinc-700 text-zinc-400'
          } transition-all duration-200`}
        >
          {loading ? (
            <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </div>
      
      <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
        <button
          type="button"
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors p-1"
        >
          <Sparkles size={12} />
          <span>Suggest prompts</span>
        </button>
      </div>
    </form>
  );
};

export default ChatInput;