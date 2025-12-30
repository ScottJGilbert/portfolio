import { auth } from "./auth";

export type Skill = {
  skill_id: number;
  name: string;
  image_url: string;
  category: "software" | "hardware" | "technical" | "soft";
  subcategory: string;
  parent_skill_id?: number | null;
};

export type SkillGroup = {
  parent: Skill;
  childGroups: Skill[][];
  unGroupedChildren: Skill[]; //Miscellaneous skills within the group
};

export type Experience = {
  experience_id: number;
  title: string;
  organization: string;
  start_date: Date;
  end_date: Date | null;
  markdown: string;
  skills: Skill[];
  self_employed: boolean;
  volunteer: boolean;
};

export type Project = {
  slug: string;
  title: string;
  start_date: Date;
  end_date: Date | null;
  description: string;
  categories: string[];
  image_url: string;
  skills: (Skill | string)[];
  item_id: number;
};

export type Post = {
  slug: string;
  title: string;
  creation_date: Date;
  edit_date: Date;
  description: string;
  categories: string[];
  image_url: string;
  item_id: number;
};

export type GridItem = {
  link: string;
  title: string;
  description: string;
  categories: string[];
  date_one: string;
  date_two: string; //Blank, "- Ongoing", or formatted date
  image_url: string;
};

export type Item = {
  id: number;
  markdown: string;
};

export type Comment = {
  id: number;
  user_id: string;
  item_id: number;
  content: string;
  edit_date: Date;
  edited: boolean;
  parent_comment_id: number | null;
};

export type ImageData = {
  name: string;
  url: string;
  key: string;
};

export type Attribution = {
  name: string;
  url: string;
  description: string;
};

export type Release = {
  key: string;
  project_key: string;
  version: string;
  release_date: Date;
  text: string;
  url: string;
  external: boolean;
};

export type User = typeof auth.$Infer.Session.user;
