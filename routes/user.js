import express from "express";
import { getMyProfile, getAllUsers, register, test, login,logout } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.use(express.json())

router.get("/", test)

// router.post("/new", register)
router.get("/all", getAllUsers)


router.post("/login", login)
router.get("/logout", logout)
router.post("/new", register)
router.get("/me", isAuthenticated, getMyProfile)

//testing params
// router.get("/:id", getUserById)
// router.put("/:id", updateUser)
// router.delete("/:id", deleteUser)

// //or we can make a chain 
// router.
//     route("/:id")
//     .get(getUserById)
//     .put(updateUser)
//     .delete(deleteUser)


export default router