export type Network = "testnet" | "mainnet" | "futurenet" | "local";

export interface Project {
  id: string;
  name: string;
  repositoryUrl: string;
  network: Network;
  readinessScore: number;
  riskScore: number;
}
