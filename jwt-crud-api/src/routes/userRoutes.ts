import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";


const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, (req, res) => {
  const user = (req as any).user;
  res.json({ message: "Welcome to your profile", user });
});

export default router;
