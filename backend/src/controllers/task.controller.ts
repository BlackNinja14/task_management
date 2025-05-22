import { Request, Response } from "express";
import Task from "../models/task.model";

/** 
 * Controller to get tasks for the logged-in user, with search and pagination
 */
export const getTasks = async (req: any, res: Response) => {
  try {
    const userId = req.user._id;
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const query = {
      user: userId,
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };

    const total = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Tasks fetched successfully",
      code: 200,
      data: {
        tasks,
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", code: 500 });
  }
};

/** 
 * Controller to add a new task for the logged-in user
 */

export const addTask = async (req: any, res: Response) => {
  try {
    const { name, description, date } = req.body;
    const task = await Task.create({
      user: req.user._id,
      name,
      description,
      date,
    });
    res.status(201).json({
      message: "Task added successfully",
      code: 201,
      data: task,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add task", code: 500 });
  }
};
