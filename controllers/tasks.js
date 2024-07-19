const { createCustomError, CustomAPIError } = require("../errors/custom-error");
const asyncWrapper = require("../middlewares/asyncWrapper");
const Task = require("../models/Task");

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find({});
	res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(200).json(task);
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findOne({ _id: taskID });

	if (!task) {
		// return res.status(404).json({ msg: `No task for ID : ${taskID}` });
		return next(createCustomError(`No task for ID : ${taskID}`, 404)); // custom error message
	}
	res.status(200).json({ task });
});

const updateSingleTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
		new: true,
		runValidators: true,
	});

	if (!task) {
		// return res.status(404).json({ msg: `No task for ID : ${taskID}` });
		return next(createCustomError(`No task for ID : ${taskID}`, 404));
	}

	res.status(200).json({ task });
});

const deleteSingleTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndDelete({ _id: taskID });

	if (!task) {
		// return res.status(404).json({ msg: `No task for ID : ${taskID}` });
		return next(createCustomError(`No task for ID : ${taskID}`, 404));
	}

	res.status(200).json({ task });
});

module.exports = {
	getAllTasks,
	createTask,
	getSingleTask,
	updateSingleTask,
	deleteSingleTask,
};
