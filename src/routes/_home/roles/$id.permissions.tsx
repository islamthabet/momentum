import axiosInstance from '@/config/axiosInstance';
import { createFileRoute, useBlocker } from '@tanstack/react-router';
import { Role } from '../goal/-components/interface/Goal.interface';
import Overlay from '@/components/ui/Overlay';
import { Button, Checkbox } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import { useQueryClient } from '@tanstack/react-query';
import { routesEnum } from '@/enum/routes.enum';

const permissions: Array<routesEnum> = [
  routesEnum.roles,
  routesEnum.users,
  routesEnum.goals,
  routesEnum.tasks,
  routesEnum.diaries,
  routesEnum.habits,
];
const actions = ['manage', 'read', 'create', 'update', 'delete'];

const checkChecked = (obj: Record<string, Array<string>>, p: string, a: string) => {
  return (
    obj[p] &&
    (obj[p].includes(a) || obj[p].includes('manage') || (!obj[p].includes('read') && obj[p].length > 0 && a === 'read'))
  );
};
const checkDisabled = (obj: Record<string, Array<string>>, p: string, a: string) => {
  return (
    obj[p] &&
    ((obj[p].includes('manage') && a !== 'manage') || (!obj[p].includes('read') && obj[p].length > 0 && a === 'read'))
  );
};
export const Route = createFileRoute('/_home/roles/$id/permissions')({
  loader: async (opt) => {
    const res = await axiosInstance.get<Role>('/roles/' + opt.params.id);
    return res.data;
  },
  component: Permissions,
});

function Permissions() {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLDivElement>(null);
  const role: Role = Route.useLoaderData();
  const [isOpen, setIsOpen] = useState(true);

  const userPer: Record<string, Array<string>> = useMemo(() => {
    const per: Record<string, Array<string>> = {};
    role.permissions.forEach((p) => {
      if (per[p.subject]) {
        per[p.subject].push(p.action);
      } else {
        per[p.subject] = [p.action];
      }
    });
    return per;
  }, [role]);

  const [selectedPer, setSelectedPer] = useState<Record<string, string[]>>(userPer);

  const isSame = isEqual(userPer, selectedPer);
  useBlocker(() => window.confirm('the changes will be discard are you sure?'), !isSame);
  const submit = async () => {
    const permissionsData = [];
    for (const subject in selectedPer) {
      const actions = selectedPer[subject];
      if (actions.length > 0) {
        for (const action of actions) {
          permissionsData.push({ subject, action, roleId: +role.id });
        }
      }
    }
    await axiosInstance.patch(`/${routesEnum.permissions}/role/${role.id}`, permissionsData);
    queryClient.invalidateQueries({ queryKey: [routesEnum.roles] });
    setIsOpen(false);
  };
  return (
    <Overlay isOpen={isOpen} to={`/${routesEnum.roles}`} childRef={ref}>
      <div className="rounded-lg bg-white p-6 shadow-lg" ref={ref}>
        <div className="grid grid-cols-3 gap-4 ">
          {permissions.map((p) => {
            return (
              <div key={p + 'role'} className="shadow=sm relative rounded border p-4">
                <div className="absolute -top-3 left-2 z-10 bg-white pl-1 pr-6 capitalize text-zinc-600">{p}</div>
                <div className="flex flex-col">
                  {actions.map((a) => {
                    return (
                      <div className="flex gap-2" key={p + a}>
                        <Checkbox
                          id={p + a}
                          checked={checkChecked(selectedPer, p, a)}
                          disabled={checkDisabled(selectedPer, p, a)}
                          onChange={() => {
                            const permissions = structuredClone(selectedPer);
                            if (permissions[p]) {
                              if (permissions[p].includes(a)) {
                                const i = permissions[p].indexOf(a);
                                permissions[p].splice(i, 1);
                              } else {
                                permissions[p].push(a);
                                console.log(permissions[p]);
                              }
                            } else {
                              permissions[p] = [a];
                            }
                            setSelectedPer(permissions);
                          }}
                        />
                        <label className="text-sm capitalize" htmlFor={p + a}>
                          {a}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex gap-4">
          <Button disabled={isSame} block onClick={submit}>
            Save
          </Button>
          <Button block danger onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
