import { sql } from "@vercel/postgres";

export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    return { success: true };
  } catch (error) {
    console.error("Database init error:", error);
    return { success: false, error: error.message };
  }
}

export async function addToWaitlist(email) {
  try {
    if (!email || !email.includes("@")) {
      return { success: false, error: "Invalid email format" };
    }

    await initDatabase();

    await sql`
      INSERT INTO waitlist (email)
      VALUES (${email})
    `;

    return { success: true, message: "Added to waitlist!" };
  } catch (error) {
    if (
      error.message.includes("duplicate") ||
      error.message.includes("unique")
    ) {
      return { success: false, error: "Email already registered" };
    }

    console.error("Add to waitlist error:", error);
    return { success: false, error: "Failed to add email" };
  }
}

export async function getWaitlist() {
  try {
    await initDatabase();

    const result = await sql`
      SELECT id, email, created_at
      FROM waitlist
      ORDER BY created_at DESC
    `;

    return { success: true, data: result.rows };
  } catch (error) {
    console.error("Get waitlist error:", error);
    return { success: false, error: error.message };
  }
}

export async function getWaitlistCount() {
  try {
    await initDatabase();

    const result = await sql`
      SELECT COUNT(*) as count
      FROM waitlist
    `;

    return { success: true, count: parseInt(result.rows[0].count) };
  } catch (error) {
    console.error("Get count error:", error);
    return { success: false, count: 0 };
  }
}
