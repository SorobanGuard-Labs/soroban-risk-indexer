import type { Finding } from "../types/finding";
import type { Risk, Severity } from "../types/risk";

const severityWeights: Record<Severity, number> = {
  critical: 100,
  high: 75,
  medium: 45,
  low: 20,
  informational: 5
};

export const getSeverityWeight = (severity: Severity): number => severityWeights[severity];

export const calculateRiskScore = (items: Array<Risk | Finding>): number => {
  if (items.length === 0) {
    return 0;
  }

  const total = items.reduce((sum, item) => sum + getSeverityWeight(item.severity), 0);
  const average = total / items.length;

  return Math.min(100, Math.round(average));
};

export const calculateReadinessScore = (riskScore: number, completedTasks: number, totalTasks: number): number => {
  const taskCompletion = totalTasks === 0 ? 50 : (completedTasks / totalTasks) * 100;
  const score = taskCompletion * 0.6 + (100 - riskScore) * 0.4;

  return Math.max(0, Math.min(100, Math.round(score)));
};
