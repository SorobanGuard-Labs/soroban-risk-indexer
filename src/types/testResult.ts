export type TestResultStatus = "passed" | "failed" | "skipped";

export type TestbenchSimulationType =
  | "transaction_simulation"
  | "rpc_failure"
  | "auth_boundary"
  | "budget_exhaustion"
  | "storage_footprint";

export interface TestbenchRpcDetails {
  endpoint?: string;
  rpcError?: string;
  retryAttempts?: number;
  transient?: boolean;
}

export interface TestResult {
  id: string;
  projectId: string;
  scenario: string;
  status: TestResultStatus;
  durationMs: number;
  failureReason?: string;
  timestamp: string;
  simulationType?: TestbenchSimulationType;
  rpcDetails?: TestbenchRpcDetails;
}
