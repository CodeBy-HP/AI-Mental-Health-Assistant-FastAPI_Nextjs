import React from 'react';
import { AlignJustify, Settings, PlusCircle, User2 } from 'lucide-react';

type ChatHeaderProps = {
  onToggleSidebar: () => void;
  onNewChat: () => void;
  userName: string;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ onToggleSidebar, onNewChat, userName }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-zinc-800 transition-colors lg:hidden"
        >
          <AlignJustify size={20} className="text-zinc-400" />
        </button>
        
        <div className="hidden sm:flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold">AI</span>
          </div>
          <h1 className="text-lg font-semibold text-white">AI Assistant</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onNewChat}
          className="flex items-center gap-1 py-1.5 px-3 text-sm rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
        >
          <PlusCircle size={16} />
          <span className="hidden sm:inline">New Chat</span>
        </button>
        
        <button className="p-2 rounded-lg hover:bg-zinc-800 transition-colors">
          <Settings size={20} className="text-zinc-400" />
        </button>
        
        <div className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer">
          <div className="h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center">
            <User2 size={16} className="text-white" />
          </div>
          <span className="text-sm text-zinc-300 hidden md:inline">{userName}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;