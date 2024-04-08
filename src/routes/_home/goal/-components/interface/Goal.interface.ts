export interface Goal {
  id: string;
  title: string;
  description: string;
  priority: number;
  status: string;
  user: User;
  categories: Category[];
  tasks: Task[];
  completedTask: number;
  taskCount: number;
}

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  firstname: string;
  lastname: string;
  gender: any;
  birthday: any;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  title: string;
}

export interface Task {
  id: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  title: string;
  description: any;
  status: string;
  priority: number;
  dueDate: any;
  userId: number;
  goalId: number;
  version: number;
}
