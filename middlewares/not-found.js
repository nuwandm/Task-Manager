const notFoundErr = (req, res) =>
	res.status(404).send("<h1>Route Does Not Exist Please Check Again <h1/>");

module.exports = notFoundErr;

// const notFound = (req, res) => res.status(404).send('Route does not exist')

// module.exports = notFound