"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function WorkhubLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      if (data.user) {
        setAuthorized(true);
      } else {
        router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
      }
    });

    return () => { active = false; };
  }, [pathname, router]);

  if (!authorized) {
    return <div className="grid min-h-[60vh] place-items-center text-sm text-slate-400">Checking staff access...</div>;
  }

  return children;
}
