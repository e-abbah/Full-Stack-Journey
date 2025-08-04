import dotenv from "dotenv";
import path from "path";

// Load the root .env (outside src)
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
export const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// Optional: warn in dev if missing real secret
if (!process.env.JWT_SECRET) {
  console.warn("[WARN] JWT_SECRET not set; using dev-secret. Set it in .env for production.");
}
