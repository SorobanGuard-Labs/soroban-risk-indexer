import { describe, expect, it } from "vitest";
import { MockRiskAdapter } from "../../src/indexer/mockRiskAdapter";

describe("MockRiskAdapter", () => {
  it("loads a complete mock snapshot", () => {
    const snapshot = new MockRiskAdapter().loadSnapshot();

    expect(snapshot.projects).toHaveLength(2);
    expect(snapshot.projects.every((project) => project.readinessScore > 0)).toBe(true);
    expect(snapshot.risks.map((risk) => risk.id)).toContain("risk-001");
    expect(snapshot.findings.map((finding) => finding.id)).toContain("finding-001");
    expect(snapshot.tasks[0]?.acceptanceCriteria.length).toBeGreaterThan(0);
    expect(snapshot.testResults[1]?.failureReason).toBeDefined();
  });
});
