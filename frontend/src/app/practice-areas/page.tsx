"use client";

import { useState } from "react";
import { Scale, Briefcase, FileText, Landmark, ShieldAlert, Gavel, X, ExternalLink } from "lucide-react";
import Link from "next/link";

interface PracticeArea {
  id: string;
  title: string;
  icon: any;
  shortDesc: string;
  longDesc: string;
  subFocus: string[];
  casesText: string;
}

export default function PracticeAreas() {
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);

  const practiceList: PracticeArea[] = [
    {
      id: "writ",
      title: "Writ & Constitutional Law",
      icon: Landmark,
      shortDesc: "Challenging arbitrary state actions, custom tax assessments, and administrative orders under Article 102.",
      longDesc: "Article 102 of the Constitution provides citizens and corporate bodies with powerful writs. We represent clients in petitions seeking remedies against government authorities, regulatory boards, and utilities who act outside their statutory bounds.",
      subFocus: [
        "Writ of Mandamus (compelling public duties)",
        "Writ of Certiorari (quashing unlawful state orders)",
        "Writ of Habeas Corpus (wrongful detention)",
        "Customs & VAT recovery suspension petitions"
      ],
      casesText: "Secured stay orders in the High Court for over 15 manufacturing clients against arbitrary energy tariffs and customs levies."
    },
    {
      id: "corporate",
      title: "Corporate & Commercial Law",
      icon: Briefcase,
      shortDesc: "Advising on RJSC compliance, drafting shareholder agreements, and structuring joint ventures.",
      longDesc: "We provide strategic legal advice for businesses operating in Bangladesh. This includes company incorporation, FDI registration with BIDA, restructuring, and drafting critical commercial agreements.",
      subFocus: [
        "Joint Venture & Shareholder Agreements",
        "RJSC filing updates and board restructure",
        "Foreign Direct Investment (FDI) & BIDA liaison",
        "Corporate due diligence audits"
      ],
      casesText: "Successfully structured a joint venture shareholder structure for a major local fintech startup with a Singaporean investor syndicate."
    },
    {
      id: "arbitration",
      title: "Dispute Resolution & ADR",
      icon: Gavel,
      shortDesc: "Managing commercial arbitration under the Arbitration Act 2001 to resolve contractual deadlocks.",
      longDesc: "Chambers represents corporate interests in formal arbitral tribunals, providing mediation and dispute management to avoid prolonged traditional litigation.",
      subFocus: [
        "Commercial contract arbitration",
        "Enforcement of foreign arbitral awards",
        "Construction & supply contract disputes",
        "Pre-litigation dispute mediation"
      ],
      casesText: "Enforced a multi-million BDT foreign arbitral award in Dhaka District Court for an international logistics provider."
    },
    {
      id: "property",
      title: "Real Estate & Land Title Law",
      icon: FileText,
      shortDesc: "Conducting deed registration audits, mutation vetting, and resolving property inheritance litigation.",
      longDesc: "Real estate transactions in Bangladesh require thorough historical vetting. We review land registry books, verify mutation records, and litigate title disputes in civil courts.",
      subFocus: [
        "Title deed vetting & chains of custody verification",
        "Mutation & land revenue audits",
        "Civil partition suits & inheritance claims",
        "Lease and purchase contract drafting"
      ],
      casesText: "Vetted mutation and registration titles for a 3-acre commercial development project in Gulshan, mitigating fraud risks."
    },
    {
      id: "ip",
      title: "Intellectual Property Protection",
      icon: Scale,
      shortDesc: "Trademark registration, patent enforcement, copyright protection, and licensing agreements.",
      longDesc: "We assist businesses in registering their brands and technical assets in Bangladesh. We also litigate infringement claims and draft technology transfer licensing agreements.",
      subFocus: [
        "Trademark & Brand search and registration",
        "Copyright filings for software and creative assets",
        "Patent search and application advisory",
        "IP infringement litigation and cease-and-desist filings"
      ],
      casesText: "Defended a local tech company's core software IP from copyright infringement by an ex-employee."
    },
    {
      id: "litigation",
      title: "Civil & Criminal Litigation",
      icon: ShieldAlert,
      shortDesc: "Defending corporate and private interests in commercial fraud, NI Act checks, and contractual breaches.",
      longDesc: "We represent clients in trial and appellate courts for complex civil suits and white-collar defense matters, ensuring rigorous legal protection.",
      subFocus: [
        "Negotiable Instruments Act (Section 138 check disputes)",
        "Commercial fraud & white-collar criminal defense",
        "Specific performance of contract claims",
        "Money suit recovery litigation"
      ],
      casesText: "Successfully recovered outstanding debts through NI Act check dishonor litigation for a national distributor."
    }
  ];

  return (
    <div className="bg-legal-darkest min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-legal-dark to-legal-darkest border-b border-legal-steel/50 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-legal-slate font-semibold">Chambers Services</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-legal-light">Areas of Practice</h1>
          <p className="text-sm text-legal-ash max-w-2xl mx-auto leading-relaxed">
            Providing authoritative legal advocacy across specialized corporate and litigation areas. Click on any area below for detailed information.
          </p>
        </div>
      </section>

      {/* Practice Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceList.map((area) => {
            const IconComp = area.icon;
            return (
              <div
                key={area.id}
                onClick={() => setSelectedArea(area)}
                className="glass-card rounded-xl p-8 border border-legal-steel cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-legal-steel/80 border border-legal-slate/30 rounded-lg w-fit group-hover:border-legal-ash/50 transition-colors">
                    <IconComp className="h-6 w-6 text-legal-light" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-legal-light group-hover:text-white transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-xs text-legal-ash leading-relaxed">
                    {area.shortDesc}
                  </p>
                </div>
                <div className="pt-6 flex items-center space-x-2 text-xs font-bold text-legal-light group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Details Modal */}
      {selectedArea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-legal-darkest/80 backdrop-blur-md animate-fade-in">
          <div className="bg-legal-dark border border-legal-steel w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative animate-scale-up">
            
            {/* Modal Header */}
            <div className="bg-legal-darkest border-b border-legal-steel/60 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-legal-steel rounded-lg">
                  <selectedArea.icon className="h-5 w-5 text-legal-light" />
                </div>
                <h3 className="font-serif text-lg font-bold text-legal-light">{selectedArea.title}</h3>
              </div>
              <button
                onClick={() => setSelectedArea(null)}
                className="text-legal-ash hover:text-legal-light p-1.5 rounded-lg hover:bg-legal-steel/40 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-widest text-legal-slate font-bold">Scope of Service</h4>
                <p className="text-sm text-legal-ash leading-relaxed">{selectedArea.longDesc}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-legal-slate font-bold">Key Sub-Focus Areas</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedArea.subFocus.map((focus, i) => (
                    <li key={i} className="flex items-center space-x-2 text-xs text-legal-ash">
                      <span className="w-1.5 h-1.5 bg-legal-light rounded-full flex-shrink-0"></span>
                      <span>{focus}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-legal-darkest/60 border border-legal-steel/80 rounded-xl space-y-1">
                <h4 className="text-xs uppercase tracking-widest text-legal-light/70 font-bold">Representative Matters</h4>
                <p className="text-xs text-legal-ash italic leading-relaxed">"{selectedArea.casesText}"</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-legal-darkest border-t border-legal-steel/60 p-4 flex items-center justify-between">
              <span className="text-[10px] text-legal-slate">Chambers Confidentiality Guaranteed</span>
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedArea(null)}
                  className="px-4 py-2 text-xs font-semibold text-legal-ash hover:text-legal-light transition-colors"
                >
                  Close
                </button>
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded bg-legal-light text-legal-darkest text-xs font-bold hover:bg-white transition-colors"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
