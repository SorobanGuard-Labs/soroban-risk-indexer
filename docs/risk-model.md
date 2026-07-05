# Risk Model

The initial risk model is intentionally simple and deterministic so maintainers can reason about scoring behavior in tests and pull requests.

## Severity weights

| Severity | Weight |
| --- | ---: |
| critical | 100 |
| high | 75 |
| medium | 45 |
| low | 20 |
| informational | 5 |

## Risk score

Risk score is the rounded average severity weight across open risks and unresolved findings for a project. Empty risk sets return `0`.

## Readiness score

Readiness score combines task completion and inverse risk:

```text
readiness = taskCompletion * 0.6 + (100 - riskScore) * 0.4
```

Scores are clamped to `0..100`.
