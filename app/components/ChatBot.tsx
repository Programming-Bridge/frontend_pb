"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Minimize2,
  Maximize2,
} from "lucide-react";

interface QuickAction {
  label: string;
  action: string;
  href?: string;
  budget?: string;
}

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  quickActions?: QuickAction[];
}

const INITIAL_QUICK_ACTIONS: QuickAction[] = [
  { label: "🚀 View Featured Projects", action: "navigate_portfolio", href: "/portfolio" },
  { label: "💼 Explore Engineering Services", action: "navigate_services", href: "/services" },
  { label: "💰 Request Instant Quotation", action: "quote_flow" },
  { label: "⚡ Talk to Technical Lead", action: "whatsapp_connect" },
  { label: "📅 Schedule Discovery Call", action: "navigate_contact", href: "/contact" },
];

const BOT_KNOWLEDGE_BASE: { keywords: string[]; reply: string; quickActions?: QuickAction[] }[] = [
  {
    keywords: ["price", "cost", "quote", "pricing", "budget", "how much", "rate", "estimation"],
    reply:
      "We provide affordable, high-efficiency engineering packages tailored for high-growth startups and global enterprises:\n\n• **MVP Launch Tier:** $300 – $800 (4–8 Business Days)\n• **Full-Stack SaaS Platform:** $1,000 – $2,500 (2–4 Weeks)\n• **Enterprise Distributed Architecture:** $3,000+ (Bespoke SLA)\n\nWould you like to start a formal project inquiry or discuss directly with our technical lead?",
    quickActions: [
      { label: "📝 Fill Project Inquiry", action: "navigate_contact", href: "/contact" },
      { label: "💬 Connect on WhatsApp", action: "whatsapp_connect" },
    ],
  },
  {
    keywords: ["service", "services", "offer", "capabilities", "tech stack", "what do you do"],
    reply:
      "Our full-cycle agency engineering disciplines include:\n\n1. **Bespoke Web & Cloud Systems** (Next.js 15, React 19, Node.js, Go)\n2. **Mobile App Engineering** (Kotlin Jetpack Compose, Flutter, React Native)\n3. **AI, LLMs & Multi-Agent Workflows** (PyTorch, RAG, Qdrant, LangChain)\n4. **Cloud Infrastructure & DevOps** (AWS, K8s, Docker, CI/CD)\n5. **Headless CMS & High-Volume E-Commerce** (WordPress ISR, Shopify, Medusa)",
    quickActions: [
      { label: "Explore All 8 Services", action: "navigate_services", href: "/services" },
      { label: "View Client Case Studies", action: "navigate_portfolio", href: "/portfolio" },
    ],
  },
  {
    keywords: ["contact", "email", "phone", "call", "reach", "talk", "whatsapp", "meet"],
    reply:
      "You can connect directly with our engineering leadership:\n\n• **Email:** `official@programmingbridge.org`\n• **WhatsApp Live:** `+92 315 5831940` (Instant Response)\n• **SLA Response Window:** Under 2 hours (24/7 Global Coverage)",
    quickActions: [
      { label: "Open WhatsApp Live Chat", action: "whatsapp_connect" },
      { label: "Submit Inquiry Form", action: "navigate_contact", href: "/contact" },
    ],
  },
  {
    keywords: ["hello", "hi", "hey", "assalam", "good morning", "good evening"],
    reply:
      "Hello! 👋 Welcome to Programming Bridge. I'm your digital engineering assistant. How can we help elevate your software, web, mobile, or AI product today?",
    quickActions: INITIAL_QUICK_ACTIONS.slice(0, 4),
  },
];

export function openGlobalChatBot() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-pb-chatbot"));
  }
}

