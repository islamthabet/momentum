import { queryOptions, useMutation } from '@tanstack/react-query';
import categoryService from './categories.api';
import { queryClient } from '@/main';

export const categoriesQueryOptions = queryOptions({
  queryKey: ['categories'],
  queryFn: () => categoryService.getAll(),
});

export const categoryQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['categories', id],
    queryFn: () => categoryService.getOne(id),
  });

export const useCreateCategoryMutation = () => {
  return useMutation({
    mutationKey: ['categories', 'create'],
    mutationFn: categoryService.create,
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Create Category',
    },
  });
};

export const useUpdateCategoryMutation = (id: string) => {
  return useMutation({
    mutationKey: ['categories', 'update', id],
    mutationFn: categoryService.update,
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Update Category',
    },
  });
};

export const useDeleteCategoryMutation = (id: string) => {
  return useMutation({
    mutationKey: ['categories', 'delete', id],
    mutationFn: () => categoryService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Delete Category',
    },
  });
};
