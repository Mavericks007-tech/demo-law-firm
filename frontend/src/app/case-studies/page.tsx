"use client";

import { useEffect, useState } from "react";
import { getCases } from "@/lib/api";
import { Gavel, Award, CheckCircle, ShieldAlert } from "lucide-react";

interface CaseStudy {
  id: number;
  title: string;
  client_industry: string;
  challenge: string;
  solution: string;
  outcome: string;
  created_at: string;
}

const MOCK_CASES: CaseStudy[] = [
  {
    id: 1,
    title: "Favorable Writ Judgment Against Arbitrary Tax Assessment",
    client_industry: "Manufacturing / Industrial Sector",
    challenge: "A leading industrial manufacturer faced an arbitrary and inflated tax assessment from the revenue authority, exceeding their actual liability by millions. Standard administrative appeals were stuck in procedural delays, threatening to freeze their operations.",
    solution: "Advocate Munzur Morshed filed a Writ Petition under Article 102 in the High Court Division, demonstrating a clear violation of natural justice and procedural rules. A stay order was secured on the recovery notice, followed by a final judgment directing the authority to reassess standard liabilities.",
    outcome: "The arbitrary tax demand was successfully quashed, saving the client over 12 million BDT and preventing disruption to manufacturing lines.",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Successful Restructuring & RJSC Dispute Resolution",
    client_industry: "Technology Services & FinTech",
    challenge: "Two co-founders of an expanding FinTech startup were locked in a board control dispute. Unauthorized share allocations had occurred, and filings at the RJSC were blocked due to active objections.",
    solution: "We initiated a company petition before the High Court Division under Section 233 of the Companies Act 1994 for protection against oppression and mismanagement. Concurrent mediation was conducted to negotiate a structured buyout of the minority stakeholder.",
    outcome: "The dispute was resolved within 6 months. The startup completed its seed investment round with clean company books, and the board restructured harmoniously.",
    created_at: new Date().toISOString()
  }
];

export default function CaseStudies() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const fetched = await getCases();
        if (fetched && fetched.length > 0) {
          setCases(fetched);
        } else {
          setCases(MOCK_CASES);
        }
      } catch (err) {
        console.warn("Failed to fetch cases from API, falling back to mock data:", err);
        setCases(MOCK_CASES);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="bg-legal-darkest min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-legal-dark to-legal-darkest border-b border-legal-steel/50 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/case studies.jpeg"
            alt="Case studies background image"
            fill
            className="object-cover object-center"
            quality={60}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-legal-slate font-semibold">Litigation Success</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-legal-light">Case Studies</h1>
          <p className="text-sm text-legal-ash max-w-2xl mx-auto leading-relaxed">
            A selection of representative disputes and advisory successes resolved in the High Court and arbitral tribunals.
          </p>
        </div>
      </section>

      {/* List Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-10 h-10 border-2 border-t-transparent border-legal-light rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-legal-slate mt-4">Loading case archives...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {cases.map((cs) => (
              <div
                key={cs.id}
                className="glass-card rounded-2xl p-8 border border-legal-steel shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:border-legal-ash/30 transition-all"
              >
                {/* Meta details */}
                <div className="lg:col-span-4 space-y-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-legal-steel text-legal-light border border-legal-slate/30">
                    {cs.client_industry}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-legal-light leading-tight">
                    {cs.title}
                  </h3>
                  <div className="h-0.5 w-12 bg-legal-light"></div>
                  <div className="flex items-center space-x-2 text-xs text-legal-slate">
                    <Gavel className="h-4 w-4" />
                    <span>Representative Judgment</span>
                  </div>
                </div>

                {/* Case summary */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Challenge */}
                  <div className="space-y-1">
                    <h4 className="text-xs uppercase tracking-widest text-legal-slate font-bold flex items-center space-x-2">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      <span>The Challenge</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-legal-ash leading-relaxed">
                      {cs.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-1">
                    <h4 className="text-xs uppercase tracking-widest text-legal-slate font-bold flex items-center space-x-2">
                      <Award className="h-3.5 w-3.5" />
                      <span>The Strategy</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-legal-ash leading-relaxed">
                      {cs.solution}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="p-4 rounded-xl bg-legal-dark/80 border border-legal-steel/60 space-y-1">
                    <h4 className="text-xs uppercase tracking-widest text-legal-light font-bold flex items-center space-x-2">
                      <CheckCircle className="h-3.5 w-3.5 text-legal-light" />
                      <span>Resolution Outcome</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-legal-light leading-relaxed italic">
                      {cs.outcome}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Confidentiality notice */}
      <section className="py-12 bg-legal-dark/20 text-center border-t border-legal-steel/20 px-4">
        <p className="text-xs text-legal-slate max-w-xl mx-auto leading-relaxed">
          *Note: To protect client confidentiality and comply with professional bar guidelines, corporate names are redacted, and specific case identifiers are summarized.
        </p>
      </section>
    </div>
  );
}
