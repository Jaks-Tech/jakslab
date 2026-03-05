import { 
  Scale, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Shield, 
  Gavel, 
  Mail,
  User,
  CreditCard
} from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | JaksLab",
  description: "Terms and conditions for using JaksLab services.",
};

export default function TermsOfService() {
  return (
    // Changed bg-[#0a0f1c] to bg-transparent here
    <main className="min-h-screen bg-transparent text-slate-300 py-24 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mb-6">
            <Scale size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Last Updated: March 5, 2026
          </p>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto mt-4 uppercase tracking-widest font-semibold">
            Be sure you understand them, and that you agree to be bound by the terms. If you do not agree to the terms, do not proceed.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[2.5rem] space-y-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none"></div>

          {/* Section A */}
          <section className="space-y-6 relative z-10">
            <div className="border-b border-white/10 pb-2 mb-6">
              <h2 className="text-3xl font-black text-white">A. The Terms</h2>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <FileText size={20} className="text-indigo-500" />
                1. Acceptance of Terms
              </h3>
              <p className="leading-relaxed text-slate-400">
                Welcome to JaksLab ("Service" or "Site"), operated by Jaks-Tech. By clicking "I Agree" on the account registration page, payment page, submission page, or using the Site in any way, you are agreeing to comply with and be bound by this agreement, the Privacy Policy, and all rules, policies, and disclaimers posted on the Site.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <User size={20} className="text-indigo-500" />
                2. Definitions
              </h3>
              <p className="leading-relaxed text-slate-400">
                In the Terms, "User," "you," and "your" refer to the individual or entity that creates a JaksLab account or requests a project. "JaksLab," "we," "us," and "our" refer to JaksLab and its operating entity, Jaks-Tech. "Customer" refers to the person who requests a service on the Site. "Expert" or "Developer" refers to the professional assigned to complete the academic or technical request.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <Shield size={20} className="text-indigo-500" />
                3. Right to Modify Terms
              </h3>
              <p className="leading-relaxed text-slate-400">
                When you visit JaksLab or send us e-mails, you are communicating with us through electronic media. You consent to receive communications from us electronically. We will communicate with you by e-mails, chats, or by posting notices on the website. You agree that all agreements, notices, disclosures, and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing.
              </p>
              <p className="leading-relaxed text-slate-400">
                JaksLab may change, revise, or modify any of the Terms at any time by posting them on the Site. Changes shall automatically be effective upon posting; however, material changes to the Terms will be communicated via email from <strong>hello@jakslab.work</strong>. Your continued use of the Service will signify your acceptance of the changes.
              </p>
            </div>
          </section>

          {/* Section B */}
          <section className="space-y-6 relative z-10">
            <div className="border-b border-white/10 pb-2 mb-6 mt-8">
              <h2 className="text-3xl font-black text-white">B. The Website & Services</h2>
            </div>
            <p className="leading-relaxed text-slate-400 mb-4">
              The JaksLab Site is a venue for professional web development, programming assistance, and academic research solutions.
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <AlertTriangle size={20} className="text-yellow-500" />
                4. Academic Integrity & Fair Use
              </h3>
              <p className="leading-relaxed text-slate-400">
                JaksLab strictly adheres to copyright laws and promotes academic integrity. Any academic materials (essays, research papers, final year projects) provided to you are intended to serve as models, references, or inspirational material for your own academic efforts. You are solely responsible for how you use the delivered materials. JaksLab is not liable for any academic disciplinary actions, grade deductions, or university disputes arising from the misuse of our deliverables.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <CheckCircle size={20} className="text-indigo-500" />
                5. Verification; No Reliance on the Term "Expert"
              </h3>
              <p className="leading-relaxed text-slate-400">
                Use of the term "Expert" by JaksLab is meant to describe professionals who work on assignments, code, and technical reports. While JaksLab verifies the qualifications of its team, we do not guarantee any particular level of expertise beyond the agreed-upon project specifications. JaksLab will not be liable for any loss or damage caused by your reliance on any information or content provided as a reference.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <FileText size={20} className="text-indigo-500" />
                6. Information Not Advice; No Client-Professional Relationship
              </h3>
              <p className="leading-relaxed text-slate-400">
                Deliverables from this Site are to be used for general information, academic guidance, and technical implementation purposes. By providing coding solutions or textbook help, Experts do not form attorney-client or licensed professional relationships with Users.
              </p>
            </div>
          </section>

          {/* Section C */}
          <section className="space-y-6 relative z-10">
            <div className="border-b border-white/10 pb-2 mb-6 mt-8">
              <h2 className="text-3xl font-black text-white">C. User Account & Orders</h2>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <Shield size={20} className="text-indigo-500" />
                7. User Accounts; Restricted Activities; Suspension
              </h3>
              <p className="leading-relaxed text-slate-400">
                When you register or place an order on JaksLab, you are responsible for maintaining the confidentiality of your project data and files. You agree to keep your contact and billing information up-to-date.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-400">
                <li><strong>Restricted Activities:</strong> You agree not to submit requests designed to elicit responses that relate to illegal activity or that infringe upon another party's intellectual property rights.</li>
                <li><strong>Suspension or Termination:</strong> At any time, without notice, for any or no reason, JaksLab reserves the right to refuse service to anyone, to modify and discontinue any portion of the Service, and to restrict, suspend, or terminate Users’ accounts.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <CreditCard size={20} className="text-indigo-500" />
                8. Charges and Promotional Services
              </h3>
              <p className="leading-relaxed text-slate-400">
                JaksLab allows you to request custom projects via our order forms. Customers are bound to follow the payment methods provided. Services commence only after payment terms (full payment or agreed-upon milestones) are met.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <CheckCircle size={20} className="text-indigo-500" />
                9. Acceptance is Presumed
              </h3>
              <p className="leading-relaxed text-slate-400">
                Once you receive your final project files, source code, or document, your acknowledgment of acceptance is presumed. You have fifteen (15) days from the time the solution was received to request clarifications or revisions based on the original project requirements. Requests for revisions introducing new scope outside the original agreement may incur additional fees.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <Scale size={20} className="text-indigo-500" />
                10. Refund Policy
              </h3>
              <p className="leading-relaxed text-slate-400">
                JaksLab assures its users high-quality solutions tailored to match their needs. If you are not satisfied with our technical or academic services, please contact us at <strong>hello@jakslab.work</strong>. All refunds are at the sole discretion of the JaksLab Quality Assurance Department.
              </p>
              <p className="leading-relaxed text-slate-400 mt-2">Refunds may be requested if:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-400">
                <li>We are unable to meet the agreed-upon deadline (barring insignificant delays of up to 10% of the timeline), provided you supplied all details on time.</li>
                <li>The work delivered fundamentally fails to meet the technical specifications or grading rubrics provided at the time of order.</li>
                <li>We fail to provide promised revisions for errors on our part.</li>
              </ul>
              <p className="leading-relaxed text-slate-400 mt-2 italic">
                Refund Guarantee: We try our best to solve your technical and academic challenges. Clarification or rework requests must be opened within 15 days of receiving the final solution. Refund requests are generally processed within 48 hours, but bank transfers may take 3-5 business days.
              </p>
            </div>
          </section>

          {/* Section D */}
          <section className="space-y-6 relative z-10">
            <div className="border-b border-white/10 pb-2 mb-6 mt-8">
              <h2 className="text-3xl font-black text-white">D. Legal Statements</h2>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <Gavel size={20} className="text-indigo-500" />
                11. General Legal Terms
              </h3>
              <ul className="space-y-4 text-slate-400">
                <li>
                  <strong className="text-white">Release:</strong> In the event that you have a dispute regarding the use of delivered materials, you release JaksLab (and our officers, directors, agents, and employees) from any and all claims, demands, and damages (actual and consequential) of every kind and nature arising out of such disputes.
                </li>
                <li>
                  <strong className="text-white">Proprietary Rights of Content:</strong> Upon full payment for technical services (Web Development, Custom Programming), intellectual property rights for the source code and final deliverables are transferred to you, unless otherwise specified. JaksLab retains the right to use non-sensitive code snippets or generic UI designs for internal portfolios.
                </li>
                <li>
                  <strong className="text-white">Exclusion of Warranties:</strong> JAKSLAB DOES NOT REPRESENT OR WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE. UNDER NO CIRCUMSTANCES WILL JAKSLAB BE LIABLE FOR ANY LOSS OR DAMAGE CAUSED BY A USER'S RELIANCE ON ACADEMIC OR TECHNICAL DELIVERABLES OBTAINED THROUGH THE SITE.
                </li>
                <li>
                  <strong className="text-white">Limitation of Liabilities:</strong> IN NO EVENT SHALL JAKSLAB OR ITS PROPRIETORS BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES. IN NO EVENT WILL OUR LIABILITY TO YOU EXCEED THE AMOUNT OF FEES YOU PAID TO JAKSLAB FOR THE SPECIFIC PROJECT GIVING RISE TO LIABILITY.
                </li>
                <li>
                  <strong className="text-white">Choice of Law and Forum:</strong> The Terms shall be governed by, and construed in accordance with the laws of Nairobi, Kenya. All disputes arising out of the use of the Site shall be resolved via written notification to <strong>hello@jakslab.work</strong>, allowing thirty (30) days for a response and remedy before further action is taken.
                </li>
                <li>
                  <strong className="text-white">Conclusive Agreement:</strong> The Terms constitute the complete and exclusive statement of the Agreement between you and us. It supersedes any prior agreements, oral or written, relating to the subject matter of the Terms.
                </li>
              </ul>
            </div>
          </section>

          {/* Footer Contact Box */}
          <div className="mt-12 p-8 bg-blue-500/5 rounded-3xl border border-blue-500/10 text-center space-y-4 relative z-10">
            <Mail className="mx-auto text-blue-400 mb-2" size={32} />
            <h3 className="text-2xl font-bold text-white">Questions about our terms?</h3>
            <p className="text-slate-400">
              Reach out to our support team and we'll be happy to help clarify any details.
            </p>
            <div className="pt-4">
              <a 
                href="mailto:hello@jakslab.work"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
              >
                hello@jakslab.work
              </a>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              JaksLab is a pertinent platform for learning and development.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}