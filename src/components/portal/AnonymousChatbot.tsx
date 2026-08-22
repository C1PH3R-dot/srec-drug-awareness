import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Message = {
  role: "user" | "bot";
  text: string;
};

// FAQ Knowledge Base & Keyword Rules
const FAQ_KNOWLEDGE_BASE = [
  {
    keywords: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening"],
    response: "Hello there! 👋 How can I help you today? Feel free to ask about helplines, support services, or campus safety.",
  },
  {
    keywords: ["how are you", "how r u", "whats up", "what's up"],
    response: "I'm doing well and here to support you! How are you feeling today?",
  },
  {
    keywords: ["bye", "goodbye", "see you", "night", "take care"],
    response: "Take care! Remember, our confidential support systems are always available if you need help. Stay safe! 🌟",
  },
  {
    keywords: ["thank", "thanks", "thank you", "thx"],
    response: "You're very welcome! Seeking help or asking questions is a great step. Reach out anytime! 🙌",
  },
  {
    keywords: ["helpline", "emergency", "contact", "number", "call", "phone", "crisis", "112"],
    response: "🚨 Emergency Contacts:\n• MANAS Helpline: 1933\n• National Emergency: 112\n• SREC Campus Wellness Office: +91 422 2461588",
  },
  {
    keywords: ["anonymous", "secret", "private", "confidential", "privacy"],
    response: "🔒 Yes, completely! All conversations, reports, and counseling requests here are strictly 100% confidential and anonymous.",
  },
  {
    keywords: ["counselor", "counselling", "therapy", "doctor", "wellness"],
    response: "💬 You can speak confidentially with our campus counselor at +91 422 2461588 or visit the campus Wellness Center.",
  },
  {
    keywords: ["symptom", "sign", "identify", "recognize", "effects", "addiction"],
    response: "⚠️ Common signs of substance abuse include sudden mood swings, academic decline, social withdrawal, and secretive behavior.",
  },
  {
    keywords: ["pledge", "promise", "join"],
    response: "📜 You can take the anti-drug pledge directly on the home page under the 'Take Anti-Drug Pledge' section!",
  },
];

export function AnonymousChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi there! 👋 I'm here to help confidentially. Feel free to ask anything about de-addiction, campus resources, or emergency support. Your conversation is completely anonymous.",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Smart Keyword/Intent Reader
  const getSmartResponse = (userText: string): string => {
    const cleanInput = userText.toLowerCase().trim();

    for (const faq of FAQ_KNOWLEDGE_BASE) {
      if (faq.keywords.some((kw) => cleanInput.includes(kw))) {
        return faq.response;
      }
    }

    // Default Fallback Response if no keywords match
    return "Thank you for reaching out. It takes courage to ask! If you need immediate assistance, call 1933 (MANAS) or +91 422 2461588 for campus counseling.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");

    // Read user input and generate matched response after a small delay
    setTimeout(() => {
      const botResponse = getSmartResponse(userMessage);
      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
        aria-label="Open chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Modal */}
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-96 rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 p-6 shadow-2xl backdrop-blur-lg border border-cyan-500/20">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">Confidential Support</h3>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-700/50 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="mb-4 max-h-80 space-y-3 overflow-y-auto pr-1">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-cyan-600 text-white rounded-tr-none"
                      : "bg-slate-700/50 text-slate-100 border border-cyan-500/20 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Field */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 rounded-full bg-slate-700/50 px-4 py-2 text-sm text-white placeholder-slate-400 border border-cyan-500/20 focus:outline-none focus:border-cyan-500/50"
            />
            <button
              onClick={handleSend}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-400">
            💬 Your conversation is completely anonymous and confidential.
          </p>
        </div>
      )}
    </>
  );
}