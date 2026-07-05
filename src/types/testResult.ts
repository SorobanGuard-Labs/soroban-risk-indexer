export type TestResultStatus = "passed" | "failed" | "skipped";

export interface TestResult {
  id: string;
  projectId: string;
  scenario: string;
  status: TestResultStatus;
  durationMs: number;
  failureReason?: string;
  timestamp: string;
}
