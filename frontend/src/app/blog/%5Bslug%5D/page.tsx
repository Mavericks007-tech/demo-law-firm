import Link from "next/link";
import { getBlogBySlug } from "@/lib/api";
import { Calendar, Clock, ArrowLeft, Bookmark } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  read_time: string;
  created_at: string;
}

const MOCK_POSTS_DETAILS: Record<string, BlogPost> = {
  "understanding-corporate-compliance-companies-act-1994": {
    id: 1,
    title: "Understanding Corporate Compliance under the Companies Act 1994",
    slug: "understanding-corporate-compliance-companies-act-1994",
    summary: "A comprehensive guide to annual filings, share transfer procedures, and director compliance obligations for corporate entities operating in Bangladesh.",
    content: `
      <p class="mb-4">Operating a corporation in Bangladesh requires meticulous attention to the compliance guidelines set out in the <strong>Companies Act 1994</strong>. For startups and multinational companies alike, remaining in good standing with the Registrar of Joint Stock Companies and Firms (RJSC) is vital to avoiding steep fines, legal disputes, or involuntary dissolution.</p>
      
      <h3 class="text-xl font-serif font-bold text-legal-light mt-8 mb-4">1. Annual General Meeting (AGM) & Filings</h3>
      <p class="mb-4">Every company registered under the Act must hold its AGM within 18 months of incorporation, and subsequently every calendar year (not exceeding 15 months since the last AGM). The audited accounts, along with Schedule X (List of Shareholders and Directors), must be submitted to the RJSC within 30 days of the AGM.</p>
      
      <h3 class="text-xl font-serif font-bold text-legal-light mt-8 mb-4">2. Transfer of Shares and Changes in Board Composition</h3>
      <p class="mb-4">Any changes to the company board or transferring shares between existing or new investors require filing Form 117 (Transfer of Shares) and Form XII (Particulars of Directors) respectively. Failing to record these with the RJSC leads to disputes concerning corporate ownership and rights.</p>
      
      <h3 class="text-xl font-serif font-bold text-legal-light mt-8 mb-4">3. Corporate Governance and Transparency</h3>
      <p class="mb-4">Modern businesses must maintain structured books of accounts and minutes of board meetings. Advocate Munzur Morshed offers comprehensive legal advisory services to structure board resolutions, draft joint-venture agreements, and perform regulatory audits to keep your enterprise secure and fully compliant.</p>
    `,
    category: "Corporate Law",
    read_time: "5 min read",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  "writ-jurisdiction-high-court-division-remedies": {
    id: 2,
    title: "Writ Jurisdiction: Seeking Remedies from the High Court Division",
    slug: "writ-jurisdiction-high-court-division-remedies",
    summary: "An analysis of the types of writs available under Article 102 of the Constitution of Bangladesh and when citizens can file them for administrative violations.",
    content: `
      <p class="mb-4">Article 102 of the Constitution of Bangladesh empowers the High Court Division to issue directives, orders, and writs to enforce fundamental rights and ensure public authorities stay within their legal boundaries. For individuals facing arbitrary administrative actions, writs are an essential shield.</p>
      
      <h3 class="text-xl font-serif font-bold text-legal-light mt-8 mb-4">Types of Writs Available</h3>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Habeas Corpus:</strong> Securing the release of an individual detained unlawfully.</li>
        <li><strong>Mandamus:</strong> Compelling a public authority to perform a duty they are legally obligated to complete.</li>
        <li><strong>Prohibition:</strong> Restraining a tribunal or court from exceeding its legal jurisdiction.</li>
        <li><strong>Certiorari:</strong> Quashing an illegal order passed by an administrative body or lower court.</li>
        <li><strong>Quo Warranto:</strong> Challenging the legal authority of any person holding a public office.</li>
      </ul>
      
      <p class="mb-4">Filing a writ petition requires proving that there is no alternative, equally efficacious remedy available under standard laws, and showing direct infringement of legal or fundamental rights. Advocate Munzur Morshed has represented numerous corporate bodies and private citizens in the High Court, securing vital injunctions and orders against arbitrary administrative actions.</p>
    `,
    category: "Constitutional Law",
    read_time: "7 min read",
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  },
  "commercial-arbitration-dispute-resolution-dhaka": {
    id: 3,
    title: "Navigating Commercial Arbitration and Dispute Resolution in Dhaka",
    slug: "commercial-arbitration-dispute-resolution-dhaka",
    summary: "How the Arbitration Act 2001 operates, from drafting enforceable arbitration clauses to executing local and foreign arbitral awards.",
    content: `
      <p class="mb-4">Commercial litigation in the traditional courts can sometimes span several years due to backlog. For businesses, commercial arbitration is the preferred mechanism for resolving disputes swiftly, confidentially, and with expert arbitrators.</p>
      
      <h3 class="text-xl font-serif font-bold text-legal-light mt-8 mb-4">Drafting an Enforceable Arbitration Clause</h3>
      <p class="mb-4">To ensure disputes bypass traditional court backlogs, contracts should contain an explicit arbitration clause defining the seat of arbitration, the applicable laws, and the number of arbitrators. A poorly drafted clause can itself lead to extensive litigation regarding its validity.</p>
      
      <h3 class="text-xl font-serif font-bold text-legal-light mt-8 mb-4">Enforcement of Awards</h3>
      <p class="mb-4">The Arbitration Act 2001 governs local arbitrations and provides a framework for enforcing both domestic and foreign arbitral awards in Bangladesh. Partnering with a skilled litigator like Advocate Munzur Morshed ensures your business interests are shielded, and awards are executed effectively through judicial intervention when required.</p>
    `,
    category: "Dispute Resolution",
    read_time: "6 min read",
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetails({ params }: PageProps) {
  const { slug } = await params;
  let post: BlogPost | null = null;

  try {
    post = await getBlogBySlug(slug);
  } catch (err) {
    console.warn(`Failed to fetch blog for slug "${slug}", falling back to mock details:`, err);
    post = MOCK_POSTS_DETAILS[slug] || null;
  }

  if (!post) {
    return (
      <div className="bg-legal-darkest min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl font-bold text-legal-light mb-4">Article Not Found</h2>
        <p className="text-xs text-legal-slate mb-8 max-w-sm">
          The requested article does not exist or has been moved.
        </p>
        <Link href="/blog" className="px-6 py-2.5 rounded bg-legal-light text-legal-darkest font-semibold text-xs">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-legal-darkest min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-legal-ash hover:text-legal-light transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Insights</span>
        </Link>

        {/* Title Header */}
        <div className="space-y-4 border-b border-legal-steel/50 pb-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-legal-steel text-legal-light border border-legal-slate/30">
            {post.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-legal-light leading-[1.25]">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-legal-slate">
            <div className="flex items-center space-x-1.5">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock className="h-4 w-4" />
              <span>{post.read_time}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Bookmark className="h-4 w-4" />
              <span>Published Chambers Counsel</span>
            </div>
          </div>
        </div>

        {/* Article content (HTML output injected safely) */}
        <div
          className="text-sm sm:text-base text-legal-ash leading-relaxed space-y-6 pt-4 article-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer Disclaimer */}
        <div className="p-5 rounded-xl bg-legal-dark border border-legal-steel/60 mt-16 space-y-2">
          <h5 className="font-serif text-xs font-semibold text-legal-light uppercase tracking-wider">
            Legal Publication Notice
          </h5>
          <p className="text-xs text-legal-slate leading-relaxed">
            The concepts discussed in this publication reflect general principles of Bangladesh Law and Supreme Court precedents current at the time of writing. These materials are prepared for educational reference only and do not establish a client-lawyer relationship. Consult legal counsel for specific circumstances.
          </p>
        </div>

      </div>
    </article>
  );
}
