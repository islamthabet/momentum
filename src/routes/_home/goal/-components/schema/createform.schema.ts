import z from 'zod';

export const createFormSchema = z.object({
  title: z.string().min(3).max(255),
  categories: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
    })
  ),
  priority: z.number().min(0),
});
