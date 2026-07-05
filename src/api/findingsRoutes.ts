import { Router } from "express";
import type { Store } from "../storage/store";

export const createFindingsRoutes = (store: Store) => {
  const router = Router();

  router.get("/findings", (_req, res) => {
    // TODO: pagination.
    // TODO: filtering.
    res.status(200).json({ data: store.listFindings() });
  });

  return router;
};
