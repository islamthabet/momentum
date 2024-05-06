import Overlay from '@/components/ui/Overlay';
import axiosInstance from '@/config/axiosInstance';
import { routesEnum } from '@/enum/routes.enum';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/_home/users/delete/$id')({
  component: DeleteUser,
});

function DeleteUser() {
  const ref = useRef<HTMLDivElement>(null);

  const { id } = Route.useParams();
  const [isOpen, setIsOpen] = useState(true);
  const query = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationKey: ['delete', routesEnum.users],
    mutationFn: async () => {
      await axiosInstance.delete(routesEnum.users + '/' + id);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: [routesEnum.users] });
      setIsOpen(false);
    },
    onError: () => toast.error('we have error'),
  });
  return (
    <Overlay isOpen={isOpen} to={`/${routesEnum.users}`} childRef={ref}>
      <div className="rounded-lg bg-white p-4 shadow-lg" ref={ref}>
        Are You Sure You Want To Delete This Role?
        <div className="mt-2 flex w-full gap-2">
          <Button block onClick={() => mutateAsync()} type="default">
            Submit
          </Button>
          <Button block type="text" danger onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