export function ChatBot() {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/login")) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showPromptBadge, setShowPromptBadge] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "👋 Hi! Welcome to **Programming Bridge**.\n\nWe are a full-stack digital engineering studio building production-grade web applications, mobile platforms, and AI systems. How can I help you today?",
      timestamp: "Just now",
      quickActions: INITIAL_QUICK_ACTIONS,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for global open event from Navbar, Hero, or buttons
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsMinimized(false);
      setShowPromptBadge(false);
    };

    const handleDrawer = (e: any) => {
      setIsDrawerOpen(Boolean(e.detail?.open));
    };

    window.addEventListener("open-pb-chatbot", handleOpen);
    window.addEventListener("pb-mobile-drawer", handleDrawer);
    (window as any).openChatBot = handleOpen;

    return () => {
      window.removeEventListener("open-pb-chatbot", handleOpen);
      window.removeEventListener("pb-mobile-drawer", handleDrawer);
    };
  }, []);

  // Show prompt popup after 20 seconds if not opened yet (Finding 9)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPromptBadge(true);
      }
    }, 20000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Auto-scroll messages to bottom
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, isMinimized]);

  const openWhatsApp = () => {
    const phone = "923155831940";
    const text = encodeURIComponent(
      "Hello Programming Bridge Team! I would like to discuss a software engineering project."
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const openTawkToLiveChat = () => {
    if (typeof window !== "undefined" && window.Tawk_API && typeof window.Tawk_API.maximize === "function") {
      window.Tawk_API.maximize();
      setIsOpen(false);
    } else {
      handleBotResponse("Our 24/7 human live chat is initializing. You can also connect directly via WhatsApp or our Contact form!", [
        { label: "📱 WhatsApp Support", action: "whatsapp" },
        { label: "📩 Contact Form", action: "navigate_contact", href: "/contact" },
      ]);
    }
  };

  const handleAction = (action: string, href?: string) => {
    if (href) {
      setIsOpen(false);
      return;
    }

    if (action === "whatsapp") {
      openWhatsApp();
      return;
    }

    if (action === "tawk") {
      openTawkToLiveChat();
      return;
    }

    if (action === "quote") {
      sendUserMessage("I want to get a project quote and estimate.");
      return;
    }

    if (action === "services") {
      sendUserMessage("What technical services and tech stack do you provide?");
      return;
    }

    if (action === "pricing") {
      sendUserMessage("What are your pricing models and delivery timelines?");
      return;
    }

    if (action === "contact") {
      sendUserMessage("How can I speak directly with a tech lead or team?");
      return;
    }

    if (action === "careers") {
      sendUserMessage("Are there any open positions or careers available?");
      return;
    }
  };

  const sendUserMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsTyping(true);

    // AI Knowledge matching
    setTimeout(() => {
      const lower = query.toLowerCase();
      let matched = BOT_KNOWLEDGE_BASE.find((item) =>
        item.keywords.some((kw) => lower.includes(kw))
      );

      let replyText =
        "Thank you for reaching out! Our engineering leads can help architect, design, and deliver your solution. Would you like to get a quote, explore our services, or talk directly with our team?";
      let quickActions = INITIAL_QUICK_ACTIONS;

      if (matched) {
        replyText = matched.reply;
        quickActions = matched.quickActions || INITIAL_QUICK_ACTIONS;
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickActions,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleBotResponse = (text: string, quickActions?: { label: string; action: string; href?: string }[]) => {
    const botMsg: Message = {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      quickActions,
    };
    setMessages((prev) => [...prev, botMsg]);
  };

  const resetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: "👋 Chat reset! How else can Programming Bridge assist your engineering project today?",
        timestamp: "Just now",
        quickActions: INITIAL_QUICK_ACTIONS,
      },
    ]);
  };

  return (
    <div
      style={{ zIndex: 40 }}
      className={`fixed bottom-5 right-5 pointer-events-none flex flex-col items-end font-sans select-none transition-opacity duration-200 ${
        isDrawerOpen ? "opacity-0 pointer-events-none hidden" : "opacity-100"
      }`}
    >
      {/* 1. Proactive Welcome Tooltip / Prompt Badge */}
      {!isOpen && showPromptBadge && (
        <div className="relative mb-3 animate-bounce pointer-events-auto">
          <div className="relative flex items-center gap-2.5 rounded-2xl border border-brand/30 bg-surface p-3.5 shadow-2xl backdrop-blur-md dark:bg-card">
            <button
              type="button"
              onClick={() => setShowPromptBadge(false)}
              className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-border text-foreground-muted hover:bg-surface-hover hover:text-foreground cursor-pointer"
              aria-label="Dismiss message"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand text-black font-bold">
              <Bot className="h-4 w-4" />
            </div>
            <div
              className="cursor-pointer text-left"
              onClick={() => {
                setIsOpen(true);
                setShowPromptBadge(false);
              }}
            >
              <p className="text-xs font-extrabold text-foreground">Need help with your project?</p>
              <p className="text-xs text-foreground-muted">Chat with our AI & Live Support Lead 👋</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Interactive Chat Window */}
      {isOpen && (
        <div
          className={`pointer-events-auto relative mb-3 flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl backdrop-blur-xl transition-all duration-200 ${
            isMinimized
              ? "h-16 w-80 sm:w-96"
              : "h-[540px] max-h-[82vh] w-[92vw] sm:w-[390px] shadow-brand/10"
          }`}
          role="dialog"
          aria-label="Programming Bridge Chat Assistant"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-surface/90 px-4 py-3.5 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-brand to-brand-cyan text-white shadow-md shadow-brand/20">
                <Bot className="h-5 w-5 text-black" />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-1 ring-card"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold text-foreground tracking-tight">PB Engineering Bot</span>
                  <span className="rounded bg-brand/15 px-1 py-0.2 text-[9px] font-bold text-brand uppercase">AI 2.0</span>
                </div>
                <span className="text-xs text-foreground-muted">● Typically replies instantly</span>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Restart conversation"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand chat" : "Minimize chat"}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
              >
                {isMinimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Quick Connect Top Bar (WhatsApp / Live Team) */}
              <div className="flex items-center justify-between border-b border-border/60 bg-brand/5 px-4 py-2 text-xs">
                <span className="font-semibold text-foreground-muted flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-brand" /> Need human assistance?
                </span>
                <button
                  onClick={openWhatsApp}
                  className="flex items-center gap-1 font-bold text-brand hover:text-brand-hover transition-colors cursor-pointer"
                >
                  <span>WhatsApp Live</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>

              {/* Message History Container */}
              <div className="flex-1 space-y-4 overflow-y-auto p-4 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="flex items-start gap-2 max-w-[88%]">
                      {msg.sender === "bot" && (
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand text-xs mt-0.5">
                          <Bot className="h-3.5 w-3.5" />
                        </div>
                      )}

                      <div
                        className={`rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-xs ${
                          msg.sender === "user"
                            ? "bg-brand font-medium text-black rounded-tr-xs"
                            : "border border-border bg-surface text-foreground rounded-tl-xs"
                        }`}
                      >
                        <div className="whitespace-pre-line break-words text-[13px]">
                          {msg.text.split("\n\n").map((paragraph, idx) => (
                            <p key={idx} className={idx > 0 ? "mt-2" : ""}>
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        {/* Quick action buttons attached to bot bubble */}
                        {msg.quickActions && msg.quickActions.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
                            {msg.quickActions.map((qa, qIdx) =>
                              qa.href ? (
                                <Link
                                  key={qIdx}
                                  href={qa.href}
                                  onClick={() => setIsOpen(false)}
                                  className="inline-flex items-center gap-1 rounded-xl border border-brand/30 bg-brand/10 px-2.5 py-1 text-xs font-bold text-brand hover:bg-brand hover:text-black transition-all"
                                >
                                  <span>{qa.label}</span>
                                  <ArrowRight className="h-2.5 w-2.5" />
                                </Link>
                              ) : (
                                <button
                                  key={qIdx}
                                  onClick={() => handleAction(qa.action, qa.href)}
                                  className="inline-flex items-center gap-1 rounded-xl border border-border bg-card px-2.5 py-1 text-xs font-bold text-foreground hover:border-brand hover:text-brand transition-all cursor-pointer"
                                >
                                  <span>{qa.label}</span>
                                </button>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="mt-1 px-1 text-[10px] text-foreground-subtle">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 text-foreground-muted">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand text-xs">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl border border-border bg-surface px-3 py-2">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand"></span>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand [animation-delay:0.2s]"></span>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendUserMessage();
                }}
                className="border-t border-border bg-surface p-2.5"
              >
                <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-1.5 focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/30 transition-all">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask about quote, services, tech stack..."
                    className="flex-1 bg-transparent text-xs text-foreground placeholder:text-foreground-muted focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    aria-label="Send message"
                    className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand text-black disabled:opacity-40 hover:bg-brand-hover transition-all cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] text-foreground-subtle">
                  <span>Powered by Programming Bridge</span>
                  <button
                    type="button"
                    onClick={openTawkToLiveChat}
                    className="hover:text-brand transition-colors cursor-pointer"
                  >
                    Switch to Live Chat
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}

      {/* 3. Floating Launcher Trigger Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen((prev) => !prev);
          setIsMinimized(false);
          setShowPromptBadge(false);
        }}
        aria-label="Open Live Chat Assistant"
        className="pointer-events-auto group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand to-brand-cyan text-white shadow-2xl shadow-brand/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        {/* Glow Pulse Ring */}
        <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-brand to-brand-cyan opacity-40 blur-sm group-hover:opacity-75 transition-opacity"></span>

        {/* Online Status Green Dot */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 z-10">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-background"></span>
        </span>

        <div className="relative z-10 flex items-center justify-center">
          {isOpen ? (
            <X className="h-6 w-6 text-black transition-transform duration-200 group-hover:rotate-90" />
          ) : (
            <MessageSquare className="h-6 w-6 text-black" />
          )}
        </div>
      </button>
    </div>
  );
}

export default ChatBot;
