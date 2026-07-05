import type { Severity } from "./risk";

export type FindingStatus = "open" | "triaged" | "resolved" | "wont-fix";

export interface Finding {
  id: string;
  projectId: string;
  severity: Severity;
  summary: string;
  affectedArea: string;
  recommendation: string;
  status: FindingStatus;
}
