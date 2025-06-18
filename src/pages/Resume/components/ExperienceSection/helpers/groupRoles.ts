// filepath: /src/components/ResumeSectionRole/groupRoles.ts
import { ExperienceCardProps } from '@pages/Resume/components/ExperienceCard';

export type GroupedRole = ExperienceCardProps | [ExperienceCardProps, ExperienceCardProps];

export function groupRoles(roles: ExperienceCardProps[]): GroupedRole[] {
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