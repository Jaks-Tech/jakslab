import { notFound } from "next/navigation";

import { ServiceDetailFramework } from "@/components/services/ServiceDetailFramework";
import { ServiceDetailModal } from "@/components/services/ServiceDetailModal";
import {
  getService,
  services,
} from "@/components/services/data";

type InterceptedServicePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ id }) => ({ id }));
}

export default async function InterceptedServicePage({
  params,
}: InterceptedServicePageProps) {
  const { id } = await params;
  const service = getService(id);

  if (!service) {
    notFound();
  }

  return (
    <ServiceDetailModal title={service.name}>
      <ServiceDetailFramework service={service} variant="modal" />
    </ServiceDetailModal>
  );
}
