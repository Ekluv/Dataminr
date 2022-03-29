import { Context } from "aws-lambda";
import { ResponseDTO } from "../models/dto/responseDTO";
import { CreateTaskListDTO } from "../models/dto/taskDTO";
import TasksService from "../service/tasks";
import TasksListService from "../service/tasksLists";
import { MessageUtil, StatusCode } from "../utils/message";

export default class TasksListsController {
  static async create(event: any, context?: Context): Promise<ResponseDTO> {
    const params: CreateTaskListDTO = JSON.parse(event.body);
    try {
      const result = await TasksListService.create({
        title: params.title,
      });
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.message, StatusCode.BAD_REQUEST);
    }
  }

  static async find(event: any, context: Context): Promise<ResponseDTO> {
    try {
      const result = await TasksListService.find();
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.message, StatusCode.BAD_REQUEST);
    }
  }

  static async findById(event: any, context: Context): Promise<ResponseDTO> {
    const id: number = Number(event.pathParameters.id);
    try {
      const result = await TasksListService.find(id);
      if (result.length === 0) {
        return MessageUtil.error(
          'Not found',
          StatusCode.NOT_FOUND,
        );
      }
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.message, StatusCode.BAD_REQUEST);
    }
  }

  static async addTask(event: any, context: Context): Promise<ResponseDTO> {
    const id: number = Number(event.pathParameters.id);
    const { taskId } = JSON.parse(event.body);
    try {
      const taskList = await TasksListService.find(id);
      const task = await TasksService.findById(taskId);
      if (!task.length) {
        return MessageUtil.error('Task does not exist', StatusCode.BAD_REQUEST);
      }

      if (!taskList.length) {
        return MessageUtil.error('TaskList does not exist', StatusCode.BAD_REQUEST);
      }

      const result = await TasksListService.addTask(taskId, id);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.message, StatusCode.BAD_REQUEST);
    }
  }

  static async removeTask(event: any, context: Context) {
    const id: number = Number(event.pathParameters.id);
    const { taskId } = JSON.parse(event.body);
    try {
      const taskList = await TasksListService.find(id);
      const task = await TasksService.findById(taskId);
      if (!task.length) {
        return MessageUtil.error('Task does not exist', StatusCode.BAD_REQUEST);
      }

      if (!taskList.length) {
        return MessageUtil.error('TaskList does not exist', StatusCode.BAD_REQUEST);
      }

      const result = await TasksListService.removeTask(taskId, id);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.message, StatusCode.BAD_REQUEST);
    }
  }

}
