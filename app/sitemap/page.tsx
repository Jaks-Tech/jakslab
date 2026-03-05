import Link from "next/link";

export const metadata = {
  title: "Sitemap | JaksLab",
  description: "Complete directory of JaksLab pages and services.",
};

// Reusable Bullet Component for the hollow circle look
const BulletLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="flex items-center group mb-2.5 w-fit">
    <div className="w-[7px] h-[7px] rounded-full border-[1.5px] border-slate-400 group-hover:border-blue-400 shrink-0 mr-3 transition-colors" />
    <span className="text-sm text-slate-300 group-hover:text-blue-400 transition-colors">
      {children}
    </span>
  </Link>
);

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-transparent py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-black text-white mb-10 text-center tracking-tight">
          Sitemap
        </h1>

        {/* ------------------------------------------------- */}
        {/* SECTION 1: HOME */}
        {/* ------------------------------------------------- */}
        <div className="mb-10 shadow-2xl">
          {/* Main Dark Header Bar */}
          <div className="bg-[#0b2742] border border-blue-900 text-white font-bold px-5 py-3 uppercase tracking-wider rounded-t-xl">
            Home
          </div>
          
          {/* Content Box */}
          <div className="bg-white/[0.02] border border-white/10 border-t-0 p-6 rounded-b-xl backdrop-blur-md">
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              <BulletLink href="/">Home</BulletLink>
              <BulletLink href="/about">About Us</BulletLink>
              <BulletLink href="/services">Services</BulletLink>
              <BulletLink href="/portfolio">Portfolio & Blog</BulletLink>
              <BulletLink href="/order">Create Task (Order)</BulletLink>
              <BulletLink href="/contact">Contact Us</BulletLink>
              <BulletLink href="/terms">Terms & Conditions</BulletLink>
              <BulletLink href="/privacy">Privacy Policy</BulletLink>
              <BulletLink href="/refund">Refund Policy</BulletLink>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------- */}
        {/* SECTION 2: SERVICES / QUESTIONS & ANSWERS EQUIVALENT */}
        {/* ------------------------------------------------- */}
        <div className="shadow-2xl">
          {/* Main Dark Header Bar */}
          <div className="bg-[#0b2742] border border-blue-900 text-white font-bold px-5 py-3 uppercase tracking-wider rounded-t-xl">
            Our Services & Expertise
          </div>

          {/* Content Box */}
          <div className="bg-white/[0.02] border border-white/10 border-t-0 p-6 md:p-8 rounded-b-xl backdrop-blur-md space-y-12">

            {/* --- CATEGORY: ACADEMIC WRITING --- */}
            <div>
              {/* Light Sub-Category Bar */}
              <div className="bg-[#1e446a]/40 text-blue-200 font-bold px-5 py-2.5 rounded-lg mb-6 border border-blue-800/50">
                Academic Services
              </div>

              {/* 3-Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
                
                {/* Column 1 */}
                <div>
                  <h3 className="text-emerald-400 font-bold mb-3">Essays & Papers</h3>
                  <BulletLink href="/services">Essay Writing</BulletLink>
                  <BulletLink href="/services">Term Papers</BulletLink>
                  <BulletLink href="/services">Coursework Help</BulletLink>
                  <BulletLink href="/services">Annotated Bibliography</BulletLink>
                  <BulletLink href="/services">Article Critique</BulletLink>
                </div>

                {/* Column 2 */}
                <div>
                  <h3 className="text-emerald-400 font-bold mb-3">Advanced Research</h3>
                  <BulletLink href="/services">Research Papers</BulletLink>
                  <BulletLink href="/services">Dissertation & Thesis</BulletLink>
                  <BulletLink href="/services">Capstone Projects</BulletLink>
                  <BulletLink href="/services">Research Proposals</BulletLink>
                  <BulletLink href="/services">Literature Reviews</BulletLink>
                </div>

                {/* Column 3 */}
                <div>
                  <h3 className="text-emerald-400 font-bold mb-3">Editing & Admissions</h3>
                  <BulletLink href="/services">Proofreading & Editing</BulletLink>
                  <BulletLink href="/services">Admission Essays</BulletLink>
                  <BulletLink href="/services">Personal Statements</BulletLink>
                  <BulletLink href="/services">Scholarship Essays</BulletLink>
                </div>

              </div>
            </div>

            {/* --- CATEGORY: COMPUTER SCIENCE --- */}
            <div>
              {/* Light Sub-Category Bar */}
              <div className="bg-[#1e446a]/40 text-blue-200 font-bold px-5 py-2.5 rounded-lg mb-6 border border-blue-800/50">
                Computer Science & IT
              </div>

              {/* 3-Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
                
                {/* Column 1 */}
                <div>
                  <h3 className="text-emerald-400 font-bold mb-3">Programming Languages</h3>
                  <BulletLink href="/services">Programming In C/C++</BulletLink>
                  <BulletLink href="/services">Programming In Java</BulletLink>
                  <BulletLink href="/services">Programming In Python</BulletLink>
                  <BulletLink href="/services">JavaScript / TypeScript</BulletLink>
                  <BulletLink href="/services">Assembly Language</BulletLink>
                </div>

                {/* Column 2 */}
                <div>
                  <h3 className="text-emerald-400 font-bold mb-3">Web & Software</h3>
                  <BulletLink href="/services">Web Development</BulletLink>
                  <BulletLink href="/services">Software Engineering</BulletLink>
                  <BulletLink href="/services">System Design</BulletLink>
                  <BulletLink href="/services">Code Debugging</BulletLink>
                  <BulletLink href="/services">API Integrations</BulletLink>
                </div>

                {/* Column 3 */}
                <div>
                  <h3 className="text-emerald-400 font-bold mb-3">Data & Systems</h3>
                  <BulletLink href="/services">Database Management (SQL)</BulletLink>
                  <BulletLink href="/services">Data Structures & Algorithms</BulletLink>
                  <BulletLink href="/services">Machine Learning Models</BulletLink>
                  <BulletLink href="/services">Operating Systems</BulletLink>
                  <BulletLink href="/services">Computer Networking</BulletLink>
                </div>

              </div>
            </div>

            {/* --- CATEGORY: ENGINEERING & TECHNICAL --- */}
            <div>
              {/* Light Sub-Category Bar */}
              <div className="bg-[#1e446a]/40 text-blue-200 font-bold px-5 py-2.5 rounded-lg mb-6 border border-blue-800/50">
                Engineering & Business
              </div>

              {/* 3-Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
                
                {/* Column 1 */}
                <div>
                  <h3 className="text-emerald-400 font-bold mb-3">Engineering Projects</h3>
                  <BulletLink href="/services">Final Year Projects</BulletLink>
                  <BulletLink href="/services">Technical Reports</BulletLink>
                  <BulletLink href="/services">Mechanical Engineering Help</BulletLink>
                  <BulletLink href="/services">Electrical Engineering Help</BulletLink>
                </div>

                {/* Column 2 */}
                <div>
                  <h3 className="text-emerald-400 font-bold mb-3">Analytics & Math</h3>
                  <BulletLink href="/services">Data Science Analysis</BulletLink>
                  <BulletLink href="/services">Mathematical Modeling</BulletLink>
                  <BulletLink href="/services">Statistical Analysis</BulletLink>
                  <BulletLink href="/services">Calculus & Algebra</BulletLink>
                </div>

                {/* Column 3 */}
                <div>
                  <h3 className="text-emerald-400 font-bold mb-3">Business & Professional</h3>
                  <BulletLink href="/services">Corporate Finance Papers</BulletLink>
                  <BulletLink href="/services">Business Plans</BulletLink>
                  <BulletLink href="/services">Market Research</BulletLink>
                  <BulletLink href="/services">Resume & CV Writing</BulletLink>
                </div>

              </div>
            </div>

          </div>
        </div>
        
      </div>
    </main>
  );
}