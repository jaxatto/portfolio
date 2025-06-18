// filepath: /src/components/ResumeSectionRole/groupRoles.ts
import { ResumeRoleProps } from '@components/ResumeRole';

export type GroupedRole = ResumeRoleProps | [ResumeRoleProps, ResumeRoleProps];

export function groupRoles(roles: ResumeRoleProps[]): GroupedRole[] {
  const grouped: GroupedRole[] = [];
  let i = 0;
  while (i < roles.length) {
    if (
      roles[i].company === 'Visa' &&
      roles[i + 1] &&
      roles[i + 1].company === 'Visa'
    ) {
      grouped.push([roles[i], roles[i + 1]]);
      i += 2;
    } else {
      grouped.push(roles[i]);
      i += 1;
    }
  }
  return grouped;
}