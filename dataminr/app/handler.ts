
import { Handler, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';

const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

import TaskController from './controller/tasks';
import TasksListsController from './controller/tasksList';

export const create: Handler = (event: any, context: Context) => TaskController.create(event, context);
export const find: Handler = () => TaskController.find();
export const findById: Handler = (event: any, context: Context) => TaskController.findById(event, context);
export const deleteById: Handler = (event: any) => TaskController.deleteById(event);

export const createTaskList: Handler = (event: any, context: Context) => TasksListsController.create(event, context);

export const findAllTaskList: Handler = (event: any, context: Context) => TasksListsController.find(event, context);
export const findTaskListById: Handler = (event: any, context: Context) => TasksListsController.findById(event, context);
export const addTask: Handler = (event: any, context: Context) => TasksListsController.addTask(event, context);
export const removeTask: Handler = (event: any, context: Context) => TasksListsController.removeTask(event, context);
