// src/hooks/useAbilities.ts
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/config/state/features/authSlice';

export function useAbilities() {
  const { user } = useSelector(selectAuth);
  const ability = createMongoAbility();
  const { can, rules } = new AbilityBuilder(createMongoAbility);

  if (user?.role.permissions) {
    user?.role.permissions.forEach((perm) => {
      if (perm.action && perm.subject) {
        can(perm.action, perm.subject.toLowerCase());
      }
    });
  } else {
    ability.update([]);
  }
  ability.update(rules);

  return { ability };
}
