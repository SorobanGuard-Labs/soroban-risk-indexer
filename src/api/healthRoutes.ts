import { Router } from "express";

export const createHealthRoutes = () => {
  const router = Router();

  router.get("/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
      service: "soroban-risk-indexer"
    });
  });

  return router;
};
