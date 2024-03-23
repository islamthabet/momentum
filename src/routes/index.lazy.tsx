import {createFileRoute} from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/')({
  component: Index,
  validateSearch: z.object({
    page: z.number().catch(1),
  }),
});

function Index() {
  return (
    <div className='p-2'>
      <h3>Welcome</h3>
    </div>
  );
}
