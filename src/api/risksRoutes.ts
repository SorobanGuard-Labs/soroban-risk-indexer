import { Router } from "express";
import type { Store } from "../storage/store";

export const createRisksRoutes = (store: Store) => {
  const router = Router();

  router.get("/risks", (_req, res) => {
    // TODO: pagination.
    // TODO: filtering.
    res.status(200).json({ data: store.listRisks() });
  });

  return router;
};
