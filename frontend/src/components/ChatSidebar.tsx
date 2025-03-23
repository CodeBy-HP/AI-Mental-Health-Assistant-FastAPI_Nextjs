import React from 'react';
import { 
  MessageSquare, LogOut, Archive, Star, Search, 
  MoonStar, ChevronRight, Trash2, Clock
} from 'lucide-react';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const ChatSidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onLogout }) => {
  return (
    <div 
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-zinc-900 border-r border-zinc-800 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:z-0`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white">Chats</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-zinc-800 lg:hidden"
          >
            <ChevronRight size={20} className="text-zinc-400" />
          </button>
        </div>
        
        <div className="p-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full p-2 pl-9 bg-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700"
            />
            <Search size={16} className="absolute left-3 top-3 text-zinc-500" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-1">
            <h3 className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase">Recent Chats</h3>
            <div className="space-y-1">
              {[
                { icon: MessageSquare, text: "Coding assistant" },
                { icon: MessageSquare, text: "Travel planner" },
                { icon: MessageSquare, text: "Recipe recommendations" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 cursor-pointer group"
                >
                  <item.icon size={18} className="text-zinc-400" />
                  <span className="text-sm text-zinc-300">{item.text}</span>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <Star size={14} className="text-zinc-500 hover:text-yellow-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-1 mt-2">
            <h3 className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase">Saved</h3>
            <div className="space-y-1">
              {[
                { icon: Star, text: "Writing assistant" },
                { icon: Star, text: "Data analysis" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 cursor-pointer"
                >
                  <item.icon size={18} className="text-yellow-500" />
                  <span className="text-sm text-zinc-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-3 border-t border-zinc-800 space-y-2">
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-zinc-800 text-sm text-zinc-300">
            <Clock size={18} className="text-zinc-400" />
            <span>Chat history</span>
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-zinc-800 text-sm text-zinc-300">
            <Trash2 size={18} className="text-zinc-400" />
            <span>Clear conversations</span>
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-zinc-800 text-sm text-zinc-300">
            <MoonStar size={18} className="text-zinc-400" />
            <span>Dark mode</span>
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-zinc-800 text-sm text-zinc-300">
            <Archive size={18} className="text-zinc-400" />
            <span>Archived chats</span>
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-red-900/30 text-sm text-red-400"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;