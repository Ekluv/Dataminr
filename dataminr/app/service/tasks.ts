import { OkPacket } from "mysql2";
import Task from "../models/tasks";

import db from "../models/db";
import { CreateTaskDTO } from "../models/dto/taskDTO";

export default class TasksService {
  static async create(params: CreateTaskDTO): Promise<{taskId: number}> {
    try {
      const result = await db.query(
        "INSERT INTO tasks (title, description) VALUES (?, ?)",
        [params.title, params.description]
      );
      const insertId = (<OkPacket> result).insertId;
      return { taskId: insertId};
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async find(): Promise<Task[]> {
    try {
      const result: Task[] = await db.query(
        "select * from tasks",
      );
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }

  }

  static async findById(id: number): Promise<Task[]> {
    try {
      const task: Task[] = await db.query(
        "select * from tasks where id= ?",
        [id]
      );
      return task;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async deleteById(id: number): Promise<{affectedRows: number}> {
    try {
      const result = await db.query(
        "DELETE FROM tasks where id= ?",
        [id]
      );
      const affectedRows = (<OkPacket> result).affectedRows;
      return { affectedRows };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
