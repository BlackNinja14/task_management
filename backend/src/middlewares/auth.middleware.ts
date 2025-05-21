import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    let token;

    try {
        if (req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                res.status(401).json({ message: "User not found" });
                return;
            }

            next();
        } else {
            res.status(401).json({ message: "No token provided" });
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
