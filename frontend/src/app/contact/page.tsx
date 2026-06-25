"use client";

import { useState } from "react";
import Image from "next/image";
import { submitContactForm, bookAppointment } from "@/lib/api";
import { Mail, Phone, MapPin, CheckCircle, ExternalLink, Calendar, Clock, Loader } from "lucide-react";

export default function Contact() {
  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState("");

  // Appointment State
  const [apptName, setApptName] = useState("");
  const [apptEmail, setApptEmail] = useState("");
  const [apptPhone, setApptPhone] = useState("");
  const [apptDetails, setApptDetails] = useState("");
  const [apptDate, setApptDate] = useState("");
  const [apptTime, setApptTime] = useState("");
  const [apptLoading, setApptLoading] = useState(false);
  const [apptSuccess, setApptSuccess] = useState(false);
  const [apptError, setApptError] = useState("");

  const timeSlots = ["10:30 AM", "11:30 AM", "02:00 PM", "03:30 PM", "04:30 PM", "06:00 PM"];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactError("");
    setContactSuccess(false);

    try {
      await submitContactForm({
        name: contactName,
        email: contactEmail,
        phone: contactPhone || null,
        subject: contactSubject,
        message: contactMessage,
      });
      setContactSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setContactSubject("");
      setContactMessage("");
    } catch (err: any) {
      setContactError(err.message || "Failed to submit message. Please try again.");
    } finally {
      setContactLoading(false);
    }
  };

  const handleApptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apptDate || !apptTime) {
      setApptError("Please select both a date and a time slot.");
      return;
    }

    setApptLoading(true);
    setApptError("");
    setApptSuccess(false);

    try {
      await bookAppointment({
        client_name: apptName,
        email: apptEmail,
        phone: apptPhone,
        date: apptDate,
        time_slot: apptTime,
        details: apptDetails || null,
      });
      setApptSuccess(true);
      setApptName("");
      setApptEmail("");
      setApptPhone("");
      setApptDetails("");
      setApptDate("");
      setApptTime("");
    } catch (err: any) {
      setApptError(err.message || "Failed to book appointment. The slot might already be reserved.");
    } finally {
      setApptLoading(false);
    }
  };

  // Get tomorrow's date string for input min attribute
  const getTomorrowString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <div className="bg-legal-darkest min-h-screen">
      {/* Page Header */}
      <section className="relative border-b border-legal-steel/50 py-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/practice.jpeg"
            alt="Contact Advocate Munzur Morshed background"
            fill
            className="object-cover object-center"
            quality={60}
          />
        </div>
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-xs uppercase tracking-widest text-legal-slate font-semibold">Chambers Access</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-legal-light">Contact & Consultations</h1>
          <p className="text-sm text-legal-ash max-w-2xl mx-auto leading-relaxed">
            Schedule an appointment with Advocate Morshed, or send a general message regarding litigation representation.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct info & Appointment Scheduler */}
          <div className="lg:col-span-6 space-y-8">
            {/* Contact details card */}
            <div className="glass-card p-8 rounded-2xl border border-legal-steel space-y-6">
              <h3 className="font-serif text-xl font-bold text-legal-light">Chambers Hotline & Location</h3>
              <div className="h-0.5 w-12 bg-legal-light"></div>
              
              <ul className="space-y-4 text-xs sm:text-sm text-legal-ash">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-legal-light flex-shrink-0 mt-0.5" />
                  <span>House 45, Road 11, Banani C/A, Dhaka 1213, Bangladesh</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-legal-light flex-shrink-0" />
                  <span>+880 1711 000 000</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-legal-light flex-shrink-0" />
                  <span>info@morshedlaw.com</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-legal-steel/40">
                <a
                  href="https://wa.me/8801711000000?text=Hello%20Advocate%20Munzur%20Morshed,%20I%20need%20legal%20counsel."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3 rounded bg-green-900/30 text-green-400 border border-green-800/40 hover:bg-green-900/50 transition-all font-semibold text-xs flex items-center justify-center space-x-2"
                >
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="tel:+8801711000000"
                  className="flex-1 text-center py-3 rounded border border-legal-steel text-legal-light hover:bg-legal-steel/30 transition-all font-semibold text-xs flex items-center justify-center space-x-2"
                >
                  <span>Call Clerk Directly</span>
                </a>
              </div>
            </div>

            {/* Interactive Appointment Scheduler */}
            <div className="glass-card p-8 rounded-2xl border border-legal-steel">
              <h3 className="font-serif text-xl font-bold text-legal-light mb-2">Book Consultation</h3>
              <p className="text-xs text-legal-slate mb-6">Select your date and slot. Our clerk will confirm via phone.</p>
              
              {apptSuccess ? (
                <div className="p-6 bg-green-900/20 border border-green-800/40 rounded-xl text-center space-y-3">
                  <CheckCircle className="h-10 w-10 text-green-400 mx-auto" />
                  <h4 className="text-sm font-bold text-green-400">Appointment Request Submitted!</h4>
                  <p className="text-xs text-legal-ash leading-relaxed">
                    We have logged your request. The chambers clerk will call you shortly to confirm details.
                  </p>
                  <button
                    onClick={() => setApptSuccess(false)}
                    className="mt-4 px-4 py-1.5 bg-green-800/30 hover:bg-green-800/50 text-green-400 border border-green-700/50 rounded text-xs transition-colors"
                  >
                    Schedule Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApptSubmit} className="space-y-4">
                  {apptError && (
                    <div className="p-3 bg-red-900/20 border border-red-800/40 text-red-400 text-xs rounded">
                      {apptError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-legal-slate">Full Name</label>
                      <input
                        type="text"
                        required
                        value={apptName}
                        onChange={(e) => setApptName(e.target.value)}
                        className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-xs text-legal-light focus:outline-none focus:border-legal-ash transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-legal-slate">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={apptPhone}
                        onChange={(e) => setApptPhone(e.target.value)}
                        className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-xs text-legal-light focus:outline-none focus:border-legal-ash transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-legal-slate">Email Address</label>
                    <input
                      type="email"
                      required
                      value={apptEmail}
                      onChange={(e) => setApptEmail(e.target.value)}
                      className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-xs text-legal-light focus:outline-none focus:border-legal-ash transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-legal-slate">Choose Consultation Date</label>
                    <input
                      type="date"
                      required
                      min={getTomorrowString()}
                      value={apptDate}
                      onChange={(e) => setApptDate(e.target.value)}
                      className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-xs text-legal-light focus:outline-none focus:border-legal-ash transition-colors"
                    />
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-legal-slate block">Select Time Slot</label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setApptTime(slot)}
                          className={`py-2 text-[10px] sm:text-xs font-semibold rounded border transition-all ${
                            apptTime === slot
                              ? "bg-legal-light text-legal-darkest border-transparent"
                              : "bg-legal-darkest text-legal-ash border-legal-steel hover:bg-legal-steel/30"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-legal-slate">Case Summary Details</label>
                    <textarea
                      rows={3}
                      value={apptDetails}
                      onChange={(e) => setApptDetails(e.target.value)}
                      placeholder="Brief description of the legal dispute..."
                      className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-xs text-legal-light focus:outline-none focus:border-legal-ash transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={apptLoading}
                    className="w-full py-3 bg-legal-light text-legal-darkest font-bold rounded text-xs hover:bg-white transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {apptLoading ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin" />
                        <span>Requesting Slot...</span>
                      </>
                    ) : (
                      <span>Submit Appointment Booking</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Contact/General message form */}
          <div className="lg:col-span-6 glass-card p-8 rounded-2xl border border-legal-steel">
            <h3 className="font-serif text-xl font-bold text-legal-light mb-2">General Case Inquiries</h3>
            <p className="text-xs text-legal-slate mb-6">For general representation inquiries, please fill out the form below.</p>
            
            {contactSuccess ? (
              <div className="p-6 bg-green-900/20 border border-green-800/40 rounded-xl text-center space-y-3">
                <CheckCircle className="h-10 w-10 text-green-400 mx-auto" />
                <h4 className="text-sm font-bold text-green-400">Message Transmitted!</h4>
                <p className="text-xs text-legal-ash leading-relaxed">
                  Thank you. Your message has been logged in our databases. Advocate Morshed's team will get in touch shortly.
                </p>
                <button
                  onClick={() => setContactSuccess(false)}
                  className="mt-4 px-4 py-1.5 bg-green-800/30 hover:bg-green-800/50 text-green-400 border border-green-700/50 rounded text-xs transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                {contactError && (
                  <div className="p-3 bg-red-900/20 border border-red-800/40 text-red-400 text-xs rounded">
                    {contactError}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-legal-slate">Full Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-xs text-legal-light focus:outline-none focus:border-legal-ash transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-legal-slate">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-xs text-legal-light focus:outline-none focus:border-legal-ash transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-legal-slate">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-xs text-legal-light focus:outline-none focus:border-legal-ash transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-legal-slate">Subject of Inquiry</label>
                  <input
                    type="text"
                    required
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="e.g. Writ Injunction, Company Share Dispute"
                    className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-xs text-legal-light focus:outline-none focus:border-legal-ash transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-legal-slate">Message</label>
                  <textarea
                    rows={6}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Describe your legal matter in details..."
                    className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-xs text-legal-light focus:outline-none focus:border-legal-ash transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full py-3 bg-legal-light text-legal-darkest font-bold rounded text-xs hover:bg-white transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {contactLoading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <span>Send Secure Message</span>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Map Section Placeholders */}
      <section className="py-12 border-t border-legal-steel/30 px-4 max-w-7xl mx-auto">
        <div className="glass-panel p-4 rounded-2xl border border-legal-steel h-[350px] relative overflow-hidden flex flex-col justify-end">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-legal-dark z-0 flex items-center justify-center opacity-40">
            <div className="text-center space-y-2">
              <MapPin className="h-10 w-10 text-legal-light mx-auto animate-bounce" />
              <span className="text-xs text-legal-ash uppercase tracking-widest block font-sans">
                Dhaka Chambers (Banani Road 11 Map Area)
              </span>
            </div>
          </div>
          
          <div className="z-10 bg-legal-darkest/95 border border-legal-steel p-4 rounded-xl max-w-sm">
            <h4 className="font-serif text-sm font-bold text-legal-light mb-1">Chambers Location</h4>
            <p className="text-[11px] text-legal-ash leading-relaxed">
              Advocate Munzur Morshed Chambers, House 45, Road 11, Banani C/A, Dhaka. Easily accessible from Gulshan and Mohakhali.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
