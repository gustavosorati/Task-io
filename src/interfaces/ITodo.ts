export interface ITask {
  id: string;
  title: string;
  description?: string;
  status: "in progress" | "completed";
}

export interface IColumns {
  id: string;
  name: string;
  items: ITask[]
}