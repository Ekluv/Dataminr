import { Context } from "aws-lambda";
import { ResponseDTO } from "../models/dto/responseDTO";
import { CreateTaskDTO } from "../models/dto/taskDTO";
import TasksService from "../service/tasks";
import { MessageUtil, StatusCode } from "../utils/message";

export default class TasksController {
  static async create(event: any, context?: Context): Promise<ResponseDTO> {
    const params: CreateTaskDTO = JSON.parse(event.body);
    try {
      const result = await TasksService.create({
        title: params.title,
        description: params.description,
      });
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.message, StatusCode.BAD_REQUEST);
    }
  }

  static async find(): Promise<ResponseDTO> {
    try {
      const result = await TasksService.find();
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.message, StatusCode.BAD_REQUEST);
    }
  }

  static async findById(event: any, context: Context): Promise<ResponseDTO> {
    const id: number = Number(event.pathParameters.id);
    try {
      const result = await TasksService.findById(id);
      if (result.length === 0) {
        return MessageUtil.error(
          'Not found',
          StatusCode.NOT_FOUND,
        );
      }
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  static async deleteById(event: any): Promise<ResponseDTO> {
    const id: number = event.pathParameters.id;
    try {
      const result = await TasksService.deleteById(id);
      if (result.affectedRows === 0) {
        return MessageUtil.error(
          'The data was not found!',
          StatusCode.NOT_FOUND
        );
      }
      return MessageUtil.success({ deleted: true });
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.message, StatusCode.BAD_REQUEST);
    }
  }
}
