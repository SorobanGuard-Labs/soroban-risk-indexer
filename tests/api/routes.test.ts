import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/server/app";

describe("api routes", () => {
  const app = createApp();

  it("returns service health", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
      service: "soroban-risk-indexer"
    });
  });

  it.each([
    ["/projects", "name"],
    ["/risks", "title"],
    ["/findings", "summary"],
    ["/tasks", "acceptanceCriteria"],
    ["/test-results", "scenario"]
  ])("returns mock data for %s", async (path, expectedProperty) => {
    const response = await request(app).get(path);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toHaveProperty(expectedProperty);
  });

  it("runs mock indexing", async () => {
    const response = await request(app).post("/index/mock");

    expect(response.status).toBe(202);
    expect(response.body.data).toMatchObject({
      projectCount: 2,
      riskCount: 3,
      findingCount: 2,
      taskCount: 3,
      testResultCount: 2
    });
  });

  it("filters test results by status and simulationType", async () => {
    const failedResponse = await request(app).get("/test-results?status=failed");
    expect(failedResponse.status).toBe(200);
    expect(failedResponse.body.data.length).toBe(1);
    expect(failedResponse.body.data[0].status).toBe("failed");
    expect(failedResponse.body.data[0].simulationType).toBe("rpc_failure");
    expect(failedResponse.body.data[0].rpcDetails).toBeDefined();
    expect(failedResponse.body.data[0].rpcDetails.transient).toBe(true);

    const authResponse = await request(app).get("/test-results?simulationType=auth_boundary");
    expect(authResponse.status).toBe(200);
    expect(authResponse.body.data.length).toBe(1);
    expect(authResponse.body.data[0].scenario).toBe("admin unauthorized deposit freeze");
  });

  it("returns a 404 for unknown routes", async () => {
    const response = await request(app).get("/missing");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Route not found" });
  });
});
