"use server";

// lib/db.js
import {
  Project,
  Post,
  Skill,
  ImageData,
  Experience,
  Attribution,
  Release,
  Item,
  Comment,
  User,
} from "./definitions";
import postgres from "postgres";
import { cache } from "react";
import { auth } from "./auth";
import { headers } from "next/headers";

export const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const fetchSkills = cache(async (names: string[]) => {
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
});

export async function addSkill(skill: Skill) {
  try {
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
        ${skill.name},
        ${skill.image_url},
        ${skill.category},
        ${skill.subcategory},
        ${skill.parent_skill_id ?? null}
      );
    `;
  } catch (err) {
    console.error("Error adding skill: ", err);
    throw err;
  }
}

export async function updateSkill(skill: Skill) {
  try {
    await sql`
      UPDATE skills
      SET
        name = ${skill.name},
        image_url = ${skill.image_url},
        category = ${skill.category},
        subcategory = ${skill.subcategory},
        parent_skill_id = ${skill.parent_skill_id ?? null}
      WHERE skill_id = ${skill.skill_id};
    `;
  } catch (err) {
    console.error("Error updating skill: ", err);
    throw err;
  }
}

export async function deleteSkill(id: number) {
  try {
    await sql`
      DELETE 
      FROM skills 
      WHERE skill_id = ${id};
    `;
  } catch (err) {
    console.error("Error deleting skill: ", err);
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

export async function fetchProjects(
  query: string,
  categories: string[]
): Promise<Project[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isAdmin = session?.user?.admin ?? false;
  try {
    if (isAdmin) {
      if (categories.length === 0) {
        const data = await sql<Project[]>`
          SELECT *
          FROM projects 
          WHERE 
            title ILIKE ${`%${query}%`} OR 
            description ILIKE ${`%${query}%`} 
          ORDER BY start_date DESC;
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
            SELECT *
            FROM projects 
            WHERE 
              ${category} = ANY(categories) AND
              (title ILIKE ${`%${query}%`} OR 
              description ILIKE ${`%${query}%`}) 
            ORDER BY start_date DESC;
          `;
          results.push(...data);
        }
        const unique = Array.from(
          new Map(results.map((p) => [p.slug, p])).values()
        );
        return unique;
      }
    } else {
      // Non-admin users can only see published projects
      if (categories.length === 0) {
        const data = await sql<Project[]>`
            SELECT *
            FROM projects 
            WHERE
              (title ILIKE ${`%${query}%`} OR 
              description ILIKE ${`%${query}%`}) AND
              EXISTS (
                SELECT 1
                FROM items
                WHERE items.id = projects.item_id AND items.published = true
              )
            ORDER BY start_date DESC;
          `;
        return data;
      } else {
        const allCategories = await fetchProjectCategories();
        const results: Project[] = [];
        for (const category of categories) {
          if (!allCategories.includes(category)) {
            throw category + "was not found in projects.";
          }
          const data = await sql<Project[]>`
            SELECT *
            FROM projects
            WHERE
              ${category} = ANY(categories) AND
              (title ILIKE ${`%${query}%`} OR
             description ILIKE ${`%${query}%`}) AND
              EXISTS (
                SELECT 1
                FROM items
                WHERE items.id = projects.item_id AND items.published = true
              )
            ORDER BY start_date DESC;
          `;
          results.push(...data);
        }
        const unique = Array.from(
          new Map(results.map((p) => [p.slug, p])).values()
        );
        return unique;
      }
    }
  } catch (err) {
    console.error("Error fetching projects:", err);
    return [];
  }
}

export async function fetchProject(slug: string): Promise<Project | null> {
  try {
    const data = await sql<Project[]>`
      SELECT *
      FROM projects 
      WHERE slug = ${slug};
    `;
    const skillsData = data[0].skills;
    if (skillsData.length > 0) {
      if (typeof skillsData[0] !== "string")
        throw new Error("Skills data is not in string format");
      data[0].skills = await fetchSkills(skillsData as string[]);
    } else {
      data[0].skills = [];
    }
    return data[0] as Project;
  } catch (err) {
    console.error("Error fetching project:", err);
    return null;
  }
}
export async function addProject(data: Project) {
  try {
    const skillStrings: string[] = data?.skills.map((skill) => {
      return typeof skill === "string" ? skill : skill.name;
    });
    if (data.slug !== "") {
      throw new Error("Project slug must be empty when adding a new project.");
    }
    const lowercase = data.title.toLowerCase();
    data.slug = lowercase.replaceAll(" ", "-");
    // Sanitize slug by removing special characters
    data.slug = data.slug.replace(/[^a-z0-9\-]/g, "");
    await sql`
      INSERT 
      INTO projects
        (title,
        start_date,
        end_date,
        description,
        categories,
        slug,
        image_url,
        skills,
        item_id)
      VALUES (
        ${data.title},
        ${data.start_date},
        ${data.end_date},
        ${data.description},
        ${data.categories},
        ${data.slug},
        ${data.image_url},
        ${skillStrings},
        ${data.item_id}
      );
    `;
  } catch (err) {
    console.error("Error adding project: ", err);
    throw err;
  }
}

export async function updateProject(data: Project) {
  try {
    const skillStrings: string[] = data?.skills.map((skill) => {
      return typeof skill === "string" ? skill : skill.name;
    });
    await sql`
      UPDATE projects
      SET
        title = ${data.title},
        start_date = ${data.start_date},
        end_date = ${data.end_date ? data.end_date : null},
        description = ${data.description},
        categories = ${data.categories},
        image_url = ${data.image_url},
        skills = ${skillStrings},
        item_id = ${data.item_id}
      WHERE slug = ${data.slug}
    `;
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

export async function fetchPosts(
  query: string,
  categories: string[]
): Promise<Post[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isAdmin = session?.user?.admin ?? false;
  try {
    if (isAdmin) {
      if (categories.length === 0) {
        const data = await sql<Post[]>`
          SELECT *
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
            SELECT *
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
          new Map(results.map((p) => [p.slug, p])).values()
        );
        return unique;
      }
    } else {
      // Non-admin users can only see published posts
      if (categories.length === 0) {
        const data = await sql<Post[]>`
            SELECT *
            FROM posts 
            WHERE
              (title ILIKE ${`%${query}%`} OR 
              description ILIKE ${`%${query}%`}) AND
              EXISTS (
                SELECT 1
                FROM items
                WHERE items.id = posts.item_id AND items.published = true
              )
            ORDER BY creation_date DESC;
          `;
        return data;
      } else {
        const allCategories = await fetchPostCategories();
        const results: Post[] = [];
        for (const category of categories) {
          if (!allCategories.includes(category)) {
            throw category + "was not found in posts.";
          }
          const data = await sql<Post[]>`
            SELECT *
            FROM posts
            WHERE
              ${category} = ANY(categories) AND
              (title ILIKE ${`%${query}%`} OR
             description ILIKE ${`%${query}%`}) AND
              EXISTS (
                SELECT 1
                FROM items
                WHERE items.id = posts.item_id AND items.published = true
              )
            ORDER BY creation_date DESC;
          `;
          results.push(...data);
        }
        const unique = Array.from(
          new Map(results.map((p) => [p.slug, p])).values()
        );
        return unique;
      }
    }
  } catch (err) {
    console.error("Error fetching posts:", err);
    return [];
  }
}

