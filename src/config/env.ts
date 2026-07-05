import dotenv from "dotenv";

dotenv.config();

const readBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) {
    return fallback;
  }

  return value.toLowerCase() === "true";
};

export const env = {
  port: Number(process.env.PORT ?? 4100),
  mockMode: readBoolean(process.env.SOROBAN_RISK_INDEXER_MOCK_MODE, true)
};
