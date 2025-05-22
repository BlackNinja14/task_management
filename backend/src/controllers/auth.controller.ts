import { Request, Response } from "express";
import User from "../models/user.model";
import generateToken from "../utils/generateToken";

//  i'm just adding this swagger for auth routes only.
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: NB Test
 *               email:
 *                 type: string
 *                 example: nbtest@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 code:
 *                   type: integer
 *                   example: 201
 *       400:
 *         description: User already exists or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists
 *                 code:
 *                   type: integer
 *                   example: 400
 */

/**
 * Register a new user
 * Checks if the user already exists, creates a new user if not, and returns a success or error response.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: "User already exists", code: 400 });
        return;
    }

    const user = await User.create({ name, email, password });

    if (user) {
        res.status(201).json({
            message: "User registered successfully",
            code: 201,
        });
    } else {
        res.status(400).json({ message: "Invalid user data", code: 400 });
    }
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: nbtest@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64d88c9b1d6caa2b48a1d234
 *                     name:
 *                       type: string
 *                       example: NB Test
 *                     email:
 *                       type: string
 *                       example: nbtest@example.com
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *                 code:
 *                   type: integer
 *                   example: 401
 */

/**
 * Login a user
 * Checks credentials, generates a JWT token if valid, and returns user info and token.
 */
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await user.matchPassword(password)) {
        res.json({
            message: "User logged in successfully",
            code: 200,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(`${user._id}`)
            }
        });
    } else {
        res.status(400).json({ message: "Invalid credentials", code: 400 });
    }
};
