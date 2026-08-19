import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const requiredKeys = ["MONGODB_URI", "JWT_SECRET", "CLIENT_ORIGIN"] as const;

for (const key of requiredKeys) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT ?? 5001),
  mongoUri: process.env.MONGODB_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  clientOrigin: process.env.CLIENT_ORIGIN as string,
};
