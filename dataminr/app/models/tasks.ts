export default interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  readonly createdAt: Date;
  updatedAt: Date;
}
