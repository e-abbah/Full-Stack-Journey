import { Router, Request, Response } from "express";
import { protect } from "../middleware/authMiddleware";
import { prisma } from "../prisma";

const router = Router();

// Dummy user storage (in-memory)
const users: any[] = [];

router.get("/", protect, (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({ profile: user });
});

// router.put("/", protect, (req: Request, res: Response) => {
//   const { name, email } = req.body;
//   const user = (req as any).user;

//   // You can update from actual DB or file instead
//   user.name = name || user.name;
//   user.email = email || user.email;

//   res.json({ message: "Profile updated", user });
// });

// router.delete("/", protect, (req: Request, res: Response) => {
//   const user = (req as any).user;

//   // If using DB, delete from DB. For now, just respond.
//   res.json({ message: `User ${user.id} deleted (simulate)` });
// });

router.put("/", protect, async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const userFromToken = (req as any).user;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userFromToken.id },
      data: {
        name,
        email,
      },
    });

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
});


router.delete("/", protect, async (req: Request, res: Response) => {
  const userFromToken = (req as any).user;

  try {
    await prisma.user.delete({
      where: { id: userFromToken.id },
    });

    res.json({ message: `User ${userFromToken.id} deleted (simulated)` });
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
});

export default router;
