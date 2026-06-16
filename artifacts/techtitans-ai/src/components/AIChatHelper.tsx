import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Bot, Sparkles, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: string[];
}

const ChatBotIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Outer Ring */}
    <circle cx="50" cy="50" r="45" strokeWidth="1.5" className="opacity-40" />
    <circle cx="50" cy="50" r="41" strokeWidth="3" />
    
    {/* Small dots in the outer ring */}
    <circle cx="14" cy="50" r="1.5" fill="currentColor" />
    <circle cx="86" cy="50" r="1.5" fill="currentColor" />
    <circle cx="50" cy="14" r="1.5" fill="currentColor" />
    
    {/* Antenna */}
    <line x1="50" y1="35" x2="50" y2="22" strokeWidth="2.5" />
    <circle cx="50" cy="19" r="3" fill="currentColor" />
    
    {/* Head Arch (Halo) */}
    <path d="M 28 36 A 24 24 0 0 1 72 36" strokeWidth="2" />
    <circle cx="28" cy="36" r="1.5" fill="currentColor" />
    <circle cx="72" cy="36" r="1.5" fill="currentColor" />
    
    {/* Helmet/Head Outline */}
    <rect x="27" y="35" width="46" height="34" rx="17" strokeWidth="3" />
    
    {/* Ears/Headphones */}
    <rect x="21" y="44" width="6" height="16" rx="3" fill="currentColor" stroke="none" />
    <rect x="73" y="44" width="6" height="16" rx="3" fill="currentColor" stroke="none" />
    
    {/* Happy Eyes */}
    <path d="M 38 52 Q 42 47 46 52" strokeWidth="3" />
    <path d="M 54 52 Q 58 47 62 52" strokeWidth="3" />
    
    {/* Smiling Mouth */}
    <path d="M 45 60 Q 50 63 55 60" strokeWidth="2.5" />
    
    {/* Circuit details in head */}
    <path d="M 33 42 Q 50 38 67 42" strokeWidth="1.5" className="opacity-60" />
    <path d="M 35 63 Q 50 66 65 63" strokeWidth="1.5" className="opacity-60" />
    
    {/* Body/Neck and Chest Circuits */}
    <path d="M 45 69 L 45 74 L 32 82" strokeWidth="3" />
    <path d="M 55 69 L 55 74 L 68 82" strokeWidth="3" />
    <circle cx="32" cy="82" r="2.5" fill="currentColor" />
    <circle cx="68" cy="82" r="2.5" fill="currentColor" />
    
    {/* Center chest vertical circuit */}
    <line x1="50" y1="69" x2="50" y2="86" strokeWidth="3" />
    <circle cx="50" cy="86" r="2.5" fill="currentColor" />
  </svg>
);

