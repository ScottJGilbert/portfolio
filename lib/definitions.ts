export type Expertise = {
  expertise_id: number;
  name: string;
  image_url: string;
  category: string;
};

export type Experience = {
  experience_id: number;
  title: string;
  organization: string;
  start_date: Date;
  end_date: Date | null;
  markdown: string;
  expertise: Expertise[];
  self_employed: boolean;
  volunteer: boolean;
};

export type Project = {
  project_id: number;
  title: string;
  start_date: Date;
  end_date: Date | null;
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

export type ItemMetadata = {
  title: string;
  description: string;
};

export type Item = {
  title: string;
  date_one: string;
  date_two: string;
  description: string;
  categories: string[];
  slug: string;
  image_url: string;
};

export type ItemWithMarkdown = {
  title: string;
  date_one: string;
  date_two: string;
  description: string;
  categories: string[];
  slug: string;
  markdown: string;
  image_url: string;
};

export type ImageData = {
  name: string;
  url: string;
};

export type Message = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  message: string;
  time_sent: Date;
};
