import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env";

type TokenPayload = { id: number; email: string; iat: number; exp: number };

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization; // expected: "Bearer <token>"
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  const token = header.slice("Bearer ".length).trim();
  try {
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.user = { id: payload.id, email: payload.email };
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
