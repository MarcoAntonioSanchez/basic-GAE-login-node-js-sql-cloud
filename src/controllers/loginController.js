import bcrypt from "bcrypt";
import flash from "connect-flash";
import { pool } from "../db.js";
import { insertUser } from "../db.js";

// Exporting loadLogin controller for the /login view
export const loadLogin = (req, res) => {
  try {
    res.render("login", { error: error });
  } catch (error) {
    res.render("login", { error: error });
  }
};

export const loginIntent = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Realizar la consulta para obtener el usuario
    const [rows, fields] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    const user = rows[0];

    if (!user) {
      req.flash("error", "Usuario incorrecto");
      res.redirect("login");
      return;
    }

    // Verificar la contraseña utilizando bcrypt
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      req.session.userId = user.id_user;
      req.session.save((error) => {
        if (error) {
          console.error("Error al guardar la sesión:", error);
        } else {
          console.log("La sesión se guardó correctamente");
          console.log(user.id_user);
          res.redirect("/");
        }
      });
    } else {
      req.flash("error", "Contraseña incorrecta");
      res.redirect("login");
    }
  } catch (error) {
    console.error("Error en la consulta:", error);
    // Manejar el error apropiadamente
    res.status(500).send("Error en el servidor");
  }
};

export const loadRegister = (req, res) => {
  try {
    res.render("register", { error: error });
  } catch (error) {
    res.render("register", { error: error });
  }
};

export const registerIntent = async (req, res) => {
  const { password, username } = req.body;

  try {
    const hash = await bcrypt.hash(password, 12);

    // Llamamos a la función insertUser que está en el archivo de conexión a la base de datos.
    await insertUser(username, hash);

    res.redirect("/register");
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    res.status(500).send("Error al registrar usuario.");
  }
};
