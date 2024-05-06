import Overlay from '@/components/ui/Overlay';
import axiosInstance from '@/config/axiosInstance';
import { routesEnum } from '@/enum/routes.enum';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button, Input } from 'antd';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/_home/users/edit/$id')({
  component: EditUser,
  loader: async (opt) => {
    return (await axiosInstance.get('/users/' + opt.params.id)).data;
  },
});

function EditUser() {
  const queryClient = useQueryClient();

  const ref = useRef<HTMLDivElement>(null);
  const data = Route.useLoaderData();
  const { id } = Route.useParams();
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState(data.name);
  const [isSubmit, setIsSubmit] = useState(false);

  console.log(isSubmit);

  return (
    <Overlay isOpen={isOpen} to={`/${routesEnum.users}`} childRef={ref}>
      <div ref={ref}>
        <form
          className="rounded-lg bg-white p-4 shadow-lg"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await toast.promise(axiosInstance.patch(`${routesEnum.users}/${id}`, { name }), {
                pending: 'updating the role',
                success: 'role updated successfully',
                error: 'something went wrong',
              });
              setIsSubmit(false);
              setIsOpen(false);
              queryClient.invalidateQueries({ queryKey: [routesEnum.users] });
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <h4>Edit Role</h4>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)}></Input>
          <div className="mt-2 flex w-full gap-2">
            <Button block type="default" htmlType="submit">
              Submit
            </Button>
            <Button block type="text" danger onClick={() => setIsOpen(false)} htmlType="button">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Overlay>
  );
}
