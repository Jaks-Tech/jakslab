import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ServiceDetailFramework } from "@/components/services/ServiceDetailFramework";
import {
  getService,
  services,
} from "@/components/services/data";

type ServicePageProps = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * Only service IDs registered in the service data index generate pages.
 * Unknown IDs will return the not-found page.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ id }) => ({
    id,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { id } = await params;
  const service = getService(id);

  if (!service) {
    return {
      title: "Service not found",
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${service.id}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${service.id}`,
      type: "website",
    },
  };
}

export default async function ServicePage({
  params,
}: ServicePageProps) {
  const { id } = await params;
  const service = getService(id);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#1d1d1a]">
      <div className="mx-auto w-full max-w-6xl">
        <nav
          aria-label="Service navigation"
          className="px-5 pt-6 sm:px-8 sm:pt-8 lg:px-12 lg:pt-10"
        >
          <Link
            href="/services"
            className="
              group inline-flex items-center gap-2
              rounded-sm py-1
              text-xs font-semibold tracking-wide text-[#6b6259]
              transition-colors duration-200
              hover:text-[#1d1d1a]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#1d1d1a]
              focus-visible:ring-offset-4
              focus-visible:ring-offset-[#f7f5ef]
            "
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.8}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />

            <span>All services</span>
          </Link>
        </nav>

        <div className="mx-5 mt-6 border-t border-[#ded9cf] sm:mx-8 lg:mx-12" />

        <div className="pb-16 pt-2 sm:pb-20 lg:pb-24">
          <ServiceDetailFramework service={service} />
        </div>
      </div>
    </main>
  );
}
