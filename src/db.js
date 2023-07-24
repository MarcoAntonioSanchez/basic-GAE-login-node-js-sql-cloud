import mysql from "mysql2/promise";
// import { createPool } from "mysql2/promise";

// export const pool = createPool({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASS || "Zy5M9eSCuSUjjI2WzkEX",
//   database: process.env.DB_NAME || "login_test",
// });

export const connectUnixSocket = async (config) => {
  return mysql.createPool({
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    socketPath: process.env.INSTANCE_UNIX_SOCKET,
  });
};

// Función para insertar un nuevo usuario en la base de datos
export const insertUser = async (username, passwordHash) => {
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  const values = [username, passwordHash];

  try {
    const pool = await createUnixSocketPool();
    await pool.query(query, values);
    await pool.end(); // No olvides cerrar el pool de conexión después de usarlo
  } catch (err) {
    console.error("Error al insertar usuario:", err);
    throw err;
  }
};
