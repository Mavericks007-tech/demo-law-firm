import Link from "next/link";
import { Scale, Mail, MapPin, Phone, ShieldAlert } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const practiceAreas = [
    { name: "Corporate & Commercial Law", href: "/practice-areas" },
    { name: "Writ & Constitutional Law", href: "/practice-areas" },
    { name: "Civil & Criminal Litigation", href: "/practice-areas" },
    { name: "Real Estate & Property Disputes", href: "/practice-areas" },
    { name: "Intellectual Property & Licensing", href: "/practice-areas" },
  ];

  const quickLinks = [
    { name: "About Advocate Morshed", href: "/about" },
    { name: "Our Case Successes", href: "/case-studies" },
    { name: "Legal Insights / Blog", href: "/blog" },
    { name: "Book Consultation", href: "/contact" },
    { name: "Admin Portal", href: "/admin" },
  ];

  return (
    <footer className="bg-legal-darkest border-t border-legal-steel/60 pt-16 pb-8 text-legal-ash">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Bio Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-legal-steel border border-legal-slate/30">
                <Scale className="h-5 w-5 text-legal-light" />
              </div>
              <span className="font-serif text-lg font-bold tracking-wide text-legal-light">
                ADV. MUNZUR MORSHED
              </span>
            </div>
            <p className="text-sm text-legal-slate leading-relaxed">
              Providing rigorous, authoritative legal representation and strategic counsel. Committed to protecting client interests in corporate advisory, writ jurisdictions, and commercial litigation.
            </p>
            <div className="pt-2 text-xs text-legal-slate flex items-start space-x-2">
              <ShieldAlert className="h-4 w-4 text-legal-slate flex-shrink-0 mt-0.5" />
              <span>
                <strong>Disclaimer:</strong> The materials on this website are for informational purposes only and do not constitute formal legal advice.
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-legal-light uppercase mb-6">
              Law Chambers
            </h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-legal-light transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas Column */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-legal-light uppercase mb-6">
              Practice Focus
            </h4>
            <ul className="space-y-3 text-sm">
              {practiceAreas.map((area) => (
                <li key={area.name}>
                  <Link href={area.href} className="hover:text-legal-light transition-colors">
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-legal-light uppercase mb-6">
              Contact & Chambers
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-legal-light flex-shrink-0 mt-0.5" />
                <span>
                  Chambers: House 45, Road 11, Banani C/A, Dhaka 1213, Bangladesh
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-legal-light flex-shrink-0" />
                <span className="hover:text-legal-light transition-colors">
                  +880 1711 000 000
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-legal-light flex-shrink-0" />
                <a href="mailto:info@morshedlaw.com" className="hover:text-legal-light transition-colors">
                  info@morshedlaw.com
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-legal-steel text-legal-light border border-legal-slate/30">
                Chambers Hours: Sun - Thu, 9 AM - 8 PM
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-legal-steel/40 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-legal-slate">
          <p>© {currentYear} Advocate Munzur Morshed. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="hover:text-legal-light transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-legal-light transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="hover:text-legal-light transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
