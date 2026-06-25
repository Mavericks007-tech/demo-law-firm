"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Phone, MapPin, Calendar, ExternalLink } from "lucide-react";

interface Message {
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Welcome to Chambers of Advocate Munzur Morshed. How can we assist you with your legal needs today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show a small notification dot if closed and bot messages after first boot
    if (!isOpen && messages.length > 1) {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;

    // User Message
    const userMsg: Message = {
      sender: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Bot Auto-Response simulation
    setTimeout(() => {
      let botText = "";
      if (text.toLowerCase().includes("address") || text.toLowerCase().includes("location")) {
        botText = "Our chambers are located at: House 45, Road 11, Banani C/A, Dhaka 1213, Bangladesh. We are open Sunday through Thursday from 9:00 AM to 8:00 PM.";
      } else if (text.toLowerCase().includes("phone") || text.toLowerCase().includes("call") || text.toLowerCase().includes("contact")) {
        botText = "You can speak with our clerk directly by calling +880 1711 000 000, or tap 'Call Chambers' to dial immediately.";
      } else if (text.toLowerCase().includes("fees") || text.toLowerCase().includes("cost")) {
        botText = "Consultation fees vary depending on the complexity of the matter (Corporate, Writ, Civil, etc.). We recommend booking a slot under our Booking form to receive a preliminary quote.";
      } else {
        botText = "Thank you for reaching out. We have logged your request. For immediate counsel, we recommend messaging Advocate Morshed directly on WhatsApp or calling our hotline.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botText,
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[350px] sm:w-[380px] h-[500px] rounded-xl border border-legal-steel bg-legal-darkest shadow-2xl flex flex-col overflow-hidden mb-4 animate-fade-in">
          {/* Chat Header */}
          <div className="bg-legal-dark border-b border-legal-steel/60 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-legal-steel flex items-center justify-center border border-legal-slate/30">
                  <span className="font-serif text-sm font-bold text-legal-light">MM</span>
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-legal-dark"></div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-legal-light font-serif">Chambers Assistant</h4>
                <p className="text-[10px] text-green-400">Online & Ready to Help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-legal-ash hover:text-legal-light transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-legal-darkest/90">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-legal-steel text-legal-light rounded-tr-none border border-legal-slate/30"
                      : "bg-legal-dark text-legal-ash rounded-tl-none border border-legal-steel/40"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="text-[9px] text-legal-slate block text-right mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions Panel */}
          <div className="p-2 bg-legal-dark/30 border-t border-legal-steel/20 flex flex-wrap gap-1.5 justify-center">
            <a
              href="https://wa.me/8801711000000?text=Hello%20Advocate%20Munzur%20Morshed,%20I%20would%20like%20to%20schedule%20a%20legal%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-green-900/30 text-green-400 border border-green-800/40 hover:bg-green-900/50 transition-all"
            >
              <span>WhatsApp Chat</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <button
              onClick={() => handleSend("Where is your chambers located?")}
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-legal-steel/50 text-legal-light border border-legal-slate/30 hover:bg-legal-steel transition-all"
            >
              <MapPin className="h-3 w-3" />
              <span>Chambers Address</span>
            </button>
            <a
              href="tel:+8801711000000"
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-legal-steel/50 text-legal-light border border-legal-slate/30 hover:bg-legal-steel transition-all"
            >
              <Phone className="h-3 w-3" />
              <span>Call Hotline</span>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-legal-light text-legal-darkest hover:bg-white transition-all"
            >
              <Calendar className="h-3 w-3" />
              <span>Book Appointment</span>
            </a>
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-legal-steel/60 bg-legal-dark flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask a question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-legal-darkest border border-legal-steel rounded-md px-3 py-2 text-xs text-legal-light placeholder-legal-slate focus:outline-none focus:border-legal-ash/50 transition-colors"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-md bg-legal-steel text-legal-light border border-legal-slate/30 hover:bg-legal-slate transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-4 rounded-full bg-legal-light text-legal-darkest shadow-2xl hover:scale-105 active:scale-95 transition-all focus:outline-none border-2 border-legal-steel"
        aria-label="Toggle Live Chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        {hasNewMessage && (
          <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-legal-darkest animate-pulse" />
        )}
      </button>
    </div>
  );
}
