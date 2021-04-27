import { SkillsCategories } from '../types/ratings';

type GroupedReportSkills<T> = Partial<Record<SkillsCategories, T[]>>;

type InputType = { category: SkillsCategories };

export function groupSkillsByCategory<T extends InputType>(
  skills: T[],
): GroupedReportSkills<T> {
  const groupedSkills: GroupedReportSkills<T> = {};

  skills?.forEach((skill) => {
    if (groupedSkills[skill.category]) {
      groupedSkills[skill.category]?.push(skill);
    } else {
      groupedSkills[skill.category] = [skill];
    }
  });

  return groupedSkills;
}
