// pages/index.tsx
'use client'
import React, { useState, useEffect, useRef } from "react";
import { sendChatMessage } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const ChatPage = () => {
  const { user, token, logout } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auth redirect
  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token, router]);

  // Auto scroll chat container to the bottom on update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Create a new conversation ID if one doesn't exist
  useEffect(() => {
    if (!conversationId) {
      setConversationId(Date.now().toString());
    }
  }, [conversationId]);
  
  // Focus input field on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Now conditionally render UI based on user availability
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-white to-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="absolute top-0 w-full h-full rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute top-2 left-2 w-12 h-12 rounded-full border-4 border-t-transparent border-r-transparent border-b-blue-300 border-l-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
          </div>
          <p className="mt-4 text-gray-500 font-medium">Connecting...</p>
        </div>
      </div>
    );
  }

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() === "" || !conversationId) return;

    setLoading(true);

    // Add user's message to chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: "user", text: message },
    ]);

    try {
      const data = await sendChatMessage(message, conversationId);
      // Add the API (AI) response to the chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: "ai", text: data.response },
      ]);
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <header className="py-4 px-6 border-b border-gray-100 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-3">
              AI
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Mental Health Therapist</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-sm text-gray-600">Online</span>
          </div>
        </div>
      </header>
      
      {/* Chat Container */}
      <main className="flex-1 flex justify-center overflow-hidden">
        <div className="w-full max-w-4xl flex flex-col h-full">
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto py-6 px-4 md:px-8"
          >
            <div className="max-w-3xl mx-auto space-y-6">
              {chatHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-medium text-gray-800 mb-2">Welcome to AI Assistant</h2>
                  <p className="text-gray-500 max-w-md">Ask me anything! I'm here to help with your questions, tasks, or just to chat.</p>
                </div>
              ) : (
                chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    } group`}
                  >
                    {msg.sender === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-medium mr-3 shadow-sm">
                        AI
                      </div>
                    )}
                    <div
                      className={`max-w-xl py-3 px-4 rounded-2xl shadow-sm ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                          : "bg-white text-gray-800 border border-gray-100"
                      }`}
                    >
                      <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                    </div>
                    {msg.sender === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium ml-3">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                    )}
                  </div>
                ))
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-medium mr-3 shadow-sm">
                    AI
                  </div>
                  <div className="py-3 px-6 rounded-2xl bg-white text-gray-800 border border-gray-100 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Input Area */}
          <div className="border-t border-gray-100 bg-white px-4 py-4 md:py-6">
            <div className="max-w-3xl mx-auto">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center space-x-3"
              >
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full py-3 px-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent text-gray-800 placeholder-gray-400 shadow-sm transition-all"
                    placeholder="Type your message here..."
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading || !message.trim()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </form>
              <div className="mt-2 text-xs text-center text-gray-400">
                AI Assistant is here to help with your questions
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;