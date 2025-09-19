"use server";

// lib/db.js
import {
  Project,
  Post,
  ItemMetadata,
  Skill,
  ImageData,
  Experience,
  Message,
  Attribution,
} from "./definitions";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchSkills(names: string[]) {
  try {
    if (names.length === 0) {
      const data = await sql<Skill[]>`
      SELECT *
      FROM skills;
    `;
      return data as Skill[];
    } else {
      const data: Skill[] = [];
      for (const name of names) {
        const row = await sql<Skill[]>`
          SELECT * 
          FROM skills
          WHERE name = ${name};
        `;
        data.push(row[0] as Skill);
      }
      return data;
    }
  } catch (err) {
    console.error("Error fetching skills: ", err);
    return [];
  }
}

export async function updateSkills(areas: Skill[]) {
  try {
    await sql`
      DELETE 
      FROM skills;
    `;
    for (const area of areas) {
      await sql`
        INSERT
        INTO skills (
          name,
          image_url,
          category,
          subcategory,
          parent_skill_id
        ) 
        VALUES (
          ${area.name},
          ${area.image_url},
          ${area.category},
          ${area.subcategory},
          ${area.parent_skill_id ?? null},
        );
      `;
    }
  } catch (err) {
    console.error("Error updating skills: ", err);
    throw err;
  }
}

export async function fetchExperienceIDs() {
  try {
    const data = await sql<{ experience_id: number }[]>`
      SELECT experience_id FROM experience;
    `;
    const ids = data.map((row) => row.experience_id);
    return ids;
  } catch (err) {
    console.error("Error fetching experience IDs: ", err);
    throw err;
  }
}

export async function fetchExperience(id: number) {
  try {
    const data = await sql<Experience[]>`
      SELECT *
      FROM experience
      WHERE experience_id = ${id} 
      LIMIT 1;
    `;
    const stringData = await sql<{ skills: string[] }[]>`
      SELECT skills
      FROM experience
      WHERE experience_id = ${id};
    `;
    const experience: Experience = data[0] as Experience;
    if (stringData[0].skills.length > 0)
      experience.skills = await fetchSkills(stringData[0].skills);
    return experience;
  } catch (err) {
    console.error("Error fetching experience: ", err);
    throw err;
  }
}

export async function updateExperience(experience: Experience) {
  try {
    const experienceStrings = experience.skills.map((skill) => {
      return skill.name;
    });
    if ((await fetchExperienceIDs()).includes(experience.experience_id)) {
      await sql`
        UPDATE experience
        SET
          title = ${experience.title}, 
          organization = ${experience.organization}, 
          start_date = ${experience.start_date}, 
          end_date = ${experience.end_date}, 
          markdown = ${experience.markdown},
          skills = ${experienceStrings},
          self_employed = ${experience.self_employed},
          volunteer = ${experience.volunteer} 
        WHERE experience_id = ${experience.experience_id};
      `;
    } else {
      await sql`
        INSERT 
        INTO experience (
          title, 
          organization, 
          start_date, 
          end_date, 
          markdown, 
          skills, 
          self_employed, 
          volunteer)
        VALUES (
          ${experience.title},
          ${experience.organization},
          ${experience.start_date},
          ${experience.end_date},
          ${experience.markdown},
          ${experienceStrings},
          ${experience.self_employed},
          ${experience.volunteer}
        );
      `;
    }
  } catch (err) {
    console.error("Error updating experience: ", err);
    throw err;
  }
}

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
        start_date, 
        end_date, 
        description, 
        categories, 
        slug,
        image_url 
      FROM projects 
      WHERE 
        title ILIKE ${`%${query}%`} OR 
        description ILIKE ${`%${query}%`} 
      ORDER BY project_id DESC;
      `;
      return data;
    } else {
      const allCategories = await fetchProjectCategories();
      for (const category of categories) {
        if (!allCategories.includes(category)) {
          throw category + " was not found in projects.";
        }
      }
      const results: Project[] = [];

      for (const category of categories) {
        const data = await sql<Project[]>`
        SELECT 
          project_id, 
          title, 
          start_date, 
          end_date, 
          description, 
          categories, 
          slug,
          image_url 
        FROM projects 
        WHERE 
          ${category} = ANY(categories) AND
          (title ILIKE ${`%${query}%`} OR 
          description ILIKE ${`%${query}%`}) 
        ORDER BY project_id DESC;
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

export async function fetchProjectMetadata(slug: string) {
  try {
    const data = await sql<ItemMetadata[]>`
      SELECT 
        title, 
        description 
      FROM projects 
      WHERE slug = ${slug};
    `;
    return data[0] as ItemMetadata;
  } catch (err) {
    console.error("Error fetching project metadata:", err);
    return [null];
  }
}

