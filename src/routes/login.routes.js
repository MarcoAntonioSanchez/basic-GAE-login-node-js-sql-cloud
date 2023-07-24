import { Router } from "express"; // Importing router's lib for routing to app.js
import {
  loadLogin,
  loadRegister,
  registerIntent,
} from "../controllers/loginController.js"; // Importing login controllers to generate views

const router = Router(); // Starting router with a function

router.get("/login", loadLogin); // Setting the controller for the /login request
// router.post("/login", loginIntent);

router.get("/register", loadRegister);
router.post("/register", registerIntent);

export default router; // Exporting default router to app.js
