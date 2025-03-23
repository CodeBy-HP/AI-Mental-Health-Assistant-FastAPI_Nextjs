import React from 'react';
import { LucideIcon, Sparkles, Code, Brain, Image, FileText } from 'lucide-react';

type SuggestionProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
};

const Suggestion: React.FC<SuggestionProps> = ({ icon: Icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-start gap-3 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
  >
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <h3 className="font-medium text-white">{title}</h3>
      <p className="text-sm text-zinc-400 mt-1">{description}</p>
    </div>
  </div>
);

type WelcomeScreenProps = {
  onStartConversation: (text: string) => void;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartConversation }) => {
  const suggestions = [
    {
      icon: Sparkles,
      title: "Creative Writing",
      description: "Help me write a story or creative content",
      prompt: "Can you help me write a short sci-fi story about time travel?"
    },
    {
      icon: Code,
      title: "Coding Assistant",
      description: "Help with programming tasks or debugging",
      prompt: "Can you explain how React hooks work and give me an example?"
    },
    {
      icon: Brain,
      title: "Knowledge & Learning",
      description: "Get explanations on complex topics",
      prompt: "Explain quantum computing in simple terms."
    },
    {
      icon: Image,
      title: "Design Ideas",
      description: "Suggest visual concepts and design approaches",
      prompt: "I need ideas for a minimalist logo for a coffee shop named 'Brewed'."
    },
    {
      icon: FileText,
      title: "Content Analysis",
      description: "Summarize or analyze text",
      prompt: "Can you help me summarize this article I'm working on?"
    }
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center py-8 px-4">
      <div className="text-center mb-8 max-w-xl">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
          <Sparkles size={28} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">How can I help you today?</h1>
        <p className="text-zinc-400 text-lg">
          I'm your AI assistant, ready to chat about anything from creative ideas to technical questions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {suggestions.map((suggestion, index) => (
          <Suggestion
            key={index}
            icon={suggestion.icon}
            title={suggestion.title}
            description={suggestion.description}
            onClick={() => onStartConversation(suggestion.prompt)}
          />
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;