export async function fetchProject(slug: string) {
  try {
    const data = await sql<Project[]>`
      SELECT 
        project_id, 
        title, 
        start_date, 
        end_date, 
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
    console.error("Error fetching project:", err);
    return [null, ""];
  }
}

export async function updateProject(data: Project, markdown: string) {
  try {
    if (data.slug === "") {
      const lowercase = data.title.toLowerCase();
      data.slug = lowercase.replaceAll(" ", "-");
      await sql`
      INSERT 
      INTO projects
        (title,
        start_date,
        end_date,
        description,
        categories,
        slug,
        markdown,
        image_url)
      VALUES (
        ${data.title},
        ${data.start_date},
        ${data.end_date},
        ${data.description},
        ${data.categories},
        ${data.slug},
        ${markdown},
        ${data.image_url}
      );
      `;
    } else {
      await sql`
      UPDATE projects
      SET
        title = ${data.title},
        start_date = ${data.start_date},
        end_date = ${data.end_date},
        description = ${data.description},
        categories = ${data.categories},
        markdown = ${markdown},
        image_url = ${data.image_url}
      WHERE slug = ${data.slug}`;
    }
  } catch (err) {
    console.error("Error updating project: ", err);
    throw err;
  }
}

export async function deleteProject(slug: string) {
  try {
    await sql`
      DELETE
      FROM projects
      WHERE slug = ${slug};
    `;
  } catch (err) {
    console.error("Error deleting project: ", err);
    throw err;
  }
}

export async function fetchPostSlugs() {
  try {
    const data = await sql<{ slug: string }[]>`
    SELECT slug FROM posts;
    `;
    const slugs = data.map((row) => row.slug);
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
        creation_date,
        edit_date, 
        description, 
        categories, 
        slug, 
        image_url
      FROM posts 
      WHERE 
        title ILIKE ${`%${query}%`} OR 
        description ILIKE ${`%${query}%`} 
      ORDER BY creation_date DESC;
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
          creation_date,
          edit_date,
          description, 
          categories, 
          slug,
          image_url 
        FROM posts 
        WHERE 
          ${category} = ANY(categories) AND
          (title ILIKE ${`%${query}%`} OR 
          description ILIKE ${`%${query}%`}) 
        ORDER BY creation_date DESC;
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

export async function fetchPostMetadata(slug: string) {
  try {
    const data = await sql<ItemMetadata[]>`
      SELECT 
        title, 
        description
      FROM posts 
      WHERE slug = ${slug};
    `;
    return data[0] as ItemMetadata;
  } catch (err) {
    console.error("Error fetching post metadata:", err);
    return [null];
  }
}

export async function fetchPost(slug: string) {
  try {
    const data = await sql<Post[]>`
      SELECT 
        post_id, 
        title, 
        creation_date,
        edit_date,
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
    if (data.slug === "") {
      const lowercase = data.title.toLowerCase();
      data.slug = lowercase.replaceAll(" ", "-");
      await sql`
      INSERT 
      INTO posts
        (title,
        creation_date,
        edit_date,
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
    } else {
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
    }
  } catch (err) {
    console.error("Error updating post: ", err);
    throw err;
  }
}

export async function deletePost(slug: string) {
  try {
    await sql`
      DELETE
      FROM posts
      WHERE slug = ${slug};
    `;
  } catch (err) {
    console.error("Error deleting post: ", err);
    throw err;
  }
}

export async function fetchImages(query: string) {
  try {
    if (query === "") {
      const images = await sql<ImageData[]>`
        SELECT *
        FROM images;
      `;
      return images;
    } else {
      const images = await sql<ImageData[]>`
      SELECT *
      FROM images
      WHERE
        name ILIKE ${`%${query}%`} OR 
        url ILIKE ${`%${query}%`}
      ;
    `;
      return images;
    }
  } catch (err) {
    console.error("Error fetching images: ", err);
    throw err;
  }
}

export async function addImage(data: ImageData) {
  try {
    await sql`
      INSERT 
      INTO images (
        name,
        url)
      VALUES (
        ${data.name},
        ${data.url}
      );
    `;
  } catch (err) {
    console.error("Error adding image data: ", err);
    throw err;
  }
}

export async function fetchMessages(): Promise<Message[]> {
  try {
    const data = await sql<Message[]>`
      SELECT *
      FROM messages
      ORDER BY time_sent DESC;
    `;
    return data;
  } catch (err) {
    console.error("Error fetching messages: ", err);
    return [];
  }
}

export async function addMessage(data: Omit<Message, "id" | "time_sent">) {
  try {
    await sql`
      INSERT
      INTO messages (
        first_name,
        last_name,
        email,
        message)
      VALUES (
        ${data.first_name},
        ${data.last_name},
        ${data.email},
        ${data.message}
      );
    `;
  } catch (err) {
    console.error("Error adding message: ", err);
    throw err;
  }
}

export async function deleteMessage(id: number) {
  try {
    await sql`
      DELETE
      FROM messages
      WHERE id = ${id};
    `;
  } catch (err) {
    console.error("Error deleting message: ", err);
    throw err;
  }
}

export async function fetchAttributions(): Promise<Attribution[]> {
  try {
    const data = await sql<Attribution[]>`
      SELECT *
      FROM attributions;
    `;
    return data;
  } catch (err) {
    console.error("Error fetching attributions: ", err);
    return [];
  }
}

export async function updateAttributions(attributions: Attribution[]) {
  try {
    await sql`
      DELETE 
      FROM attributions;
    `;
    for (const attr of attributions) {
      await sql`
        INSERT
        INTO attributions (
          name,
          url,
          description
        ) 
        VALUES (
          ${attr.name},
          ${attr.url},
          ${attr.description}
        );
      `;
    }
  } catch (err) {
    console.error("Error updating attributions: ", err);
    throw err;
  }
}
