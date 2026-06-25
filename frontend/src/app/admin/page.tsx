"use client";

import { useState, useEffect } from "react";
import {
  verifyAdminPassword,
  getContactSubmissions,
  markContactAsRead,
  getAppointments,
  updateAppointmentStatus,
  createBlogPost,
  deleteBlogPost,
  createCaseStudy,
  deleteCaseStudy,
  getBlogs,
  getCases,
} from "@/lib/api";
import { Lock, FileText, Calendar, Mail, BookOpen, Trash2, Check, X, ShieldAlert, Plus, Loader } from "lucide-react";

export default function AdminPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"appointments" | "inquiries" | "blogs" | "cases">("appointments");

  // Content state
  const [appointments, setAppointments] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [cases, setCases] = useState<any[]>([]);
  const [contentLoading, setContentLoading] = useState(false);

  // New Blog form state
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogSlug, setNewBlogSlug] = useState("");
  const [newBlogSummary, setNewBlogSummary] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");
  const [newBlogCategory, setNewBlogCategory] = useState("Corporate Law");
  const [newBlogReadTime, setNewBlogReadTime] = useState("5 min read");
  const [blogSuccess, setBlogSuccess] = useState("");

  // New Case form state
  const [newCaseTitle, setNewCaseTitle] = useState("");
  const [newCaseIndustry, setNewCaseIndustry] = useState("");
  const [newCaseChallenge, setNewCaseChallenge] = useState("");
  const [newCaseSolution, setNewCaseSolution] = useState("");
  const [newCaseOutcome, setNewCaseOutcome] = useState("");
  const [caseSuccess, setCaseSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const data = await verifyAdminPassword(password);
      if (data && data.token) {
        setToken(data.token);
        setIsLoggedIn(true);
        sessionStorage.setItem("admin_token", data.token);
      }
    } catch (err: any) {
      console.warn("API Auth failed, checking local fallback (MorshedAdmin2026)...", err);
      // Hardcoded fallback logic if API backend is not active
      if (password === "MorshedAdmin2026") {
        const fallbackToken = "morshed-secure-session-token-2026";
        setToken(fallbackToken);
        setIsLoggedIn(true);
        sessionStorage.setItem("admin_token", fallbackToken);
      } else {
        setAuthError(err.message || "Incorrect passcode.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    // Check if token exists in session
    const savedToken = sessionStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadDashboardData();
    }
  }, [isLoggedIn]);

  const loadDashboardData = async () => {
    setContentLoading(true);
    try {
      const [apptList, inqList, blogList, caseList] = await Promise.all([
        getAppointments(token).catch(() => []),
        getContactSubmissions(token).catch(() => []),
        getBlogs().catch(() => []),
        getCases().catch(() => []),
      ]);

      setAppointments(apptList);
      setInquiries(inqList);
      setBlogs(blogList);
      setCases(caseList);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setContentLoading(false);
    }
  };

  const handleApptStatus = async (id: number, status: string) => {
    try {
      await updateAppointmentStatus(id, status, token);
      loadDashboardData();
    } catch (err) {
      alert("Failed to update status: " + err);
    }
  };

  const handleInquiryRead = async (id: number) => {
    try {
      await markContactAsRead(id, token);
      loadDashboardData();
    } catch (err) {
      alert("Failed to mark as read: " + err);
    }
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogSuccess("");
    try {
      await createBlogPost(
        {
          title: newBlogTitle,
          slug: newBlogSlug,
          summary: newBlogSummary,
          content: newBlogContent,
          category: newBlogCategory,
          read_time: newBlogReadTime,
        },
        token
      );
      setBlogSuccess("Blog post published successfully!");
      setNewBlogTitle("");
      setNewBlogSlug("");
      setNewBlogSummary("");
      setNewBlogContent("");
      loadDashboardData();
    } catch (err: any) {
      alert("Failed to publish blog post: " + err.message);
    }
  };

  const handleDeleteBlog = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await deleteBlogPost(id, token);
      loadDashboardData();
    } catch (err) {
      alert("Failed to delete blog post: " + err);
    }
  };

  const handleAddCase = async (e: React.FormEvent) => {
    e.preventDefault();
    setCaseSuccess("");
    try {
      await createCaseStudy(
        {
          title: newCaseTitle,
          client_industry: newCaseIndustry,
          challenge: newCaseChallenge,
          solution: newCaseSolution,
          outcome: newCaseOutcome,
        },
        token
      );
      setCaseSuccess("Case study created successfully!");
      setNewCaseTitle("");
      setNewCaseIndustry("");
      setNewCaseChallenge("");
      setNewCaseSolution("");
      setNewCaseOutcome("");
      loadDashboardData();
    } catch (err: any) {
      alert("Failed to create case study: " + err.message);
    }
  };

  const handleDeleteCase = async (id: number) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    try {
      await deleteCaseStudy(id, token);
      loadDashboardData();
    } catch (err) {
      alert("Failed to delete case study: " + err);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setToken("");
    setIsLoggedIn(false);
  };

  // If not logged in, render passcode gate
  if (!isLoggedIn) {
    return (
      <div className="bg-legal-darkest min-h-[90vh] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-legal-steel shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-legal-steel rounded-full flex items-center justify-center mx-auto border border-legal-slate/30">
              <Lock className="h-5 w-5 text-legal-light" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-legal-light">Chambers Admin Gate</h2>
            <p className="text-xs text-legal-slate">
              Enter passcode to manage inquiries, blog publications, and case records.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 bg-red-900/20 border border-red-800/40 text-red-400 text-xs rounded">
                {authError}
              </div>
            )}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-legal-slate block">Passcode</label>
              <input
                type="password"
                required
                value={password}
                placeholder="default: MorshedAdmin2026"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2.5 text-xs text-legal-light focus:outline-none focus:border-legal-ash transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 bg-legal-light text-legal-darkest font-bold rounded text-xs hover:bg-white transition-colors flex items-center justify-center space-x-2"
            >
              {authLoading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Authorizing...</span>
                </>
              ) : (
                <span>Access Dashboard</span>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-legal-darkest min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-legal-steel pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-legal-slate font-bold">Supreme Court Portal</span>
            <h1 className="font-serif text-3xl font-bold text-legal-light">Chambers Admin Panel</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-legal-steel hover:bg-legal-steel/30 rounded text-xs text-legal-ash hover:text-legal-light transition-all"
          >
            Log Out Portal
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-legal-steel/40 gap-1 overflow-x-auto pb-px">
          {[
            { id: "appointments", label: "Appointments", icon: Calendar },
            { id: "inquiries", label: "General Inquiries", icon: Mail },
            { id: "blogs", label: "Chambers Blog", icon: BookOpen },
            { id: "cases", label: "Case Studies", icon: FileText },
          ].map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-6 text-xs font-semibold border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-legal-light text-legal-light bg-legal-dark/30"
                    : "border-transparent text-legal-slate hover:text-legal-ash"
                }`}
              >
                <IconComp className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="min-h-[50vh]">
          {contentLoading ? (
            <div className="text-center py-20">
              <Loader className="w-10 h-10 border-2 border-t-transparent border-legal-light rounded-full animate-spin mx-auto text-legal-light" />
              <p className="text-xs text-legal-slate mt-4">Syncing database changes...</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Tab 1: APPOINTMENTS */}
              {activeTab === "appointments" && (
                <div className="space-y-4">
                  <h2 className="font-serif text-xl font-bold text-legal-light">Consultation Schedule</h2>
                  <div className="overflow-x-auto rounded-xl border border-legal-steel bg-legal-dark/40 shadow-xl">
                    <table className="min-w-full text-left border-collapse text-xs text-legal-ash">
                      <thead className="bg-legal-darkest border-b border-legal-steel/80 text-legal-slate font-bold uppercase tracking-wider">
                        <tr>
                          <th className="p-4">Client</th>
                          <th className="p-4">Contact</th>
                          <th className="p-4">Date / Slot</th>
                          <th className="p-4">Description</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-legal-steel/40">
                        {appointments.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-legal-slate">
                              No appointment bookings found.
                            </td>
                          </tr>
                        ) : (
                          appointments.map((appt) => (
                            <tr key={appt.id} className="hover:bg-legal-steel/10 transition-colors">
                              <td className="p-4 font-bold text-legal-light">{appt.client_name}</td>
                              <td className="p-4">
                                <div>{appt.email}</div>
                                <div className="text-[10px] text-legal-slate mt-0.5">{appt.phone}</div>
                              </td>
                              <td className="p-4 font-semibold">
                                <div>{appt.date}</div>
                                <div className="text-[10px] text-legal-slate mt-0.5">{appt.time_slot}</div>
                              </td>
                              <td className="p-4 max-w-xs truncate" title={appt.details}>{appt.details || "-"}</td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                  appt.status === "confirmed"
                                    ? "bg-green-950/40 text-green-400 border border-green-800/40"
                                    : appt.status === "cancelled"
                                    ? "bg-red-950/40 text-red-400 border border-red-800/40"
                                    : "bg-amber-950/40 text-amber-400 border border-amber-800/40"
                                }`}>
                                  {appt.status}
                                </span>
                              </td>
                              <td className="p-4 text-right space-x-2">
                                {appt.status === "pending" && (
                                  <>
                                    <button
                                      onClick={() => handleApptStatus(appt.id, "confirmed")}
                                      className="p-1 rounded bg-green-950/40 text-green-400 hover:bg-green-900 border border-green-800/50 transition-colors"
                                      title="Confirm Appointment"
                                    >
                                      <Check className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => handleApptStatus(appt.id, "cancelled")}
                                      className="p-1 rounded bg-red-950/40 text-red-400 hover:bg-red-900 border border-red-800/50 transition-colors"
                                      title="Cancel Appointment"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  </>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 2: GENERAL INQUIRIES */}
              {activeTab === "inquiries" && (
                <div className="space-y-4">
                  <h2 className="font-serif text-xl font-bold text-legal-light">Client Messages</h2>
                  <div className="overflow-x-auto rounded-xl border border-legal-steel bg-legal-dark/40 shadow-xl">
                    <table className="min-w-full text-left border-collapse text-xs text-legal-ash">
                      <thead className="bg-legal-darkest border-b border-legal-steel/80 text-legal-slate font-bold uppercase tracking-wider">
                        <tr>
                          <th className="p-4">Sender</th>
                          <th className="p-4">Subject</th>
                          <th className="p-4">Message</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-legal-steel/40">
                        {inquiries.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-legal-slate">
                              No submissions found.
                            </td>
                          </tr>
                        ) : (
                          inquiries.map((inq) => (
                            <tr key={inq.id} className="hover:bg-legal-steel/10 transition-colors">
                              <td className="p-4 font-bold text-legal-light">
                                <div>{inq.name}</div>
                                <div className="text-[10px] text-legal-slate mt-0.5">{inq.email}</div>
                              </td>
                              <td className="p-4 font-semibold">{inq.subject}</td>
                              <td className="p-4 max-w-sm whitespace-pre-wrap">{inq.message}</td>
                              <td className="p-4 text-[10px] text-legal-slate">
                                {new Date(inq.created_at).toLocaleDateString()}
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                  inq.status === "unread"
                                    ? "bg-amber-950/40 text-amber-400 border border-amber-800/40"
                                    : "bg-legal-steel text-legal-light border border-legal-slate/30"
                                }`}>
                                  {inq.status}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                {inq.status === "unread" && (
                                  <button
                                    onClick={() => handleInquiryRead(inq.id)}
                                    className="p-1 rounded bg-legal-steel text-legal-light hover:bg-legal-slate border border-legal-slate/30 transition-colors"
                                    title="Mark as Read"
                                  >
                                    <Check className="h-4 w-4" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 3: CHAMBERS BLOGS */}
              {activeTab === "blogs" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* List */}
                  <div className="lg:col-span-7 space-y-4">
                    <h2 className="font-serif text-xl font-bold text-legal-light">Published Insights</h2>
                    <div className="space-y-3">
                      {blogs.map((b) => (
                        <div
                          key={b.id}
                          className="glass-card p-4 rounded-xl border border-legal-steel flex items-center justify-between"
                        >
                          <div>
                            <span className="text-[9px] font-bold uppercase text-legal-slate px-2 py-0.5 rounded bg-legal-steel border border-legal-slate/30">
                              {b.category}
                            </span>
                            <h4 className="font-serif text-sm font-semibold text-legal-light mt-2">{b.title}</h4>
                            <p className="text-[10px] text-legal-slate mt-1">{b.read_time} • {b.slug}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteBlog(b.id)}
                            className="p-2 text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-900/30 rounded-lg transition-colors flex-shrink-0 ml-4"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form */}
                  <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-legal-steel">
                    <h3 className="font-serif text-lg font-bold text-legal-light mb-4 flex items-center space-x-2">
                      <Plus className="h-5 w-5" />
                      <span>Compose Insight</span>
                    </h3>

                    {blogSuccess && (
                      <div className="p-3 bg-green-900/20 border border-green-800/40 text-green-400 text-xs rounded mb-4">
                        {blogSuccess}
                      </div>
                    )}

                    <form onSubmit={handleAddBlog} className="space-y-4 text-xs">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-legal-slate">Article Title</label>
                        <input
                          type="text"
                          required
                          value={newBlogTitle}
                          onChange={(e) => {
                            setNewBlogTitle(e.target.value);
                            setNewBlogSlug(
                              e.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/(^-|-$)+/g, "")
                            );
                          }}
                          className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-legal-light focus:outline-none focus:border-legal-ash"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-legal-slate">SEO URL Slug</label>
                        <input
                          type="text"
                          required
                          value={newBlogSlug}
                          onChange={(e) => setNewBlogSlug(e.target.value)}
                          className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-legal-light focus:outline-none focus:border-legal-ash"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-legal-slate">Summary Description</label>
                        <input
                          type="text"
                          required
                          value={newBlogSummary}
                          onChange={(e) => setNewBlogSummary(e.target.value)}
                          className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-legal-light focus:outline-none focus:border-legal-ash"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-legal-slate">Category</label>
                          <select
                            value={newBlogCategory}
                            onChange={(e) => setNewBlogCategory(e.target.value)}
                            className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-legal-light focus:outline-none"
                          >
                            <option>Corporate Law</option>
                            <option>Constitutional Law</option>
                            <option>Dispute Resolution</option>
                            <option>Real Estate Law</option>
                            <option>Family Trust</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-legal-slate">Read Time</label>
                          <input
                            type="text"
                            required
                            value={newBlogReadTime}
                            onChange={(e) => setNewBlogReadTime(e.target.value)}
                            className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-legal-light focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-legal-slate">Article Body Content (HTML Allowed)</label>
                        <textarea
                          rows={6}
                          required
                          value={newBlogContent}
                          onChange={(e) => setNewBlogContent(e.target.value)}
                          placeholder="e.g. <p>Content here...</p>"
                          className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-legal-light focus:outline-none resize-none font-mono text-[10px]"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-legal-light text-legal-darkest font-bold rounded text-xs hover:bg-white transition-colors"
                      >
                        Publish Insight Article
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Tab 4: CASE STUDIES */}
              {activeTab === "cases" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* List */}
                  <div className="lg:col-span-7 space-y-4">
                    <h2 className="font-serif text-xl font-bold text-legal-light">Litigation Cases</h2>
                    <div className="space-y-3">
                      {cases.map((c) => (
                        <div
                          key={c.id}
                          className="glass-card p-4 rounded-xl border border-legal-steel flex items-center justify-between"
                        >
                          <div>
                            <span className="text-[9px] font-bold uppercase text-legal-slate px-2 py-0.5 rounded bg-legal-steel border border-legal-slate/30">
                              {c.client_industry}
                            </span>
                            <h4 className="font-serif text-sm font-semibold text-legal-light mt-2">{c.title}</h4>
                          </div>
                          <button
                            onClick={() => handleDeleteCase(c.id)}
                            className="p-2 text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-900/30 rounded-lg transition-colors flex-shrink-0 ml-4"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form */}
                  <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-legal-steel">
                    <h3 className="font-serif text-lg font-bold text-legal-light mb-4 flex items-center space-x-2">
                      <Plus className="h-5 w-5" />
                      <span>Record Case Study</span>
                    </h3>

                    {caseSuccess && (
                      <div className="p-3 bg-green-900/20 border border-green-800/40 text-green-400 text-xs rounded mb-4">
                        {caseSuccess}
                      </div>
                    )}

                    <form onSubmit={handleAddCase} className="space-y-4 text-xs">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-legal-slate">Case Title</label>
                        <input
                          type="text"
                          required
                          value={newCaseTitle}
                          onChange={(e) => setNewCaseTitle(e.target.value)}
                          className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-legal-light focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-legal-slate">Client Sector / Industry</label>
                        <input
                          type="text"
                          required
                          value={newCaseIndustry}
                          placeholder="e.g. Technology, Manufacturing"
                          onChange={(e) => setNewCaseIndustry(e.target.value)}
                          className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-legal-light focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-legal-slate">The Challenge</label>
                        <textarea
                          rows={3}
                          required
                          value={newCaseChallenge}
                          onChange={(e) => setNewCaseChallenge(e.target.value)}
                          className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-legal-light focus:outline-none resize-none"
                        ></textarea>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-legal-slate">Chambers Strategy</label>
                        <textarea
                          rows={3}
                          required
                          value={newCaseSolution}
                          onChange={(e) => setNewCaseSolution(e.target.value)}
                          className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-legal-light focus:outline-none resize-none"
                        ></textarea>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-legal-slate">Outcome / Resolution</label>
                        <textarea
                          rows={3}
                          required
                          value={newCaseOutcome}
                          onChange={(e) => setNewCaseOutcome(e.target.value)}
                          className="w-full bg-legal-darkest border border-legal-steel rounded px-3 py-2 text-legal-light focus:outline-none resize-none"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-legal-light text-legal-darkest font-bold rounded text-xs hover:bg-white transition-colors"
                      >
                        Publish Case Record
                      </button>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
