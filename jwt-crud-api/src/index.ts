import express from "express";
import userRoutes from "./routes/userRoutes"
import profileRoutes from "./routes/profile";
import authRoutes from "./routes/auth";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello JWT CRUD API!");
});
app.use(express.json());
app.use(authRoutes);
app.use("/api", userRoutes);
app.use("/auth", authRoutes)
app.use("/profile", profileRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
