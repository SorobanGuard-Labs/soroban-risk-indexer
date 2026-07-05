import type { StoreSnapshot } from "../storage/store";
import { nowIso } from "../utils/time";
import { mapProjectsReadiness } from "./readinessMapper";

export interface RiskAdapter {
  loadSnapshot(): StoreSnapshot;
}

export class MockRiskAdapter implements RiskAdapter {
  loadSnapshot(): StoreSnapshot {
    const timestamp = nowIso();

    const projects = [
      {
        id: "project-phoenix-vault",
        name: "Phoenix Vault",
        repositoryUrl: "https://github.com/sorobanguard-labs/phoenix-vault",
        network: "testnet" as const,
        readinessScore: 0,
        riskScore: 0
      },
      {
        id: "project-horizon-escrow",
        name: "Horizon Escrow",
        repositoryUrl: "https://github.com/sorobanguard-labs/horizon-escrow",
        network: "local" as const,
        readinessScore: 0,
        riskScore: 0
      }
    ];

    const risks = [
      {
        id: "risk-001",
        projectId: "project-phoenix-vault",
        title: "Missing authorization guard on admin path",
        severity: "high" as const,
        category: "access-control",
        description: "A privileged operation is documented but not represented in the readiness checklist.",
        recommendation: "Require explicit admin authorization tests before promoting the contract.",
        status: "open" as const
      },
      {
        id: "risk-002",
        projectId: "project-horizon-escrow",
        title: "RPC failure handling needs coverage",
        severity: "medium" as const,
        category: "resilience",
        description: "Retry and failure paths are not fully represented in test evidence.",
        recommendation: "Add scenario coverage for transient RPC failures and stuck submission states.",
        status: "open" as const
      },
      {
        id: "risk-003",
        projectId: "project-horizon-escrow",
        title: "Manual deployment checklist exists",
        severity: "informational" as const,
        category: "operations",
        description: "Deployment steps are tracked manually and can be migrated later.",
        recommendation: "Convert the checklist into machine-readable readiness tasks.",
        status: "accepted" as const
      }
    ];

    const findings = [
      {
        id: "finding-001",
        projectId: "project-phoenix-vault",
        severity: "medium" as const,
        summary: "Boundary test missing for minimum deposit",
        affectedArea: "deposit validation",
        recommendation: "Add minimum and zero-value deposit tests.",
        status: "triaged" as const
      },
      {
        id: "finding-002",
        projectId: "project-horizon-escrow",
        severity: "low" as const,
        summary: "Readme does not document failure recovery",
        affectedArea: "developer documentation",
        recommendation: "Document expected operator behavior after failed submissions.",
        status: "open" as const
      }
    ];

    const tasks = [
      {
        id: "task-001",
        projectId: "project-phoenix-vault",
        title: "Add admin authorization regression tests",
        labels: ["security", "authorization", "guard-kit"],
        difficulty: "medium" as const,
        acceptanceCriteria: [
          "Admin-only functions have negative authorization tests",
          "CI runs the new tests on every pull request"
        ],
        status: "in-progress" as const
      },
      {
        id: "task-002",
        projectId: "project-phoenix-vault",
        title: "Publish audit readiness checklist",
        labels: ["readiness", "documentation"],
        difficulty: "easy" as const,
        acceptanceCriteria: ["Checklist is linked from the repository readme"],
        status: "done" as const
      },
      {
        id: "task-003",
        projectId: "project-horizon-escrow",
        title: "Capture RPC failure simulation results",
        labels: ["testbench", "resilience"],
        difficulty: "hard" as const,
        acceptanceCriteria: [
          "Transient RPC failure scenario is recorded",
          "Permanent failure scenario includes operator guidance"
        ],
        status: "todo" as const
      }
    ];

    const testResults = [
      {
        id: "test-result-001",
        projectId: "project-phoenix-vault",
        scenario: "admin unauthorized deposit freeze",
        status: "passed" as const,
        durationMs: 128,
        timestamp
      },
      {
        id: "test-result-002",
        projectId: "project-horizon-escrow",
        scenario: "submit during RPC timeout",
        status: "failed" as const,
        durationMs: 930,
        failureReason: "Submission retry policy was not configured in mock mode.",
        timestamp
      }
    ];

    return {
      projects: mapProjectsReadiness(projects, risks, findings, tasks),
      risks,
      findings,
      tasks,
      testResults
    };
  }
}
