import type { Finding } from "../types/finding";
import type { Project } from "../types/project";
import type { Risk } from "../types/risk";
import type { Task } from "../types/task";
import type { TestResult } from "../types/testResult";

export interface StoreSnapshot {
  projects: Project[];
  risks: Risk[];
  findings: Finding[];
  tasks: Task[];
  testResults: TestResult[];
}

export interface Store {
  listProjects(): Project[];
  listRisks(): Risk[];
  listFindings(): Finding[];
  listTasks(): Task[];
  listTestResults(): TestResult[];
  replaceAll(snapshot: StoreSnapshot): StoreSnapshot;
}
