import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "Zy5M9eSCuSUjjI2WzkEX",
  database: process.env.DB_NAME || "login_test",
});

// Función para insertar un nuevo usuario en la base de datos
export const insertUser = async (username, passwordHash) => {
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  const values = [username, passwordHash];

  try {
    await pool.query(query, values);
  } catch (err) {
    console.error("Error al insertar usuario:", err);
    throw err;
  }
};
