import fs from "fs";
import path from "path";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/server/app";
import type { Task } from "../../src/types/task";
import type { TestResult } from "../../src/types/testResult";

describe("OpenAPI & Ecosystem Integrations Test Suite", () => {
  const app = createApp();

  it("verifies that docs/openapi.yaml exists and defines all current routes", () => {
    const openapiPath = path.resolve(__dirname, "../../docs/openapi.yaml");
    expect(fs.existsSync(openapiPath)).toBe(true);

    const openapiContent = fs.readFileSync(openapiPath, "utf-8");
    expect(openapiContent).toContain("openapi: 3.0.3");
    expect(openapiContent).toContain("/health:");
    expect(openapiContent).toContain("/projects:");
    expect(openapiContent).toContain("/risks:");
    expect(openapiContent).toContain("/findings:");
    expect(openapiContent).toContain("/tasks:");
    expect(openapiContent).toContain("/test-results:");
    expect(openapiContent).toContain("/index/mock:");
  });

  it("verifies that /tasks exposes Guard Kit integration fields (source & category)", async () => {
    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);

    const guardKitTask = response.body.data.find(
      (task: Task) => task.source === "guard-kit"
    );
    expect(guardKitTask).toBeDefined();
    expect(guardKitTask?.category).toBe("authorization");
    expect(guardKitTask?.labels).toContain("guard-kit");
  });

  it("verifies that /test-results exposes Soroban Testbench simulation data", async () => {
    const response = await request(app).get("/test-results");

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);

    const rpcFailureResult = response.body.data.find(
      (res: TestResult) => res.simulationType === "rpc_failure"
    );
    expect(rpcFailureResult).toBeDefined();
    expect(rpcFailureResult?.rpcDetails).toBeDefined();
    expect(rpcFailureResult?.rpcDetails?.endpoint).toContain("soroban-testnet");
    expect(rpcFailureResult?.rpcDetails?.transient).toBe(true);
  });
});
