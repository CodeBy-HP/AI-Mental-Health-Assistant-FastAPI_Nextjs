import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';

type MessageProps = {
  message: {
    sender: 'user' | 'ai';
    text: string;
  };
  isLatest: boolean;
};

const ChatMessage: React.FC<MessageProps> = ({ message, isLatest }) => {
  const isUser = message.sender === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
          <Bot size={18} className="text-white" />
        </div>
      )}
      
      <div
        className={`max-w-xs sm:max-w-md md:max-w-lg p-3 rounded-2xl ${
          isUser 
            ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white'
            : 'bg-gradient-to-br from-zinc-800 to-zinc-900 text-white border border-zinc-700'
        } ${isLatest && message.sender === 'ai' ? 'animate-pulse-subtle' : ''}`}
      >
        <p className="whitespace-pre-wrap break-words text-sm sm:text-base">{message.text}</p>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
          <User size={18} className="text-white" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;