"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, Menu, X, PhoneCall } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Practice Areas", href: "/practice-areas" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-legal-darkest/90 backdrop-blur-md border-b border-legal-steel/50 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-lg bg-legal-steel/80 border border-legal-slate/30 group-hover:border-legal-ash/50 transition-all">
              <Scale className="h-6 w-6 text-legal-light group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <span className="font-serif text-lg md:text-xl font-bold tracking-wide text-legal-light block">
                ADV. MUNZUR MORSHED
              </span>
              <span className="text-xs uppercase tracking-widest text-legal-ash block -mt-1 font-sans">
                Supreme Court of Bangladesh
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-legal-light ${
                    isActive ? "text-legal-light font-semibold border-b-2 border-legal-ash/60 pb-1" : "text-legal-ash"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/contact"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-md text-sm font-semibold tracking-wide text-legal-darkest bg-legal-light hover:bg-white border border-transparent transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Book Consult</span>
            </Link>
            {/* Quick Admin access */}
            <Link href="/admin" className="text-xs text-legal-slate hover:text-legal-ash">
              Portal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              href="/contact"
              className="p-2 rounded-md bg-legal-light text-legal-darkest hover:bg-white transition-colors"
            >
              <PhoneCall className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-legal-ash hover:text-legal-light hover:bg-legal-steel/50 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden fixed inset-0 top-[73px] z-40 w-full bg-legal-darkest/95 backdrop-blur-lg border-t border-legal-steel/30 transition-all duration-300 transform ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="px-4 py-8 space-y-4 flex flex-col h-full justify-start items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium tracking-wide py-2 w-full text-center transition-colors border-b border-legal-steel/20 ${
                  isActive ? "text-legal-light font-bold" : "text-legal-ash"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="w-full text-center mt-6 py-3 rounded-md font-semibold text-legal-darkest bg-legal-light hover:bg-white transition-colors block"
          >
            Book Free Consultation
          </Link>
          <Link
            href="/admin"
            onClick={() => setIsOpen(false)}
            className="text-sm text-legal-slate hover:text-legal-ash mt-4 block"
          >
            Admin Panel Access
          </Link>
        </div>
      </div>
    </header>
  );
}
