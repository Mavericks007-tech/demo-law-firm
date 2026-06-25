import Link from "next/link";
import { Scale, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-legal-darkest min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md">
        
        {/* Animated Icon */}
        <div className="w-20 h-20 bg-legal-dark border border-legal-steel rounded-full flex items-center justify-center mx-auto shadow-xl animate-pulse">
          <Scale className="h-10 w-10 text-legal-light" />
        </div>

        {/* Error Code & Text */}
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-legal-slate font-bold block">
            Error Code 404
          </span>
          <h1 className="font-serif text-3xl font-bold text-legal-light">
            Docket Not Found
          </h1>
          <p className="text-xs sm:text-sm text-legal-ash leading-relaxed">
            The requested legal document, page, or record does not exist in our chambers archives. It may have been relocated or archived.
          </p>
        </div>

        {/* Action Link */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded bg-legal-light text-legal-darkest font-bold text-xs hover:bg-white transition-all shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Chambers Chambers</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
