import TeamCard from "@/components/workhub/teams/team-card";
import CreateTeamForm from "@/components/workhub/teams/create-team-form";

async function getTeams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/workhub/teams`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.teams || [];
}

export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-10 max-w-7xl mx-auto space-y-12">
      
      {/* HEADER */}
      <header className="text-center space-y-3 border-b border-gray-100 dark:border-gray-900 pb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
          Team Management
        </h1>
        <p className="text-sm sm:text-base text-gray-500 font-medium italic max-w-xl mx-auto">
          Establish organizational sectors, deploy mission-critical objectives, and monitor real-time team synchronization.
        </p>
      </header>

      {/* SITEMAP */}
      <section className="space-y-6">
        <div className="flex items-center justify-center gap-2">
          <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            Sitemap
          </h3>
          <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {[
            { step: "01", label: "Create Team", desc: "Initialize Sector" },
            { step: "02", label: "Access Hub", desc: "Enter Terminal" },
            { step: "03", label: "Create Task", desc: "Launch Mission" },
            { step: "04", label: "Add Subtasks", desc: "Define Nodes" },
            { step: "05", label: "Assign", desc: "Claim Mission" },
            { step: "06", label: "Track", desc: "Monitor Flow" },
            { step: "07", label: "Chat", desc: "Live Comms" },
          ].map((item, i) => (
            <div
              key={i}
              className="group p-3 sm:p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-500/50 transition-all"
            >
              <span className="text-[9px] sm:text-[10px] font-mono font-black text-blue-600 block">
                {item.step}
              </span>
              <h4 className="text-[10px] sm:text-[11px] font-black uppercase text-gray-900 dark:text-white">
                {item.label}
              </h4>
              <p className="text-[8px] sm:text-[9px] text-gray-500 uppercase mt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* LEFT COLUMN */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                Establish Team
              </h3>
            </div>
            <CreateTeamForm />
          </div>
        </aside>

        {/* RIGHT COLUMN */}
        <main className="lg:col-span-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-50 dark:border-gray-900 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                Created Teams
              </h2>
            </div>

            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-[10px] font-black rounded-md border border-gray-200 dark:border-gray-800 uppercase tracking-widest">
              {teams.length} teams online
            </span>
          </div>

          {teams.length === 0 ? (
            <div className="p-10 sm:p-16 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl sm:rounded-[3rem] text-center">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                Registry Empty
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {teams.map((team: any) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}