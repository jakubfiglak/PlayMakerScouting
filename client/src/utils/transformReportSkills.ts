import { Skill, SkillsCategories } from '../types/reports';

type TransformedReportSkills = Partial<Record<SkillsCategories, Skill[]>>;

export function transformReportSkills(
  skills?: Skill[],
): TransformedReportSkills {
  const transformedSkills: TransformedReportSkills = {};

  skills?.forEach((skill) => {
    if (transformedSkills[skill.category]) {
      transformedSkills[skill.category]?.push(skill);
    } else {
      transformedSkills[skill.category] = [skill];
    }
  });

  return transformedSkills;
}
