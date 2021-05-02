export type SkillsCategories =
  | 'individual'
  | 'teamplay'
  | 'offense'
  | 'defense'
  | 'physical'
  | 'mental';

export type Rating = {
  id: string;
  category: SkillsCategories;
  author: string;
  name: string;
  shortName: string;
  score: boolean;
  private: boolean;
  createdAt: string;
  updatedAt: string;
};

export type RatingDTO = Omit<
  Rating,
  'id' | 'author' | 'private' | 'createdAt' | 'updatedAt'
>;
