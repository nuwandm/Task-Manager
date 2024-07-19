const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFoundErr = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
require("dotenv").config();

// middleware
app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1/tasks", tasks);
app.use(notFoundErr);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(3000, console.log(`server is listen on port : ${port}...`));
	} catch (err) {
		console.log(err);
	}
};

start();
