import express from "express";
import { deleteTask, getMyTask, newPost, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();
router.use(express.json())

// router.get("/", (req, res) => {
//     res.json("succesfully testing")
// })
router.post('/new', isAuthenticated, newPost)
router.get('/my', isAuthenticated, getMyTask)
router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask)

export default router;