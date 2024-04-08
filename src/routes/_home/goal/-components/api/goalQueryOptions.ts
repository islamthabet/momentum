import { queryOptions, useMutation } from '@tanstack/react-query';
import goalService from './goal.api';
import { queryClient } from '@/main';
import { GoalForm } from '../interface/GoalForm.interface';
import { Goal } from '../interface/Goal.interface';

export const goalsQueryOptions = queryOptions({
  initialData: [],
  queryKey: ['goals'],
  queryFn: () => goalService.getAll(),
});

export const goalQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['goals', id],
    queryFn: () => goalService.getOne(id),
  });

export const useCreateGoalMutation = () => {
  return useMutation({
    mutationKey: ['goals', 'create'],
    mutationFn: (data: GoalForm) => goalService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gaols'] }),
  });
};

export const useUpdateGoalMutation = () => {
  return useMutation({
    mutationKey: ['goals', 'update'],
    mutationFn: (data: Partial<Goal>) => goalService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useDeleteGoalMutation = (id: string) => {
  return useMutation({
    mutationKey: ['goal', 'delete', id],
    mutationFn: () => goalService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
