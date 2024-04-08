import { BasicCrud } from '../AbstractApi';
import { Category } from '@/routes/_home/goal/-components/interface/Goal.interface';

class CategoryService extends BasicCrud<Category, Record<string, string>> {
  constructor() {
    super('categories');
  }
}

export default new CategoryService();
