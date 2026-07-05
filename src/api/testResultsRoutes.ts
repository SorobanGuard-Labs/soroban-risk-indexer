import { Router } from "express";
import type { Store } from "../storage/store";

export const createTestResultsRoutes = (store: Store) => {
  const router = Router();

  router.get("/test-results", (_req, res) => {
    // TODO: pagination.
    // TODO: filtering.
    res.status(200).json({ data: store.listTestResults() });
  });

  return router;
};
