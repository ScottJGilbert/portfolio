// lib/db.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function makeQuery(query: string) {
  try {
    const [results] = await pool.query(query);
    return results;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function fetchProjects() {
  return makeQuery("SELECT * FROM projects");
}
