"use client";

import { useState, useEffect } from "react";
import { Info, X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/declined cookies
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small timeout to animate banner entry
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50 animate-fade-in-up">
      <div className="glass-panel p-5 rounded-xl border border-legal-steel shadow-2xl relative overflow-hidden">
        {/* Shimmer accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-legal-steel via-legal-ash to-legal-steel"></div>
        
        <div className="flex items-start space-x-3 mt-1">
          <Info className="h-5 w-5 text-legal-light flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h5 className="font-serif text-sm font-semibold text-legal-light">
              Cookie Consent & Legal Notice
            </h5>
            <p className="text-xs text-legal-ash mt-1.5 leading-relaxed">
              We use necessary cookies to enable site navigation and compile basic traffic metrics to enhance our legal service delivery. By clicking "Accept All", you agree to our cookie policy.
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-legal-slate hover:text-legal-light transition-colors p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-end space-x-3 mt-4">
          <button
            onClick={handleDecline}
            className="text-xs font-semibold text-legal-ash hover:text-legal-light transition-colors px-3 py-1.5 rounded border border-legal-steel hover:bg-legal-steel/30"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="text-xs font-semibold text-legal-darkest bg-legal-light hover:bg-white transition-colors px-4 py-1.5 rounded shadow-sm"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
