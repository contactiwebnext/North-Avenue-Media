import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Bot, User, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";
import { Logo } from "./Logo";

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      role: "assistant",
      content: "Welcome to North Avenue Media Intelligence. I am your AI editorial concierge. How may I assist you with beauty macro-trends, global summits, market intelligence reports, or partnership opportunities?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const assistantReply =
        data.reply ||
        data.fallbackReply ||
        "Thank you for contacting North Avenue Media. Please reach out to hello@northavenuemedia.com for specialized inquiries.";

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: assistantReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content:
          "North Avenue Media covers the business, culture, and innovation shaping global beauty and fashion. For direct partnership inquires, contact hello@northavenuemedia.com or +1 202-876-8594.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "msg-init-reset",
        role: "assistant",
        content: "Dossier history reset. How may I assist you with North Avenue Media intelligence?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2.5 px-4 py-3 bg-black text-white shadow-2xl hover:bg-neutral-800 transition-all border border-neutral-800 group"
          aria-label="Open North Avenue Media AI Intelligence Concierge"
        >
          <div className="relative">
            <Logo variant="monogram" theme="light" size="sm" />
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            )}
          </div>
          <span className="text-xs font-bold uppercase tracking-wider font-sans">
            Ask Intelligence AI
          </span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[400px] h-[520px] bg-white border border-neutral-300 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-black text-white flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-neutral-900 border border-neutral-700 flex items-center justify-center">
                <Logo variant="monogram" theme="light" size="sm" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm font-bold tracking-wide uppercase">
                  North Avenue AI
                </h4>
                <p className="text-[10px] text-neutral-300 flex items-center gap-1 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Editorial Intelligence Concierge
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                title="Reset conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50 text-xs">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-6 h-6 rounded-none flex items-center justify-center shrink-0 text-[10px] ${
                      isUser
                        ? "bg-black text-white"
                        : "bg-neutral-200 text-black border border-neutral-300"
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`p-3 max-w-[80%] leading-relaxed font-sans ${
                      isUser
                        ? "bg-black text-white"
                        : "bg-white text-neutral-800 border border-neutral-200 shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                    <span
                      className={`text-[9px] block mt-1 ${
                        isUser ? "text-neutral-400 text-right" : "text-neutral-400"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-neutral-500 text-xs italic p-2 font-sans">
                <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.4s]" />
                <span>Consulting intelligence bureau...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Inquiries */}
          <div className="px-3 py-2 bg-white border-t border-neutral-200 flex gap-1.5 overflow-x-auto scrollbar-none">
            {[
              "State of Beauty Report",
              "How to partner with us",
              "Next global events",
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 bg-neutral-100 hover:bg-black hover:text-white text-[10px] text-neutral-700 whitespace-nowrap transition-colors border border-neutral-200 font-medium"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about reports, trends, summits..."
              className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black font-sans"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputMessage.trim() || isLoading}
              className="p-2 bg-black text-white hover:bg-neutral-800 disabled:opacity-40 transition-colors"
              title="Send Inquiry"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
