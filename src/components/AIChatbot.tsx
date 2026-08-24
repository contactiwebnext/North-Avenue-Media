import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Bot, User, Minimize2, RefreshCw, ChevronDown, Volume2, Globe } from "lucide-react";
import { ChatMessage } from "../types";

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      role: "assistant",
      content: "Welcome to **North Avenue Media Intelligence**.\n\nI am your AI editorial concierge. How may I assist you with global beauty macro-trends, summit schedules, market intelligence briefings, or editorial pitches?",
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
        "Thank you for contacting North Avenue Media. Please reach out to thenorthavenuemedia@gmail.com for specialized inquiries.";

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
        content: "North Avenue Media is the voice driving beauty's next era in media, global events, industry insights, and innovation.\n\nFor direct contact, reach our editorial desk at **thenorthavenuemedia@gmail.com** or call **+1 202-876-8594**.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    "What are the top 2026 biotech beauty breakthroughs?",
    "Tell me about the Paris Beauty Tech Summit",
    "How can I submit an editorial pitch?",
    "Summarize the Q3 Global Luxury Index",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-gradient-to-tr from-[#0A0A0A] to-[#1A1A1A] border border-[#C5A059]/50 shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:scale-105 transition-all text-[#C5A059]"
          aria-label="Open North Avenue AI Concierge"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
          {hasUnread && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#C5A059] border-2 border-[#0A0A0A] animate-bounce" />
          )}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#141414] text-xs font-semibold text-[#FDFCF8] border border-[#C5A059]/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none font-sans">
            Editorial AI Concierge
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[560px] max-h-[85vh] glass-panel rounded-2xl border border-[#C5A059]/40 shadow-2xl flex flex-col overflow-hidden bg-[#0A0A0A]/98 animate-in fade-in zoom-in-95 duration-200 font-sans">
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-white/10 bg-[#121212] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm font-semibold text-[#FDFCF8] flex items-center gap-1.5">
                  Editorial Concierge
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </h4>
                <p className="text-[10px] text-[#C5A059] uppercase tracking-widest font-mono">
                  North Avenue Intelligence
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-neutral-400">
              <button
                onClick={() => setMessages([messages[0]])}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white"
                title="Reset conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg) => {
              const isBot = msg.role === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isBot ? "items-start" : "items-end justify-end"}`}
                >
                  {isBot && (
                    <div className="w-6 h-6 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 leading-relaxed whitespace-pre-wrap ${
                      isBot
                        ? "bg-[#161616] border border-white/5 text-neutral-200"
                        : "bg-[#C5A059] text-black font-medium"
                    }`}
                  >
                    {msg.content}
                    <div
                      className={`text-[9px] mt-1 text-right ${
                        isBot ? "text-neutral-500" : "text-black/60"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-neutral-400 text-xs px-2 py-1">
                <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] text-neutral-500 italic ml-1">Consulting editorial matrix...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Sample Prompts */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-white/5 bg-[#0E0E0E]">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mb-1.5">
                Suggested Inquiries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {samplePrompts.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSend(prompt)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-[#C5A059]/20 border border-white/10 hover:border-[#C5A059]/40 text-neutral-300 hover:text-[#FDFCF8] transition-all text-left truncate max-w-full"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-white/10 bg-[#121212] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about trends, summits, reports..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#0A0A0A] border border-white/10 text-xs text-[#FDFCF8] placeholder:text-neutral-500 focus:outline-none focus:border-[#C5A059]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="p-2 rounded-xl bg-[#C5A059] text-black hover:bg-[#DFC17B] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
