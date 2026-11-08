import { Router } from "express";
import type { Store } from "../storage/store";

export const createTestResultsRoutes = (store: Store) => {
  const router = Router();

  router.get("/test-results", (req, res) => {
    let results = store.listTestResults();
    const { status, projectId, simulationType } = req.query;

    if (typeof status === "string") {
      results = results.filter((r) => r.status === status);
    }
    if (typeof projectId === "string") {
      results = results.filter((r) => r.projectId === projectId);
    }
    if (typeof simulationType === "string") {
      results = results.filter((r) => r.simulationType === simulationType);
    }

    res.status(200).json({ data: results });
  });

  return router;
};
