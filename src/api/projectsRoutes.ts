import { Router } from "express";
import type { Store } from "../storage/store";

export const createProjectsRoutes = (store: Store) => {
  const router = Router();

  router.get("/projects", (_req, res) => {
    // TODO: pagination.
    // TODO: filtering.
    res.status(200).json({ data: store.listProjects() });
  });

  return router;
};
