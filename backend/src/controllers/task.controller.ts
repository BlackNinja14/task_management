import { Request, Response } from "express";
import Task from "../models/task.model";

export const getTasks = async (req: any, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

export const addTask = async (req: any, res: Response) => {
  try {
    const { name, description, date } = req.body;
    const task = await Task.create({
      user: req.user._id,
      name,
      description,
      date,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Failed to add task" });
  }
};
