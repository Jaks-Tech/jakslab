import Link from "next/link";

type Task = {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
};

export default function TaskCard({ task }: { task: Task }) {
  // Ultra-compact date formatting
  const formattedDeadline = task.deadline 
    ? new Date(task.deadline).toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).replace(',', '')
    : null;

  return (
    <div className="group border border-gray-100 dark:border-white/10 rounded-2xl p-4 bg-white dark:bg-white/5 hover:border-blue-500/50 transition-all duration-200 relative overflow-hidden">
      
      {/* COMPACT HEADER */}
      <div className="flex justify-between items-center gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[8px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded uppercase tracking-tighter shrink-0">
            {task.id}
          </span>
          <h3 className="font-black text-sm text-gray-900 dark:text-white uppercase tracking-tight truncate">
            {task.title}
          </h3>
        </div>
        
        {formattedDeadline && (
          <div className="flex items-center gap-1 text-red-600 dark:text-red-400 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <p className="text-[9px] font-black tracking-tighter uppercase whitespace-nowrap">
              {formattedDeadline}
            </p>
          </div>
        )}
      </div>

      {/* MINIFIED DESCRIPTION */}
      <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 opacity-70 font-medium">
        {task.description || "No parameters set."}
      </p>

      {/* MINIFIED FOOTER */}
      <div className="mt-3 pt-3 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
        <span className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.2em] opacity-30 italic">
          v2.0 // SYNCED
        </span>

        <Link 
          href={`/workhub/tasks/${task.id}`} 
          className="text-[9px] font-black text-blue-600 dark:text-blue-400 flex items-center gap-1 uppercase tracking-widest hover:text-blue-500 transition-all group/link"
        >
          Progress
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="10" 
            height="10" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="group-hover/link:translate-x-0.5 transition-transform"
          >
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}