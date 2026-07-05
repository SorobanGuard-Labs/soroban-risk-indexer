export type Severity = "critical" | "high" | "medium" | "low" | "informational";
export type RiskStatus = "open" | "mitigated" | "accepted" | "false-positive";

export interface Risk {
  id: string;
  projectId: string;
  title: string;
  severity: Severity;
  category: string;
  description: string;
  recommendation: string;
  status: RiskStatus;
}
