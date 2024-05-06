import axiosInstance from '@/config/axiosInstance';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Task } from './-components/interface/Goal.interface';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import { LiaCalendarWeekSolid } from 'react-icons/lia';
import { IRes } from '@/utils/AbstractApi';

// import { IoCalendarNumberOutline } from 'react-icons/io5';

export const taskQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['tasks', id],
    queryFn: async (): Promise<IRes<Task>> => (await axiosInstance.get('tasks/' + id)).data,
  });

export const Route = createFileRoute('/_home/goal/tasks/$taskId')({
  loader: async ({ params, context }) => {
    return context.queryClient.ensureQueryData(taskQueryOptions(params.taskId));
  },

  component: GoalTasks,
});

function GoalTasks() {
  const { taskId } = Route.useParams();
  const { data: task } = useSuspenseQuery(taskQueryOptions(taskId));
  const [startDate, setStartDate] = useState(new Date(task.data.dueDate ?? new Date()));
  return (
    <div className="p-4">
      <div className=" border-b pb-1.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-start border-r border-r-zinc-400 pr-4">
            <input type="checkbox" checked={task.data.status === 'DONE'} className="checkbox checkbox-sm" />
          </div>
          <div className="flex-grow">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date!)}
              showTimeInput={false}
              customInput={
                <div className="flex cursor-pointer select-none items-center gap-2 rounded-md px-5 py-1 text-purple-700 transition-all duration-200 ease-in-out hover:bg-purple-200 active:scale-95">
                  <LiaCalendarWeekSolid />
                  <span>Due Date</span>
                </div>
              }
              minDate={new Date()}
              //   minTime={new Date()}
              //   monthsShown={2}
              monthClassName={(month) => 'text-red-200 bg-red-500'}
              calendarClassName="bg-red-200 text-red-600"
              calendarIconClassname="text-red-800"
              //   dropdownMode="scroll"
              focusSelectedMonth
              //   selectedDates={}
              //   wrapperClassName="bg-red-200"

              //   renderCustomHeader={(d) => <div>{d./}</di>}
              renderDayContents={(d) => <div className="cursor-pointer rounded-md py-2 font-poppins text-xs">{d}</div>}
              showTimeSelect
              allowSameDay
              adjustDateOnChange
              calendarStartDay={0}
              dateFormat={'dd/MM/YY hh:mm aa'}
              locale={'en'}
              title="select due date"
              clearButtonClassName="bg-red-200 text-red-500"
              clearButtonTitle="clear the date"
            />
          </div>
        </div>
      </div>
      <div className="mt-2 space-y-2">
        <div className="text-xs text-zinc-500">Goal {task.data.goal.title}</div>
        <div className="text-sm font-medium capitalize text-zinc-600">{task.data.title}</div>
        <textarea name="" id="" value={task.data.description ?? ''} className="textarea w-full resize-none"></textarea>
      </div>
      <div className="mt-2 grid grid-cols-2 items-center justify-center gap-1">
        <div
          data-tip="assign to"
          className="tooltip tooltip-bottom inline rounded-md bg-indigo-200 px-4 py-1 text-center text-xs text-indigo-700"
        >
          {task.data.user.username}
        </div>
        <div
          className="tooltip tooltip-bottom inline rounded-md bg-red-200 px-4 py-1 text-center text-xs text-red-700"
          data-tip="Create at"
        >
          {new Date(task.data.createdAt).toLocaleString('en-Us', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}
