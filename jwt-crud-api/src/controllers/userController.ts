import { Request, Response } from "express";
import {users} from "../models/userModel";
import jwt from "jsonwebtoken";

let userId = 1;
const JWT_SECRET = "your_secret_key";

export const registerUser = (req: Request, res: Response) => {
    const {email, password} = req.body;

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" }); 
    }

    const newUser = { id: userId++, email, password };
    users.push(newUser);

  // For now, just test it's working
    res.status(201).json({ message: "User registered successfully" });
};



export const loginUser = (req: Request, res: Response) => {
    const {email, password} = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if(!user) {
         return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "5m", 
        // Token expires in 5 minutes// 
        });
  res.status(200).json({ message: "User logged in successfully", token});
};
