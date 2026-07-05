import cors from "cors";
import express from "express";
import { createFindingsRoutes } from "../api/findingsRoutes";
import { createHealthRoutes } from "../api/healthRoutes";
import { createProjectsRoutes } from "../api/projectsRoutes";
import { createRisksRoutes } from "../api/risksRoutes";
import { createTasksRoutes } from "../api/tasksRoutes";
import { createTestResultsRoutes } from "../api/testResultsRoutes";
import { MockRiskAdapter } from "../indexer/mockRiskAdapter";
import { RiskIndexerService } from "../indexer/riskIndexerService";
import { MemoryStore } from "../storage/memoryStore";
import type { Store } from "../storage/store";

export interface AppDependencies {
  store?: Store;
  indexer?: RiskIndexerService;
}

export const createApp = (dependencies: AppDependencies = {}) => {
  const adapter = new MockRiskAdapter();
  const store = dependencies.store ?? new MemoryStore(adapter.loadSnapshot());
  const indexer = dependencies.indexer ?? new RiskIndexerService(store, adapter);
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(createHealthRoutes());
  app.use(createProjectsRoutes(store));
  app.use(createRisksRoutes(store));
  app.use(createFindingsRoutes(store));
  app.use(createTasksRoutes(store));
  app.use(createTestResultsRoutes(store));

  app.post("/index/mock", (_req, res) => {
    const snapshot = indexer.indexMockData();
    res.status(202).json({
      message: "Mock index completed",
      data: {
        projectCount: snapshot.projects.length,
        riskCount: snapshot.risks.length,
        findingCount: snapshot.findings.length,
        taskCount: snapshot.tasks.length,
        testResultCount: snapshot.testResults.length
      }
    });
  });

  app.use((_req, res) => {
    res.status(404).json({ error: "Route not found" });
  });

  return app;
};
