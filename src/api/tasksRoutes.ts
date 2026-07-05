import { Router } from "express";
import type { Store } from "../storage/store";

export const createTasksRoutes = (store: Store) => {
  const router = Router();

  router.get("/tasks", (_req, res) => {
    // TODO: pagination.
    // TODO: filtering.
    res.status(200).json({ data: store.listTasks() });
  });

  return router;
};
