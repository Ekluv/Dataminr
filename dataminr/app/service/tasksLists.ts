import { OkPacket } from "mysql2";

import db from "../models/db";
import { CreateTaskListDTO } from "../models/dto/taskDTO";
import TaskList from "../models/taskLists";


export default class TasksListService {
  static async create(
    params: CreateTaskListDTO
  ): Promise<{ taskListId: number }> {
    try {
      const result = await db.query(
        "INSERT INTO taskLists (title) VALUES (?)",
        [params.title]
      );
      const insertId = (<OkPacket>result).insertId;
      return { taskListId: insertId };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async find(id?: number): Promise<TaskList[]> {
    let queryTemplate = `SELECT tl.id, tl.title, t.id as task_id, t.title as task_title, t.description as task_description
    FROM taskLists as tl
    LEFT JOIN tasksOnLists as tol ON tl.id=tol.taskListId
    LEFT JOIN tasks AS t ON t.id=tol.taskId
    `;
    try {
      let result;
      if (id) {
        queryTemplate += `where tl.id= ? `
        result = await db.query(queryTemplate, [id]);
      } else {
        result = await db.query(queryTemplate);
      }
      const data = {};
      for (let item of result) {
        data[item.id] = data[item.id] || {
          id: item.id,
          title: item.title,
          tasks: [],
        };
        if (item.task_id) {
          data[item.id].tasks.push({
            id: item.task_id,
            title: item.task_title,
            description: item.description,
          });
        }
      }
      return Object.values(data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async addTask(taskId: number, taskListId: number): Promise<any>{
    try {
      const result = await db.query(
        'INSERT INTO tasksOnLists (taskId, taskListId) VALUES (?, ?)',
        [taskId, taskListId]
      );
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async removeTask(taskId: number, taskListId: number): Promise<any>{
    try {
      const result = await db.query(
        'DELETE FROM tasksOnLists where taskId= ? and taskListId= ?',
        [taskId, taskListId]
      );
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
