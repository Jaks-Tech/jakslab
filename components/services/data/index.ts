import { contentService } from "./content";
import { developmentService } from "./development";
import { researchService } from "./research";
import type { Service, ServiceId } from "./types";
export type { Service, ServiceFramework, ServiceId } from "./types";
export { contentService, developmentService, researchService };
export const serviceOrder: readonly ServiceId[] = ["content","development","research"];
export const services: Service[] = [contentService,developmentService,researchService];
export const cycle = services;
export const serviceById = Object.fromEntries(services.map((service) => [service.id,service])) as Record<ServiceId,Service>;
export function isServiceId(id:string):id is ServiceId{return id in serviceById;}
export function getService(id:string){return isServiceId(id)?serviceById[id]:undefined;}
