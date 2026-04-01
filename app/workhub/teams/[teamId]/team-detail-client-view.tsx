"use client";

import { useState } from "react";
import DeleteTeamButton from "@/components/workhub/teams/delete-team-button";
import CreateTaskForm from "@/components/workhub/tasks/create-task-form";
import EnrollUserForm from "@/components/workhub/teams/enroll-user-form";
import Link from "next/link";

export default function TeamDetailClientView({ team, initialTasks, initialMembers }: any) {
  const [isDeploying, setIsDeploying] = useState(false);

  return (
    <div className="relative min-h-screen">
      
    {/* FULL SCREEN OVERRIDE: CREATE TASK TERMINAL */}
      {isDeploying && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-3xl p-4 md:p-12 animate-in fade-in zoom-in duration-300 flex items-center justify-center">
          <div className="max-w-3xl w-full max-h-[90vh] flex flex-col">
            
            {/* TERMINAL HEADER */}
            <div className="flex justify-between items-center mb-6 md:mb-12 px-2">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Create Task</h2>
                <p className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-1">Team: {team.name}</p>
              </div>
              <button 
                onClick={() => setIsDeploying(false)}
                className="p-2 md:p-3 bg-white/5 hover:bg-red-500/20 rounded-full text-white transition-all border border-white/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            {/* SCROLLABLE FORM CONTAINER */}
            <div className="flex-1 overflow-y-auto custom-scrollbar rounded-[2rem] md:rounded-[3rem]">
              <div className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-blue-500/10">
                <CreateTaskForm teamId={team.id} />
              </div>
            </div>

          </div>
        </div>
      )}
      {/* STANDARD REGISTRY VIEW */}
      <div className={`p-6 max-w-7xl mx-auto space-y-12 bg-transparent transition-all duration-500 ${isDeploying ? 'blur-xl scale-95 opacity-0 pointer-events-none' : 'blur-0 scale-100 opacity-100'}`}>
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Sector Hub</h3>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-white uppercase leading-none">{team.name}</h1>
            <p className="text-[11px] font-mono font-bold text-blue-500 uppercase tracking-[0.2em] mt-2">Registry ID: {team.id}</p>
          </div>
          <div className="flex items-center gap-4">
            <DeleteTeamButton teamId={team.id} />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: ENROLLMENT & CREATE TRIGGER */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-2 ml-1">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Enroll Team Member</h3>
              </div>
              
              <EnrollUserForm teamId={team.id} />
              
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 space-y-4">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-2">Team members</p>
                <div className="space-y-2">
                  {initialMembers.length === 0 ? (
                    <p className="text-[10px] text-gray-600 italic px-2">No team members registered.</p>
                  ) : (
                    initialMembers.map((m: any) => (
                      <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/20 transition-all">
                        <span className="text-xs font-bold text-white uppercase tracking-tighter">{m.user_name}</span>
                        <span className="text-[9px] font-mono font-bold text-blue-500/60 uppercase">{m.role}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* PLACED EXACTLY AS REQUESTED: TRIGGER BUTTON AT BOTTOM OF SIDEBAR */}
              <button 
                onClick={() => setIsDeploying(true)}
                className="w-full py-4 bg-blue-600/10 hover:bg-blue-600 border border-blue-600/20 text-blue-500 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Create Task
              </button>
            </div>
          </aside>

          {/* RIGHT COLUMN: TASK LIST */}
          <main className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">
                  Active Mother Tasks
                </h2>
              </div>
              <span className="px-3 py-1 bg-blue-900/20 text-blue-400 text-[10px] font-black rounded-md border border-blue-800">
                {initialTasks.length} Total
              </span>
            </div>

            <div className="grid gap-4">
              {initialTasks.length === 0 ? (
                <div className="p-20 border-2 border-dashed border-white/10 rounded-[3rem] text-center">
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs opacity-50">Zero active missions in registry</p>
                </div>
              ) : (
                initialTasks.map((task: any) => (
                  <div key={task.id} className="p-6 border border-white/10 rounded-[2.5rem] bg-white/5 hover:bg-white/[0.08] hover:border-blue-500/40 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/40" />
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-blue-500 uppercase font-bold">{task.id}</span>
                        <h4 className="font-black text-xl text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                          {task.title}
                        </h4>
                      </div>
                      <Link 
                        href={`/workhub/tasks/${task.id}`}
                        className="px-6 py-2.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-500/10"
                      >
                        Check Task
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}