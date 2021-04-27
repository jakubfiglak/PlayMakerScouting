import { Skill } from '../types/reports';
import { SkillsCategories } from '../types/ratings';

type GroupedReportSkills = Partial<Record<SkillsCategories, Skill[]>>;

type InputType = { category: SkillsCategories };

export function groupSkillsByCategory(skills?: Skill[]): GroupedReportSkills {
  const groupedSkills: GroupedReportSkills = {};

  skills?.forEach((skill) => {
    if (groupedSkills[skill.category]) {
      groupedSkills[skill.category]?.push(skill);
    } else {
      groupedSkills[skill.category] = [skill];
    }
  });

  return groupedSkills;
}
