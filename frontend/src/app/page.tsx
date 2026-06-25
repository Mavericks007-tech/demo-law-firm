import Link from "next/link";
import Image from "next/image";
import { Scale, CheckCircle2, ShieldCheck, Award, Users, BookOpen, ArrowRight, Phone } from "lucide-react";

export default function Home() {
  const features = [
    "High Court Division Writ Petitions",
    "Company Incorporation & Governance",
    "Commercial Arbitration & Dispute Mediation",
    "Property Title Verification & Litigation",
    "Intellectual Property Filings & Licensing",
    "Supreme Court Appeal Jurisdictions"
  ];

  const metrics = [
    { label: "Years Active", value: "15+" },
    { label: "Successful Writs", value: "120+" },
    { label: "Corporate Clients", value: "85+" },
    { label: "Arbitration Awards", value: "40M+ BDT" }
  ];

  const testimonials = [
    {
      quote: "Advocate Morshed represented us in a high-stakes tax dispute writ petition. His mastery of constitutional law secured an injunction that saved our factory operations.",
      client: "Director, Apex Textiles Ltd.",
      context: "Writ & Tax Assessment Dispute"
    },
    {
      quote: "An exceptional advisory partner. Munzur handled our cross-border joint venture agreements, ensuring regulatory compliance and safeguarding our intellectual property.",
      client: "CEO, FinTech Ventures Dhaka",
      context: "Corporate Restructuring & IP"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION — with background image */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg"
            alt="Scales of Justice, Gavel and Contract — Chambers of Advocate Munzur Morshed"
            fill
            priority
            className="object-cover object-center"
            quality={85}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full z-10 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-legal-steel/60 text-legal-light border border-legal-ash/20 backdrop-blur-sm">
              Chambers of Advocate Munzur Morshed
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-legal-light leading-[1.15] drop-shadow-lg">
              Rigorous Counsel.<br />
              <span className="bg-gradient-to-r from-legal-light via-legal-ash to-legal-slate bg-clip-text text-transparent">
                Authoritative Defense.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-legal-ash max-w-2xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md">
              Providing premium, high-caliber legal counsel in Writ Jurisdictions, Constitutional law, Complex Commercial Arbitration, and Corporate restructuring in the Supreme Court of Bangladesh.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center px-8 py-3.5 rounded-md font-bold bg-legal-light text-legal-darkest hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Schedule Consultation
              </Link>
              <Link
                href="/practice-areas"
                className="w-full sm:w-auto text-center px-8 py-3.5 rounded-md font-bold border border-legal-ash/40 text-legal-light hover:bg-legal-steel/40 backdrop-blur-sm transition-all flex items-center justify-center space-x-2"
              >
                <span>Practice Focus</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-legal-steel/40">
              {metrics.map((m) => (
                <div key={m.label} className="text-center lg:text-left">
                  <span className="block text-2xl md:text-3xl font-bold font-serif text-legal-light drop-shadow">{m.value}</span>
                  <span className="block text-xs uppercase tracking-wider text-legal-slate mt-1">{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Right Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-legal-ash/20 relative overflow-hidden shadow-2xl backdrop-blur-xl">
              {/* Gold shimmer top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#CCD0CF]/60 to-transparent" />
              <div className="absolute top-0 right-0 p-3">
                <Scale className="h-32 w-32 text-legal-steel/20 -mr-6 -mt-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-legal-light mb-4 border-b border-legal-steel/60 pb-3">
                Chambers Profile
              </h3>
              <p className="text-sm text-legal-ash leading-relaxed mb-6">
                <strong>Advocate Munzur Morshed</strong> has served as a senior practitioner of the High Court and Appellate Divisions, representing corporate conglomerates, private investors, and citizens seeking redress for administrative excess.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-xs">
                  <ShieldCheck className="h-5 w-5 text-legal-light" />
                  <span>Licensed Supreme Court Advocate</span>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <Award className="h-5 w-5 text-legal-light" />
                  <span>Corporate Restructure Specialist</span>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <Users className="h-5 w-5 text-legal-light" />
                  <span>Recognized Arbitrator & Mediator</span>
                </div>
              </div>

              <a
                href="https://wa.me/8801711000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 rounded bg-green-900/30 text-green-400 border border-green-800/40 hover:bg-green-900/50 transition-all font-semibold text-xs flex items-center justify-center space-x-2"
              >
                <span>Direct WhatsApp Inquiries</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US (ANIMATED CHECKLISTS) */}
      <section className="py-20 bg-legal-darkest px-4 sm:px-6 lg:px-8 border-b border-legal-steel/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-legal-slate font-semibold">Chambers Quality</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-legal-light">
              Commitment to Client Success
            </h2>
            <p className="text-sm text-legal-ash leading-relaxed">
              Every representation is built upon a foundation of absolute confidentiality, rigorous analysis, and aggressive litigation strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-6 border border-legal-steel flex items-start space-x-4 hover:border-legal-ash/30 transition-all"
              >
                <div className="mt-1">
                  <CheckCircle2 className="h-6 w-6 text-legal-light animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-legal-light mb-1">{feature}</h4>
                  <p className="text-xs text-legal-slate leading-relaxed">
                    Executing cases with precision, utilizing detailed legal frameworks to maximize successful outcomes.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIALS — with image background */}
      <section className="relative py-24 border-b border-legal-steel/30 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg"
            alt="Law chambers atmosphere"
            fill
            className="object-cover object-right"
            quality={60}
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-legal-light">Client Testimonials</h3>
            <p className="text-xs text-legal-slate uppercase tracking-wider mt-2">What clients say about Adv. Morshed</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass-card p-8 rounded-xl border border-legal-ash/15 backdrop-blur-xl flex flex-col justify-between shadow-2xl">
                {/* Decorative quote mark */}
                <span className="text-6xl font-serif text-legal-steel/60 leading-none mb-2 block">&ldquo;</span>
                <p className="text-sm italic text-legal-ash leading-relaxed mb-6 font-serif -mt-4">
                  {t.quote}
                </p>
                <div className="border-t border-legal-steel/40 pt-4">
                  <h5 className="text-xs font-bold text-legal-light">{t.client}</h5>
                  <span className="text-[10px] text-legal-slate uppercase tracking-wide block mt-0.5">{t.context}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FINAL CALL-TO-ACTION — with background image */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/law-hero.jpg"
            alt="Premium law chambers background"
            fill
            className="object-cover object-top"
            quality={60}
          />
        </div>

        <div className="max-w-4xl mx-auto space-y-8 z-10 relative">
          <Scale className="h-12 w-12 text-legal-light mx-auto opacity-80" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-legal-light drop-shadow-lg">
            Secure Authoritative Legal Representation
          </h2>
          <p className="text-sm text-legal-ash max-w-xl mx-auto leading-relaxed">
            Discuss your case with Advocate Munzur Morshed in absolute confidentiality. We offer preliminary assessments for writ filings and commercial contracts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded bg-legal-light text-legal-darkest font-bold hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Book A Free Consultation
            </Link>
            <a
              href="tel:+8801711000000"
              className="w-full sm:w-auto px-8 py-3.5 rounded border border-legal-ash/30 text-legal-light hover:bg-legal-steel/30 backdrop-blur-sm transition-all font-bold flex items-center justify-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span>Call +880 1711 000000</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
