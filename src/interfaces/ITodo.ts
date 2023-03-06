export interface ITask {
  id: string;
  content: string;
}

export interface IColumns {
  id: string;
  name: string;
  items: ITask[]
}