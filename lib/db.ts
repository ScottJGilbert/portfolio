"use server";

// lib/db.js
import { Project, Post, Expertise } from "./definitions";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchProjectSlugs() {
  try {
    const data = await sql<{ slug: string }[]>`
    SELECT slug FROM projects;
    `;
    const slugs = data.map((row) => row.slug);
    return slugs;
  } catch (err) {
    console.error("Error fetching project slugs: ", err);
    return [""];
  }
}

export async function fetchProjectCategories() {
  const totalCategories: string[] = [];
  try {
    const data = await sql<
      { categories: string[] }[]
    >`SELECT categories FROM projects;`;
    for (const array of data) {
      for (let i = 0; i < array.categories.length; i++) {
        const string = array.categories[i];
        if (!totalCategories.includes(string)) {
          totalCategories.push(string);
        }
      }
    }
    totalCategories.sort();
  } catch (err) {
    console.error("Error fetching project categories: ", err);
  }
  return totalCategories;
}

export async function fetchProjects(query: string, categories: string[]) {
  try {
    if (categories.length === 0) {
      const data = await sql<Project[]>`
      SELECT 
        project_id, 
        title, 
        description, 
        categories, 
        slug,
        image_url 
      FROM projects 
      WHERE 
        title ILIKE ${`%${query}%`} OR 
        description ILIKE ${`%${query}%`};
      `;
      return data;
    } else {
      const allCategories = await fetchProjectCategories();
      for (const category of categories) {
        if (!allCategories.includes(category)) {
          throw category + "was not found in projects.";
        }
      }
      const results: Project[] = [];

      for (const category of categories) {
        const data = await sql<Project[]>`
        SELECT 
          project_id, 
          title, 
          description, 
          categories, 
          slug,
          image_url 
        FROM projects 
        WHERE 
          ${category} = ANY(categories) AND
          (title ILIKE ${`%${query}%`} OR 
          description ILIKE ${`%${query}%`});
        `;
        results.push(...data);
      }
      const unique = Array.from(
        new Map(results.map((p) => [p.project_id, p])).values()
      );
      return unique;
    }
  } catch (err) {
    console.error("Error fetching projects:", err);
    return [];
  }
}

export async function fetchProject(slug: string) {
  try {
    const data = await sql<Project[]>`
      SELECT 
        project_id, 
        title, 
        description, 
        categories, 
        slug,
        image_url 
      FROM projects 
      WHERE slug = ${slug};
    `;
    const data_markdown = await sql<{ markdown: string }[]>`
      SELECT 
        markdown 
      FROM projects
      WHERE slug = ${slug};
      `;
    return [data[0] as Project, data_markdown[0].markdown];
  } catch (err) {
    console.error("Error fetching projects:", err);
    return [null, ""];
  }
}

export async function updateProject(data: Project, markdown: string) {
  try {
    if (data.slug !== "") {
      const lowercase = data.title.toLowerCase();
      data.slug = lowercase.replaceAll(" ", "-");
      await sql`
      UPDATE projects
      SET
        title = ${data.title},
        description = ${data.description},
        categories = ${data.categories},
        markdown = ${markdown},
        image_url = ${data.image_url}
      WHERE slug = ${data.slug}`;
    } else {
      await sql`
      INSERT 
      INTO projects
        (title,
        description,
        categories,
        slug,
        markdown,
        image_url)
      VALUES (
        ${data.title},
        ${data.description},
        ${data.categories},
        ${data.slug},
        ${markdown},
        ${data.image_url}
      );
      `;
    }
  } catch (err) {
    console.error("Error updating project: ", err);
  }
}

export async function fetchPostSlugs() {
  try {
    const data = await sql<{ category: string }[]>`
    SELECT slug FROM posts;
    `;
    const slugs = data.map((row) => row.category);
    return slugs;
  } catch (err) {
    console.error("Error fetching post slugs: ", err);
    return [""];
  }
}

export async function fetchPostCategories() {
  const totalCategories: string[] = [];
  try {
    const data = await sql<
      { categories: string[] }[]
    >`SELECT categories FROM posts;`;
    for (const array of data) {
      for (let i = 0; i < array.categories.length; i++) {
        const string = array.categories[i];
        if (!totalCategories.includes(string)) {
          totalCategories.push(string);
        }
      }
    }
    totalCategories.sort();
  } catch (err) {
    console.error("Error fetching post categories: ", err);
  }
  return totalCategories;
}

export async function fetchPosts(query: string, categories: string[]) {
  try {
    if (categories.length === 0) {
      const data = await sql<Post[]>`
      SELECT 
        post_id, 
        title, 
        description, 
        categories, 
        slug, 
        image_url
      FROM posts 
      WHERE 
        title ILIKE ${`%${query}%`} OR 
        description ILIKE ${`%${query}%`};
      `;
      return data;
    } else {
      const allCategories = await fetchPostCategories();
      for (const category of categories) {
        if (!allCategories.includes(category)) {
          throw category + "was not found in posts.";
        }
      }
      const results: Post[] = [];

      for (const category of categories) {
        const data = await sql<Post[]>`
        SELECT 
          post_id, 
          title, 
          description, 
          categories, 
          slug,
          image_url 
        FROM posts 
        WHERE 
          ${category} = ANY(categories) AND
          (title ILIKE ${`%${query}%`} OR 
          description ILIKE ${`%${query}%`});
        `;
        results.push(...data);
      }
      const unique = Array.from(
        new Map(results.map((p) => [p.post_id, p])).values()
      );
      return unique;
    }
  } catch (err) {
    console.error("Error fetching posts:", err);
    return [];
  }
}

export async function fetchPost(slug: string) {
  try {
    const data = await sql<Post[]>`
      SELECT 
        post_id, 
        title, 
        description, 
        categories, 
        slug,
        image_url 
      FROM posts 
      WHERE slug = ${slug};
    `;
    const data_markdown = await sql<{ markdown: string }[]>`
      SELECT 
        markdown 
      FROM posts
      WHERE slug = ${slug};
      `;
    return [data[0] as Post, data_markdown[0].markdown];
  } catch (err) {
    console.error("Error fetching posts:", err);
    return [null, ""];
  }
}

export async function updatePost(data: Post, markdown: string) {
  try {
    if (data.slug !== "") {
      const lowercase = data.title.toLowerCase();
      data.slug = lowercase.replaceAll(" ", "-");
      await sql`
      UPDATE posts
      SET
        title = ${data.title},
        creation_date = ${data.creation_date},
        edit_date = ${data.edit_date},
        description = ${data.description},
        categories = ${data.categories},
        markdown = ${markdown},
        image_url = ${data.image_url}
      WHERE slug = ${data.slug}`;
    } else {
      await sql`
      INSERT 
      INTO projects
        (title,
        description,
        categories,
        slug,
        markdown,
        image_url)
      VALUES (
        ${data.title},
        ${data.creation_date},
        ${data.edit_date},
        ${data.description},
        ${data.categories},
        ${data.slug},
        ${markdown},
        ${data.image_url}
      );
      `;
    }
  } catch (err) {
    console.error("Error updating project: ", err);
  }
}

export async function fetchExpertiseAreas() {
  try {
    const data = await sql<Expertise[]>`
      SELECT *
      FROM expertise_areas;
    `;
    return data as Expertise[];
  } catch (err) {
    console.error("Error fetching expertise areas: ", err);
    return [];
  }
}
