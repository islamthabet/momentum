export const priorityMapping: Record<number, Record<string, string>> = {
  [1]: {
    label: 'none',
    color: 'rounded-3xl bg-gray-200 px-2 py-0.5 text-center text-xs text-primary-content',
  },
  [2]: {
    label: 'low',
    color: 'rounded-3xl bg-blue-200 px-2 py-0.5 text-center text-xs text-primary-content',
  },
  [3]: {
    label: 'medium',
    color: 'rounded-3xl bg-orange-200 px-2 py-0.5 text-center text-xs text-primary-content',
  },
  [4]: {
    label: 'high',
    color: 'rounded-3xl bg-red-300 px-2 py-0.5 text-center text-xs text-primary-content',
  },
  [5]: {
    label: 'urgent',
    color: 'rounded-3xl bg-purple-400 px-2 py-0.5 text-center text-xs text-primary-content',
  },
};
