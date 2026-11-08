export type TaskDifficulty = "easy" | "medium" | "hard";
export type TaskStatus = "todo" | "in-progress" | "done" | "blocked";

export type TaskSource = "guard-kit" | "manual" | "github";
export type TaskCategory =
  | "authorization"
  | "data-storage"
  | "upgradeability"
  | "resource-budget"
  | "readiness"
  | "resilience";

export interface Task {
  id: string;
  projectId: string;
  title: string;
  labels: string[];
  difficulty: TaskDifficulty;
  acceptanceCriteria: string[];
  status: TaskStatus;
  source?: TaskSource;
  category?: TaskCategory;
}
