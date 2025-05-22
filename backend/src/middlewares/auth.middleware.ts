/*
  This middleware is responsible for protecting routes that require authentication.
  It checks for a valid JWT token in the Authorization header, verifies it,
  and attaches the corresponding user to the request object. If the token is missing,
  invalid, or the user does not exist, it responds with a 401 Unauthorized error.
*/

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
