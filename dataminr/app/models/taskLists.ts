import Task from "./tasks";

export default interface TaskList {
  id: number;
  title: string;
  readonly createdAt: Date;
  updatedAt: Date;
  tasks: Task[];
}
