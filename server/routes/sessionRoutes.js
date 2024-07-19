const express = require("express");
const auth = require("../middleware/auth");
const sessionController = require("../controllers/sessionController");

const sessionRouter = express.Router();

sessionRouter.get(
  "/getallsessions",
  auth,
  sessionController.getallSessions
);

sessionRouter.post(
  "/booksession",
  auth,
  sessionController.bookSession
);

sessionRouter.put("/completed", auth, sessionController.completed);

module.exports = sessionRouter;
