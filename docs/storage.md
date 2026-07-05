# Storage

The repository currently ships with `MemoryStore`, a development and test implementation of the `Store` interface.

## Current behavior

- Data is stored in process memory.
- `replaceAll` atomically swaps the current snapshot.
- Read methods return defensive copies so callers do not mutate store internals.

## Future storage

- TODO: database adapter.

Candidate implementations can use the existing `Store` interface as their contract and keep route modules unchanged.
