export type Project = {
  project_id: number;
  title: string;
  description: string;
  categories: string[];
  slug: string;
  image_url: string;
};

export type Post = {
  post_id: number;
  title: string;
  creation_date: Date;
  edit_date: Date;
  description: string;
  categories: string[];
  slug: string;
  image_url: string;
};

export type Expertise = {
  expertise_id: number;
  name: string;
  image_url: string;
  category: string;
};

export type Item = {
  title: string;
  creation_date: string;
  edit_date: string;
  description: string;
  categories: string[];
  slug: string;
  image_url: string;
};

export type ItemWithMarkdown = {
  title: string;
  creation_date: string;
  edit_date: string;
  description: string;
  categories: string[];
  slug: string;
  markdown: string;
  image_url: string;
};
