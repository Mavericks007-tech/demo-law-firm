import Link from "next/link";
import Image from "next/image";
import { Award, BookOpen, Scale, Shield, Calendar, MapPin } from "lucide-react";

export default function About() {
  const credentials = [
    {
      title: "Enrollments & Memberships",
      icon: Award,
      items: [
        "Advocate, High Court Division, Supreme Court of Bangladesh",
        "Member, Supreme Court Bar Association (SCBA)",
        "Member, Dhaka Bar Association",
        "Accredited Commercial Arbitrator"
      ]
    },
    {
      title: "Academic Background",
      icon: BookOpen,
      items: [
        "Master of Laws (LL.M.) in International Business Law",
        "Bachelor of Laws (LL.B. Hons.), University of Dhaka",
        "Specialized Certification in Alternative Dispute Resolution (ADR)"
      ]
    }
  ];

  const philosophy = [
    {
      title: "Strict Confidentiality",
      description: "We safeguard client disclosures and proprietary files with security measures that exceed legal requirements.",
      icon: Shield
    },
    {
      title: "Rigorous Case Prep",
      description: "No stone is left unturned. We exhaustively research precedents and case details before drafting writ petitions or contracts.",
      icon: Scale
    }
  ];

  const highlights = [
    { year: "2011", event: "Enrolled in Dhaka Bar and commenced general civil practice" },
    { year: "2014", event: "Admitted as Advocate to the High Court Division of the Supreme Court" },
    { year: "2018", event: "Drafted key amendments and advisory opinions for major local conglomerates" },
    { year: "2022", event: "Secured landmark writ judgments in constitutional disputes" }
  ];

  return (
    <div className="bg-legal-darkest min-h-screen">
      {/* Page Header */}
      <section className="relative border-b border-legal-steel/50 py-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/show up.jpeg"
            alt="About Advocate Munzur Morshed background"
            fill
            className="object-cover object-center"
            quality={60}
          />
        </div>
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-xs uppercase tracking-widest text-legal-slate font-semibold">Advocate Profile</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-legal-light">Advocate Munzur Morshed</h1>
          <p className="text-sm text-legal-ash max-w-2xl mx-auto leading-relaxed">
            Advocate Supreme Court of Bangladesh. Dedicated to navigating complex legal landscapes with precision and authority.
          </p>
        </div>
      </section>

      {/* Profile Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Biography */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-legal-light">Professional Profile</h2>
            <div className="h-0.5 w-16 bg-legal-light"></div>
            <p className="text-sm text-legal-ash leading-relaxed">
              Advocate Munzur Morshed is a seasoned advocate enrolled with the Supreme Court of Bangladesh. With over a decade of litigation experience in Dhaka, his practice is defined by rigorous case evaluation, strategic depth, and uncompromising professionalism.
            </p>
            <p className="text-sm text-legal-ash leading-relaxed">
              Specializing in Writ Jurisdictions, his chambers regularly challenge arbitrary administrative decisions, revenue assessments, and licensing disputes. Beyond constitutional remedies, he serves as corporate counsel to leading logistics, manufacturing, and tech businesses in Bangladesh, drafting watertight shareholders' agreements and overseeing corporate compliance audits.
            </p>
            <p className="text-sm text-legal-ash leading-relaxed">
              Whether representing clients in High Court hearings or structured commercial arbitrations, Advocate Morshed delivers a combination of legal expertise and focused advocacy to protect assets and ensure business continuity.
            </p>

            {/* Philosophy Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {philosophy.map((p, i) => {
                const IconComp = p.icon;
                return (
                  <div key={i} className="glass-card p-6 rounded-xl border border-legal-steel">
                    <IconComp className="h-8 w-8 text-legal-light mb-3" />
                    <h4 className="font-serif text-sm font-semibold text-legal-light mb-2">{p.title}</h4>
                    <p className="text-xs text-legal-slate leading-relaxed">{p.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Credentials */}
          <div className="lg:col-span-5 space-y-8 bg-legal-dark/50 border border-legal-steel rounded-2xl p-8 shadow-xl">
            <div className="text-center pb-6 border-b border-legal-steel/60">
              <div className="w-24 h-24 rounded-full bg-legal-steel/70 mx-auto border-2 border-legal-light flex items-center justify-center mb-4">
                <span className="font-serif text-3xl font-bold text-legal-light">MM</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-legal-light">Adv. Munzur Morshed</h3>
              <p className="text-xs text-legal-slate uppercase tracking-wider mt-1"> Dhaka Chambers </p>
            </div>

            {credentials.map((cred, idx) => {
              const IconComp = cred.icon;
              return (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center space-x-3 text-legal-light">
                    <IconComp className="h-5 w-5" />
                    <h4 className="font-serif text-sm font-semibold">{cred.title}</h4>
                  </div>
                  <ul className="space-y-2 pl-8 list-disc text-xs text-legal-ash leading-relaxed">
                    {cred.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Timeline Highlights */}
      <section className="py-20 bg-legal-dark/30 border-t border-b border-legal-steel/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl font-bold text-center text-legal-light mb-16">
            Career Timeline & Milestones
          </h3>
          <div className="relative border-l border-legal-steel ml-4 md:ml-32">
            {highlights.map((hl, idx) => (
              <div key={idx} className="mb-10 ml-6 relative">
                {/* Bullet circle */}
                <div className="absolute -left-9 top-1 bg-legal-light w-6 h-6 rounded-full border-4 border-legal-darkest flex items-center justify-center">
                  <Calendar className="h-2.5 w-2.5 text-legal-darkest" />
                </div>
                <div className="md:absolute md:-left-[120px] md:top-1 text-sm font-bold font-serif text-legal-light">
                  {hl.year}
                </div>
                <div className="glass-card p-5 rounded-lg border border-legal-steel">
                  <p className="text-xs text-legal-ash leading-relaxed">{hl.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto space-y-6">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-legal-light">Need Legal Assistance?</h3>
          <p className="text-xs text-legal-ash leading-relaxed">
            Consult with Advocate Munzur Morshed in Dhaka. We will review your pleadings or documentation.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 rounded bg-legal-light text-legal-darkest font-bold hover:bg-white transition-all shadow-md"
          >
            Contact Chambers
          </Link>
        </div>
      </section>
    </div>
  );
}
