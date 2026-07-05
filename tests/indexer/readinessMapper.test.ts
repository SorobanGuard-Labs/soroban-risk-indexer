import { describe, expect, it } from "vitest";
import { MockRiskAdapter } from "../../src/indexer/mockRiskAdapter";
import { mapProjectReadiness } from "../../src/indexer/readinessMapper";

describe("readiness mapper", () => {
  it("maps project readiness from open risks, findings, and completed tasks", () => {
    const snapshot = new MockRiskAdapter().loadSnapshot();
    const project = snapshot.projects.find((item) => item.id === "project-phoenix-vault");

    expect(project).toBeDefined();

    const mapped = mapProjectReadiness(project!, snapshot.risks, snapshot.findings, snapshot.tasks);

    expect(mapped.riskScore).toBe(60);
    expect(mapped.readinessScore).toBe(46);
  });
});
