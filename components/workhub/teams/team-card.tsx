import Link from "next/link";

type Team = {
  id: string;
  name: string;
  created_at: string;
};

export default function TeamCard({ team }: { team: Team }) {
  // Format the date to something readable (e.g., "Oct 24, 2025")
  const formattedDate = new Date(team.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link 
      href={`/workhub/teams/${team.id}`}
      className="group block border rounded-lg p-5 bg-white dark:bg-transparent hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {team.name}
          </h3>
          <span className="text-[10px] font-mono bg-gray-800 dark:bg-gray-100 px-2 py-0.5 rounded text-gray-800 uppercase tracking-wider">
            {team.id}
          </span>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-gray-400 uppercase font-medium">Created on</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">{formattedDate}</p>
        </div>
      </div>


    </Link>
  );
}