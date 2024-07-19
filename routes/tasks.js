const express = require("express");
const {
	getAllTasks,
	createTask,
	getSingleTask,
	updateSingleTask,
	deleteSingleTask,
} = require("../controllers/tasks");
const router = express.Router();

router.route("/").get(getAllTasks);

router.route("/").post(createTask);

// router.route("/:id").get(getSingleTask);
// router.route("/:id").patch(updateSingleTask);
// router.route("/:id").delete(deleteSingleTask);

// we can write in short for above 3 routes

router
	.route("/:id")
	.get(getSingleTask)
	.patch(updateSingleTask)
	.delete(deleteSingleTask);

module.exports = router;
