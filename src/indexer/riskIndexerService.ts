import type { Store, StoreSnapshot } from "../storage/store";
import type { RiskAdapter } from "./mockRiskAdapter";

export class RiskIndexerService {
  constructor(
    private readonly store: Store,
    private readonly adapter: RiskAdapter
  ) {}

  indexMockData(): StoreSnapshot {
    // TODO: database adapter.
    // TODO: integration with Guard Kit and Testbench.
    // TODO: GitHub issue import.
    // TODO: real test result ingestion.
    // TODO: Docker setup.
    const snapshot = this.adapter.loadSnapshot();
    return this.store.replaceAll(snapshot);
  }
}