export function AIChatHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "bot",
          text: "Hi! I'm Titan, your guide at TechTitans AI. 🚀 What are we building today?",
          options: ["Web Development", "Video & Design", "General Inquiry"],
        },
      ]);
    }
  }, [messages]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleOptionClick = (option: string) => {
    // Add user message
    const userMsgId = Math.random().toString();
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, sender: "user", text: option },
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = "";
      let replyOptions: string[] = [];

      switch (option) {
        case "Web Development":
          replyText = "Awesome! We build high-performance React, Next.js, and custom web applications. What kind of project are you planning?";
          replyOptions = ["Landing Page / Startup", "E-Commerce Site", "Custom App / Portal", "Go Back"];
          break;
        case "Video & Design":
          replyText = "Great! Our design team creates eye-catching brand assets and cinematic video edits. What do you need?";
          replyOptions = ["Video Editing / Reels", "Brand Identity / Logo", "Go Back"];
          break;
        case "General Inquiry":
          replyText = "Sure thing! For partnerships, custom consultations, or general questions, our team is happy to chat.";
          replyOptions = ["Contact Team ➔", "Start Over"];
          break;
        case "Landing Page / Startup":
          replyText = "Landing pages are key for converting visitors. We design fast, responsive pages that capture leads. Ready to connect and get a quote?";
          replyOptions = ["Contact Team ➔", "Go Back"];
          break;
        case "E-Commerce Site":
          replyText = "We build full-featured stores with payment gateways, cart flows, and fast performance. Would you like to review specifications with our team?";
          replyOptions = ["Contact Team ➔", "Go Back"];
          break;
        case "Custom App / Portal":
          replyText = "Got it! Custom SaaS platforms, user portals, or dashboards are our specialty. Let's schedule a call to align technical specifications.";
          replyOptions = ["Contact Team ➔", "Go Back"];
          break;
        case "Video Editing / Reels":
          replyText = "We edit high-retention short-form videos (Reels, TikToks) and YouTube videos with engaging motion graphics. Let's discuss your project details!";
          replyOptions = ["Contact Team ➔", "Go Back"];
          break;
        case "Brand Identity / Logo":
          replyText = "A strong brand identity shapes how customers see your business. We design logos, fonts, and full assets. Ready to outline the details?";
          replyOptions = ["Contact Team ➔", "Go Back"];
          break;
        case "Contact Team ➔":
          replyText = "Perfect! I will take you to our contact form right now. Fill in your details, and a Titan will reach out within 24 hours!";
          replyOptions = ["Start Over"];
          // Scroll to contact form
          setTimeout(() => {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
              // Close chat helper after scrolling
              setIsOpen(false);
            }
          }, 800);
          break;
        case "Go Back":
        case "Start Over":
          replyText = "No problem! What are we building today?";
          replyOptions = ["Web Development", "Video & Design", "General Inquiry"];
          break;
        default:
          replyText = "I'm always learning! Would you like to speak to our human Titans directly?";
          replyOptions = ["Contact Team ➔", "Start Over"];
          break;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text: replyText,
          options: replyOptions,
        },
      ]);
    }, 1000);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText("");

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Math.random().toString(), sender: "user", text: userText },
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text: "That sounds like a fascinating project! While I'm just Titan AI, our human engineering and creative team is ready to bring it to life. Let's get in touch!",
          options: ["Contact Team ➔", "Start Over"],
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window */}
      <div
        className={cn(
          "absolute bottom-20 right-0 w-[350px] sm:w-[380px] h-[480px] rounded-3xl overflow-hidden glass-card flex flex-col shadow-2xl transition-all duration-300 origin-bottom-right transform",
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-75 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-[#111827]/90 border-b border-white/5 px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center border border-white/10 relative">
              <ChatBotIcon className="w-6 h-6 text-white" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent border-2 border-[#111827] rounded-full" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-sm">Titan AI</h4>
              <p className="text-[10px] text-accent font-medium">Systems Active</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col space-y-2">
              <div
                className={cn(
                  "text-sm leading-relaxed p-3.5 rounded-2xl max-w-[85%] border",
                  msg.sender === "bot"
                    ? "bg-white/[0.03] border-white/[0.08] text-neutral-200 self-start rounded-tl-none"
                    : "bg-primary border-primary/20 text-white self-end rounded-tr-none"
                )}
              >
                {msg.text}
              </div>

              {/* Bot Option Buttons */}
              {msg.options && msg.options.length > 0 && msg.sender === "bot" && (
                <div className="flex flex-wrap gap-2 pt-1.5 self-start max-w-[95%]">
                  {msg.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptionClick(opt)}
                      className="text-xs bg-white/5 hover:bg-primary hover:text-white hover:border-primary border border-white/10 text-neutral-300 px-3.5 py-2 rounded-full transition-all duration-300 font-medium active:scale-95"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-3 rounded-2xl rounded-tl-none self-start w-16 justify-center">
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Form */}
        <form
          onSubmit={handleCustomSend}
          className="p-4 border-t border-white/5 bg-[#111827]/40 flex gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-all"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-primary hover:bg-primary-hover flex items-center justify-center text-white transition-all active:scale-95 border border-primary/20 shadow-lg"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Floating Trigger Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-[0_8px_30px_rgba(59,130,246,0.4)] hover:shadow-[0_8px_35px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/10 focus:outline-none"
        aria-label="Open AI Assistant"
      >
        {/* Ring Ping Animation */}
        <span className="absolute -inset-1 rounded-full border border-primary/30 animate-ping opacity-60 pointer-events-none" />

        {isOpen ? (
          <X className="w-6 h-6 transition-all rotate-90" />
        ) : (
          <ChatBotIcon className="w-7 h-7 md:w-8 md:h-8 animate-pulse text-white" />
        )}
      </button>
    </div>
  );
}
