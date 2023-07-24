import express from "express"; // Importing server dependencies and path for relative use
import path from "path";
import morgan from "morgan"; // Watching http request on terminal for dev environment
import loginRoutes from "./routes/login.routes.js"; // Importing login routes from routes directory
import flash from "connect-flash";

import session from "express-session"; // Importing session dependency for session saving on auth
import { fileURLToPath } from "url";

// *- Disable in production: for the environment variables usage in the project
import dotenv from "dotenv";
dotenv.config();

const app = express(); // Initializing express app into a constant
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Saving relative path into __dirname

// Settings
app.set("port", process.env.PORT || 8080); // Setting environment variable port or 8080 as default
app.set("views", path.join(__dirname, "views")); // Setting the viws directory relative path
app.set("view engine", "ejs"); // Setting ejs dependency as the view engine

// Middlewares
app.use(express.static(path.join(__dirname, "public"))); // Using the public folder as static path
app.use(express.urlencoded({ extended: true })); // Extending to true the url encoded for json usage
app.use(morgan("dev")); // Using morgan to watch requests in dev environment
app.use(flash());
app.use(
  session({ secret: "notgoodsecret", resave: false, saveUninitialized: false })
); // Saving sessions with secret, change it on prod., with false settings

// Routes
app.use(loginRoutes); // Using the login routes to render login poge form

export default app; // Exporting default app to imported it on index.js
