import express from "express";
import { PORT } from "../src/env"
import authRoutes from "./routes/auth";
import itemRoutes from "./routes/items";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);
app.use("/items", itemRoutes);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
