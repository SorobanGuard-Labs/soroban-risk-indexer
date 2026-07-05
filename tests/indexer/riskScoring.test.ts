import { describe, expect, it } from "vitest";
import { calculateReadinessScore, calculateRiskScore, getSeverityWeight } from "../../src/utils/riskScoring";

describe("risk scoring", () => {
  it("maps severities to stable weights", () => {
    expect(getSeverityWeight("critical")).toBe(100);
    expect(getSeverityWeight("informational")).toBe(5);
  });

  it("calculates an average risk score", () => {
    const score = calculateRiskScore([
      { severity: "high" },
      { severity: "low" }
    ] as never);

    expect(score).toBe(48);
  });

  it("returns zero risk when there are no items", () => {
    expect(calculateRiskScore([])).toBe(0);
  });

  it("combines task completion and risk into readiness", () => {
    expect(calculateReadinessScore(50, 1, 2)).toBe(50);
    expect(calculateReadinessScore(0, 2, 2)).toBe(100);
  });
});
