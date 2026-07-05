import type { Store, StoreSnapshot } from "./store";

const cloneSnapshot = (snapshot: StoreSnapshot): StoreSnapshot => ({
  projects: [...snapshot.projects],
  risks: [...snapshot.risks],
  findings: [...snapshot.findings],
  tasks: snapshot.tasks.map((task) => ({
    ...task,
    labels: [...task.labels],
    acceptanceCriteria: [...task.acceptanceCriteria]
  })),
  testResults: [...snapshot.testResults]
});

export class MemoryStore implements Store {
  private snapshot: StoreSnapshot;

  constructor(initialSnapshot: StoreSnapshot) {
    this.snapshot = cloneSnapshot(initialSnapshot);
  }

  listProjects() {
    return cloneSnapshot(this.snapshot).projects;
  }

  listRisks() {
    return cloneSnapshot(this.snapshot).risks;
  }

  listFindings() {
    return cloneSnapshot(this.snapshot).findings;
  }

  listTasks() {
    return cloneSnapshot(this.snapshot).tasks;
  }

  listTestResults() {
    return cloneSnapshot(this.snapshot).testResults;
  }

  replaceAll(snapshot: StoreSnapshot): StoreSnapshot {
    this.snapshot = cloneSnapshot(snapshot);
    return cloneSnapshot(this.snapshot);
  }
}
