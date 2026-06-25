"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBlogs } from "@/lib/api";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  read_time: string;
  status: string;
  created_at: string;
}

const MOCK_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Understanding Corporate Compliance under the Companies Act 1994",
    slug: "understanding-corporate-compliance-companies-act-1994",
    summary: "A comprehensive guide to annual filings, share transfer procedures, and director compliance obligations for corporate entities operating in Bangladesh.",
    content: "",
    category: "Corporate Law",
    read_time: "5 min read",
    status: "published",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    title: "Writ Jurisdiction: Seeking Remedies from the High Court Division",
    slug: "writ-jurisdiction-high-court-division-remedies",
    summary: "An analysis of the types of writs available under Article 102 of the Constitution of Bangladesh and when citizens can file them for administrative violations.",
    content: "",
    category: "Constitutional Law",
    read_time: "7 min read",
    status: "published",
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    title: "Navigating Commercial Arbitration and Dispute Resolution in Dhaka",
    slug: "commercial-arbitration-dispute-resolution-dhaka",
    summary: "How the Arbitration Act 2001 operates, from drafting enforceable arbitration clauses to executing local and foreign arbitral awards.",
    content: "",
    category: "Dispute Resolution",
    read_time: "6 min read",
    status: "published",
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const fetched = await getBlogs();
        if (fetched && fetched.length > 0) {
          setPosts(fetched);
        } else {
          setPosts(MOCK_POSTS);
        }
      } catch (err) {
        console.warn("Failed to fetch blogs from API, falling back to mock:", err);
        setPosts(MOCK_POSTS);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="bg-legal-darkest min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-legal-dark to-legal-darkest border-b border-legal-steel/50 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-legal-slate font-semibold font-sans">Legal Insights</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-legal-light">Chambers Blog</h1>
          <p className="text-sm text-legal-ash max-w-2xl mx-auto leading-relaxed">
            Analytical insights on corporate laws, regulatory compliance, writ jurisdictions, and commercial codes in Bangladesh.
          </p>
        </div>
      </section>

      {/* Grid List */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-10 h-10 border-2 border-t-transparent border-legal-light rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-legal-slate mt-4">Loading insights...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="glass-card rounded-xl p-6 border border-legal-steel flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Category and Read time */}
                  <div className="flex items-center justify-between text-[10px] text-legal-slate font-bold uppercase tracking-wider">
                    <span className="px-2.5 py-0.5 rounded-full bg-legal-steel text-legal-light border border-legal-slate/30">
                      {post.category}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.read_time}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-legal-light leading-snug">
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-legal-ash leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                {/* Footer details */}
                <div className="pt-6 border-t border-legal-steel/30 mt-6 flex items-center justify-between text-xs text-legal-slate">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center space-x-1 font-semibold text-legal-light hover:text-white transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
