import { createHash, randomBytes } from "crypto";

export function createPortalToken() {
  return randomBytes(32).toString("base64url");
}

export function hashPortalToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export const orderStatuses = {
  submitted: "Submitted",
  under_review: "Under review",
  quoted: "Quoted",
  awaiting_payment: "Awaiting payment",
  in_progress: "In progress",
  ready_for_review: "Ready for review",
  delivered: "Delivered",
  completed: "Completed",
} as const;
