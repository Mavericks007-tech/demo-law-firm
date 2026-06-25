import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Advocate Munzur Morshed | Supreme Court of Bangladesh | Law Chambers",
  description:
    "Chambers of Advocate Munzur Morshed. Expert legal representation in Writ Jurisdictions, Constitutional Matters, Corporate Compliance, Commercial Litigation, and Dispute Resolution in Dhaka.",
  keywords: [
    "Advocate Munzur Morshed",
    "Supreme Court of Bangladesh",
    "Writ Lawyer Dhaka",
    "Corporate Law Chambers Bangladesh",
    "High Court Division Lawyer",
    "Dhaka Law Firm",
  ],
  authors: [{ name: "Advocate Munzur Morshed" }],
  openGraph: {
    title: "Advocate Munzur Morshed | Supreme Court of Bangladesh",
    description:
      "Expert legal counsel and corporate representation in Writ Jurisdictions, Constitutional law, and Commercial disputes.",
    url: "https://morshedlaw.com",
    siteName: "Chambers of Advocate Munzur Morshed",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema Markup JSON-LD for rich legal results
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Chambers of Advocate Munzur Morshed",
    "image": "https://morshedlaw.com/chambers-building.jpg",
    "telephone": "+8801711000000",
    "email": "info@morshedlaw.com",
    "url": "https://morshedlaw.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "House 45, Road 11, Banani C/A",
      "addressLocality": "Dhaka",
      "postalCode": "1213",
      "addressCountry": "BD"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "09:00",
      "closes": "20:00"
    },
    "priceRange": "$$$"
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        {/* Schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        {/* Google Analytics Simulated Tag */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SIMULATED-KEY');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-legal-darkest text-legal-light">
        <Header />
        
        {/* Main Content Area offset for fixed Header */}
        <main className="flex-grow pt-[76px] md:pt-[84px]">
          {children}
        </main>
        
        <Footer />
        <ChatWidget />
        <CookieConsent />
      </body>
    </html>
  );
}
