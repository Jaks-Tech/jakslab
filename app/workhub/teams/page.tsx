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
    <div className="p-30 max-w-7xl mx-auto space-y-16">
      
      {/* SECTION: CENTERED PAGE HEADER */}
      <header className="text-center space-y-4 border-b border-gray-100 dark:border-gray-900 pb-12">

        <h1 className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-none">
          Team Management
        </h1>
        <p className="text-gray-500 font-medium italic max-w-xl mx-auto">
          Establish organizational sectors, deploy mission-critical objectives, and monitor real-time team synchronization.
        </p>
      </header>

      {/* SECTION: DEPLOYMENT ROADMAP (The "How-To" Map) */}
      <section className="space-y-8">
        <div className="flex items-center justify-center gap-2">
          <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            Sitemap
          </h3>
          <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {[
            { step: "01", label: "Create Team", desc: "Initialize Sector" },
            { step: "02", label: "Access Hub", desc: "Enter Terminal" },
            { step: "03", label: "Create Task", desc: "Launch Mission" },
            { step: "04", label: "Add Subtasks", desc: "Define Nodes" },
            { step: "05", label: "Assign", desc: "Claim Mission" },
            { step: "06", label: "Track", desc: "Monitor Flow" },
            { step: "07", label: "Chat", desc: "Live Comms" },
          ].map((item, i) => (
            <div key={i} className="relative group p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-500/50 transition-all">
              <span className="text-[10px] font-mono font-black text-blue-600 mb-1 block">{item.step}</span>
              <h4 className="text-[11px] font-black uppercase tracking-tight text-gray-900 dark:text-white">{item.label}</h4>
              <p className="text-[9px] text-gray-500 uppercase mt-1 tracking-tighter">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* SECTION: LEFT COLUMN (MANAGEMENT) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="sticky top-6">
             <div className="flex items-center gap-2 mb-6 ml-1">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                  Establish Team
                </h3>
             </div>
             <CreateTeamForm />
          </div>
        </aside>

        {/* SECTION: RIGHT COLUMN (REGISTRY) */}
        <main className="lg:col-span-8 space-y-10">
          <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-900 pb-4">
            <div className="flex items-center gap-2 ml-1">
              <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                Created Team (s)
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
               <span className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-[10px] font-black rounded-md border border-gray-200 dark:border-gray-800 uppercase tracking-widest">
                 {teams.length} teams online
               </span>
            </div>
          </div>

          <div className="grid gap-4">
            {teams.length === 0 ? (
              <div className="p-20 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[3rem] text-center">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Registry Empty</p>
              </div>
            ) : (
              <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {teams.map((team: any) => (
                  <TeamCard key={team.id} team={team} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}