export async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const data = await sql<Post[]>`
      SELECT *
      FROM posts 
      WHERE slug = ${slug};
    `;
    return data[0] as Post;
  } catch (err) {
    console.error("Error fetching posts:", err);
    return null;
  }
}

export async function addPost(data: Post) {
  try {
    if (data.slug !== "") {
      throw new Error("Post slug must be empty when adding a new post.");
    }
    const lowercase = data.title.toLowerCase();
    data.slug = lowercase.replaceAll(" ", "-");
    // Sanitize slug by removing special characters
    data.slug = data.slug.replace(/[^a-z0-9\-]/g, "");
    await sql`
      INSERT 
      INTO posts
        (title,
        creation_date,
        edit_date,
        description,
        categories,
        slug,
        image_url,
        item_id)
      VALUES (
        ${data.title},
        ${data.creation_date},
        ${data.edit_date},
        ${data.description},
        ${data.categories},
        ${data.slug},
        ${data.image_url},
        ${data.item_id}
      );
    `;
  } catch (err) {
    console.error("Error adding post: ", err);
    throw err;
  }
}

export async function updatePost(data: Post) {
  try {
    await sql`
      UPDATE posts
      SET
        title = ${data.title},
        creation_date = ${data.creation_date},
        edit_date = ${data.edit_date},
        description = ${data.description},
        categories = ${data.categories},
        image_url = ${data.image_url},
        item_id = ${data.item_id}
      WHERE slug = ${data.slug};
    `;
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

export async function fetchItem(item_id: number): Promise<Item> {
  try {
    const data = await sql<Item[]>`
      SELECT *
      FROM items 
      WHERE id = ${item_id};
    `;
    return data[0] as Item;
  } catch (err) {
    console.error("Error fetching item:", err);
    throw err;
  }
}

export async function addItem(markdown: string): Promise<number> {
  try {
    const result = await sql<{ id: number }[]>`
      INSERT 
      INTO items (markdown)
      VALUES (${markdown})
      RETURNING id;
    `;
    return result[0].id;
  } catch (err) {
    console.error("Error adding item: ", err);
    throw err;
  }
}

export async function updateItem(item: Item) {
  try {
    await sql`
      UPDATE items
      SET markdown = ${item.markdown}
      WHERE id = ${item.id};
    `;
  } catch (err) {
    console.error("Error updating item: ", err);
    throw err;
  }
}

export async function publishItem(id: number) {
  try {
    await sql`
      UPDATE items
      SET published = true
      WHERE id = ${id};
    `;
  } catch (err) {
    console.error("Error publishing item: ", err);
    throw err;
  }
}

export async function unpublishItem(id: number) {
  try {
    await sql`
      UPDATE items
      SET published = false
      WHERE id = ${id};
    `;
  } catch (err) {
    console.error("Error unpublishing item: ", err);
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
        url ILIKE ${`%${query}%`} OR 
        key ILIKE ${`%${query}%`}
      ORDER BY name DESC
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
        url, 
        key)
      VALUES (
        ${data.name},
        ${data.url},
        ${data.key}
      );
    `;
  } catch (err) {
    console.error("Error adding image data: ", err);
    throw err;
  }
}

export async function deleteImage(key: string) {
  try {
    await sql`
      DELETE
      FROM images
      WHERE key = ${key};
    `;
  } catch (err) {
    console.error("Error deleting image data: ", err);
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

export async function fetchResumeURL(): Promise<string> {
  try {
    const rows = await sql<{ url: string }[]>`
      SELECT url
      FROM resume;
    `;
    return rows[0]?.url || "";
  } catch (err) {
    console.error("Error fetching latest resume URL");
    throw err;
  }
}

export async function updateResumeURL(url: string) {
  try {
    await sql`
      UPDATE resume
      SET url = ${url};
    `;
  } catch (err) {
    console.error("Error updating resume URL");
    throw err;
  }
}

export async function fetchReleases(project_key?: string): Promise<Release[]> {
  try {
    let data: Release[];
    if (project_key) {
      data = await sql<Release[]>`
        SELECT *
        FROM releases
        WHERE project_key = ${project_key}
        ORDER BY version;
      `;
    } else {
      data = await sql<Release[]>`
        SELECT *
        FROM releases
        ORDER BY version;
      `;
    }
    return data;
  } catch (err) {
    console.error("Error fetching releases: ", err);
    return [];
  }
}

export async function addRelease(release: Release) {
  try {
    await sql`
      INSERT
      INTO releases (
        key,
        project_key,
        version,
        release_date,
        text,
        url,
        external)
      VALUES (
        ${release.key},
        ${release.project_key},
        ${release.version},
        ${release.release_date},
        ${release.text},
        ${release.url},
        ${release.external}
      );
    `;
  } catch (err) {
    console.error("Error adding release: ", err);
    throw err;
  }
}

export async function deleteRelease(key: string) {
  try {
    await sql`
      DELETE
      FROM releases
      WHERE key = ${key};
    `;
  } catch (err) {
    console.error("Error deleting release: ", err);
    throw err;
  }
}

export async function fetchUsers(
  ids?: string[],
  query?: string,
  useQuery: boolean = false
): Promise<User[]> {
  try {
    if (!useQuery && ids && ids.length > 0) {
      const data = await sql<User[]>`
      SELECT * 
      FROM "user"
      WHERE "id" = ANY(${ids}) AND 
        "deleted" = false;
    `;
      return data;
    }
    if (useQuery) {
      const data = await sql<User[]>`
        SELECT *
        FROM "user"
        WHERE 
          ("name" ILIKE ${`%${query}%`} OR 
          "email" ILIKE ${`%${query}%`}) AND 
          "deleted" = false;
      `;
      return data;
    }
    return [];
  } catch (err) {
    console.error("Error fetching users: ", err);
    return [];
  }
}

export async function updateUser(userData: User) {
  try {
    await sql`
      UPDATE "user"
      SET 
        "createdAt" = ${userData.createdAt},
        "updatedAt" = ${userData.updatedAt},
        "name" = ${userData.name},
        "email" = ${userData.email},
        "emailVerified" = ${userData.emailVerified},
        "image" = ${userData.image ?? null},
        "banned" = ${userData.banned},
        "admin" = ${userData.admin},
        "comments" = ${userData.comments},
        "firstCommentTime" = ${userData.firstCommentTime}
      WHERE id = ${userData.id};
    `;
  } catch (err) {
    console.error("Error updating user: ", err);
    throw err;
  }
}

function generateRandomString(length: number = 16): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function deleteUser(id: string) {
  try {
    await sql`
      UPDATE "user"
      SET 
        "deleted" = true,
        "email" = ${"DELETED_" + generateRandomString(32)},
        "emailVerified" = false,
        "name" = ${"[Deleted User]"},
        "image" = NULL,
        "admin" = false,
        "banned" = true
      WHERE id = ${id};
    `;
  } catch (err) {
    console.error("Error deleting user: ", err);
    throw err;
  }
}

export async function fetchComments(item_id: number) {
  try {
    const data = await sql<Comment[]>`
      SELECT *
      FROM comments
      WHERE item_id = ${item_id}
      ORDER BY creation_date DESC;
    `;
    return data;
  } catch (err) {
    console.error("Error fetching comments: ", err);
    return [];
  }
}

export async function fetchCommentByID(id: number) {
  try {
    const data = await sql<Comment[]>`
      SELECT *
      FROM comments
      WHERE id = ${id}
      LIMIT 1;
    `;
    return data[0] as Comment;
  } catch (err) {
    console.error("Error fetching comment by ID: ", err);
    throw err;
  }
}

export async function addComment(comment: Comment) {
  try {
    await sql`
      INSERT
      INTO comments (
        user_id,
        item_id,
        content,
        edit_date,
        edited,
        parent_comment_id)
      VALUES (
        ${comment.user_id},
        ${comment.item_id},
        ${comment.content},
        ${comment.edit_date},
        ${comment.edited},
        ${comment.parent_comment_id}
      );
    `;
  } catch (err) {
    console.error("Error adding comment: ", err);
    throw err;
  }
}

export async function updateComment(comment: Comment) {
  try {
    await sql`
      UPDATE comments
      SET content = ${comment.content}
      WHERE id = ${comment.id};
    `;
  } catch (err) {
    console.error("Error updating comment: ", err);
    throw err;
  }
}

export async function deleteComment(id: number) {
  try {
    await sql`
      DELETE
      FROM comments
      WHERE id = ${id};
    `;
  } catch (err) {
    console.error("Error deleting comment: ", err);
    throw err;
  }
}
