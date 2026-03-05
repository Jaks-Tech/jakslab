import { 
  RefreshCcw, 
  AlertOctagon, 
  Clock, 
  ShieldCheck, 
  Mail, 
  FileText,
  CheckCircle,
  HelpCircle
} from "lucide-react";

export const metadata = {
  title: "Refund Policy | JaksLab",
  description: "JaksLab's official refund and rework policy for academic and technical services.",
};

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-transparent text-slate-300 py-24 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
            <RefreshCcw size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Refund Policy
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Last Updated: March 5, 2026
          </p>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto mt-4 uppercase tracking-widest font-semibold">
            We strive for excellence, but if things don't go as planned, here is how we handle refunds.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[2.5rem] space-y-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-green-600/5 blur-[100px] rounded-full pointer-events-none"></div>

          {/* Intro Section */}
          <section className="space-y-4 relative z-10">
            <p className="leading-relaxed text-slate-400">
              JaksLab assures its users of high-quality solutions tailored to their specific academic, programming, and web development needs. If, for any valid reason that can be proven, you are not satisfied with our services or the final delivered project, please contact us immediately at <strong>jakslab.services@gmail.com</strong>.
            </p>
            <p className="leading-relaxed text-slate-400">
              You can also request a revision or open a refund claim directly by replying to your project delivery email. All refunds are at the sole discretion of the Quality Assurance Department of JaksLab.
            </p>
          </section>

          {/* Section 1: Conditions for Refund */}
          <section className="space-y-6 relative z-10">
            <div className="border-b border-white/10 pb-2 mb-6 mt-8">
              <h2 className="text-3xl font-black text-white flex items-center gap-3">
                <AlertOctagon size={24} className="text-green-500" />
                1. Conditions for a Refund
              </h2>
            </div>
            
            <p className="leading-relaxed text-slate-400 mb-4">
              A refund can be requested under any of the following conditions:
            </p>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <Clock className="text-green-500 shrink-0 mt-1" size={18} />
                <span>
                  <strong className="text-white block">Missed Deadlines:</strong> 
                  If our experts are not able to meet the deadline for your work (barring an insignificant delay of up to 10% of the total agreed timeline), provided that you supplied all necessary details, files, and sources without delay at the start of the project.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FileText className="text-green-500 shrink-0 mt-1" size={18} />
                <span>
                  <strong className="text-white block">Low Quality or Plagiarism:</strong> 
                  We do not guarantee specific grades and advise you to use the provided materials as reference. However, if the work delivered is objectively of low quality, fails to follow instructions, or is plagiarized, a refund will be issued provided you send us the grading rubric failures or an authentic plagiarism report.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <RefreshCcw className="text-green-500 shrink-0 mt-1" size={18} />
                <span>
                  <strong className="text-white block">Failed Revisions:</strong> 
                  If the work delivered has not been proofread or debugged properly, and we fail to provide the requested revisions to fix our own errors.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <HelpCircle className="text-green-500 shrink-0 mt-1" size={18} />
                <span>
                  <strong className="text-white block">Unresponsive Support:</strong> 
                  If you have been trying to contact the customer support team regarding an active order and there is no response through any means of communication (email, phone, or chat) within a period of 48 hours.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 shrink-0 mt-1" size={18} />
                <span>
                  <strong className="text-white block">Unassigned Tasks:</strong> 
                  If no expert or developer has been assigned to your project after 50% of the agreed-upon deadline has elapsed since making the payment.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 2: Refund Guarantee & Timelines */}
          <section className="space-y-6 relative z-10">
            <div className="border-b border-white/10 pb-2 mb-6 mt-8">
              <h2 className="text-3xl font-black text-white flex items-center gap-3">
                <ShieldCheck size={24} className="text-green-500" />
                2. Refund Guarantee & Processing Time
              </h2>
            </div>
            <p className="leading-relaxed text-slate-400">
              We have highly qualified experts who try their best to execute your projects flawlessly, and we are always eager to help. 
            </p>
            <p className="leading-relaxed text-slate-400 font-bold text-white">
              Clarification or rework requests must be opened within 15 days of receiving the final solution. Any delay thereafter shall not result in a valid refund claim.
            </p>
            <p className="leading-relaxed text-slate-400">
              Refund requests are generally processed by our team within 48 hours. However, it can take anywhere from 3-5 business days, depending on your bank or payment provider, for your funds to be made available in your account.
            </p>
          </section>

          {/* Section 3: Privacy & Safety of Solutions */}
          <section className="space-y-6 relative z-10">
            <div className="border-b border-white/10 pb-2 mb-6 mt-8">
              <h2 className="text-3xl font-black text-white flex items-center gap-3">
                <FileText size={24} className="text-green-500" />
                3. Privacy and Safety of Delivered Work
              </h2>
            </div>
            <p className="leading-relaxed text-slate-400">
              JaksLab understands that custom code, essays, and technical solutions need to be original and plagiarism-free. Hence, all deliverables are run through strict Quality Checks (QC) before submission.
            </p>
            <p className="leading-relaxed text-slate-400">
              We expect clients to review the solutions and make last-mile modifications before final use. 
            </p>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl mt-4">
              <p className="leading-relaxed text-yellow-500/90 text-sm">
                <strong>Important:</strong> In case a full refund claim is settled in favor of the customer, JaksLab retains all copyright to the delivered work. The company reserves the right to make the solution, code, or essay content public. Any plagiarism claim or academic dispute raised by a university/college authority thereafter will be the student's sole liability.
              </p>
            </div>
          </section>

          {/* Footer Contact Box */}
          <div className="mt-12 p-8 bg-green-500/5 rounded-3xl border border-green-500/10 text-center space-y-4 relative z-10">
            <Mail className="mx-auto text-green-400 mb-2" size={32} />
            <h3 className="text-2xl font-bold text-white">Need to open a dispute?</h3>
            <p className="text-slate-400">
              Reach out to our Quality Assurance team directly.
            </p>
            <div className="pt-4">
              <a 
                href="mailto:jakslab.services@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors"
              >
                jakslab.services@gmail.com
              </a>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              JaksLab • Quality Assurance Team
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}