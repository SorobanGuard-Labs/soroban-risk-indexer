import { describe, expect, it } from "vitest";
import { MockRiskAdapter } from "../../src/indexer/mockRiskAdapter";
import { MemoryStore } from "../../src/storage/memoryStore";

describe("MemoryStore", () => {
  it("lists stored data", () => {
    const snapshot = new MockRiskAdapter().loadSnapshot();
    const store = new MemoryStore(snapshot);

    expect(store.listProjects()).toHaveLength(2);
    expect(store.listRisks()).toHaveLength(3);
    expect(store.listFindings()).toHaveLength(2);
    expect(store.listTasks()).toHaveLength(3);
    expect(store.listTestResults()).toHaveLength(2);
  });

  it("defensively copies task arrays", () => {
    const snapshot = new MockRiskAdapter().loadSnapshot();
    const store = new MemoryStore(snapshot);
    const task = store.listTasks()[0];

    task.labels.push("mutated");
    task.acceptanceCriteria.push("mutated");

    expect(store.listTasks()[0]?.labels).not.toContain("mutated");
    expect(store.listTasks()[0]?.acceptanceCriteria).not.toContain("mutated");
  });

  it("replaces all data", () => {
    const snapshot = new MockRiskAdapter().loadSnapshot();
    const store = new MemoryStore(snapshot);
    const updated = store.replaceAll({ ...snapshot, risks: [] });

    expect(updated.risks).toHaveLength(0);
    expect(store.listRisks()).toHaveLength(0);
  });
});
