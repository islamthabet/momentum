import { BasicCrud } from '@/utils/AbstractApi';
import { Goal } from '../interface/Goal.interface';
import { GoalForm } from '../interface/GoalForm.interface';

class GoalService extends BasicCrud<Goal, GoalForm> {}

export default new GoalService('goals');
