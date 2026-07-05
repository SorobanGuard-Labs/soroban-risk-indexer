export type TaskDifficulty = "easy" | "medium" | "hard";
export type TaskStatus = "todo" | "in-progress" | "done" | "blocked";

export interface Task {
  id: string;
  projectId: string;
  title: string;
  labels: string[];
  difficulty: TaskDifficulty;
  acceptanceCriteria: string[];
  status: TaskStatus;
}
