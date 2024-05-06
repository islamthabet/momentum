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

export interface Permission {
  id: number;
  name: string;
  action: string;
  subject: string;
  conditions: any;
}

export interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

export interface User {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  firstname?: string;
  lastname?: string;
  gender?: any;
  birthday?: any;
  username: string;
  email: string;
  profileImage: string;

  role: Role;
}

export interface Category {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  title: string;
}

export interface Task {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  title: string;
  description: any;
  status: string;
  priority: number;
  dueDate: any;
  userId: number;
  goalId: number;
  version: number;
  user: User;
  goal: Goal;
}
