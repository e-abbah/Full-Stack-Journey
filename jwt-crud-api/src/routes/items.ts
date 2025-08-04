import { Router } from "express";
import { prisma } from "../prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// All /items routes require a valid token
router.use(requireAuth);

// GET /items — list your items
router.get("/", async (req, res) => {
  const items = await prisma.item.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: "desc" },
  });
  return res.json(items);
});

// POST /items — create an item you own
router.post("/", async (req, res) => {
  const { title, content } = req.body as { title?: string; content?: string };
  if (!title) return res.status(400).json({ message: "title is required" });

  const item = await prisma.item.create({
    data: { title, content, userId: req.user!.id },
  });
  return res.status(201).json(item);
});

// GET /items/:id — read one of your items
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid id" });

  const item = await prisma.item.findFirst({
    where: { id, userId: req.user!.id },
  });
  if (!item) return res.status(404).json({ message: "Not found" });
  return res.json(item);
});

// PATCH /items/:id — update your item
router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid id" });

  const exists = await prisma.item.findFirst({ where: { id, userId: req.user!.id } });
  if (!exists) return res.status(404).json({ message: "Not found" });

  const { title, content } = req.body as { title?: string; content?: string };
  const updated = await prisma.item.update({
    where: { id },
    data: { title, content },
  });
  return res.json(updated);
});

// DELETE /items/:id — delete your item
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid id" });

  const exists = await prisma.item.findFirst({ where: { id, userId: req.user!.id } });
  if (!exists) return res.status(404).json({ message: "Not found" });

  await prisma.item.delete({ where: { id } });
  return res.status(204).send();
});

export default router;
