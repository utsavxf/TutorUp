const express = require("express");
const teacherController = require("../controllers/teacherController");
const auth = require("../middleware/auth");

const teacherRouter = express.Router();

teacherRouter.get("/getallteachers", teacherController.getallTeachers);

teacherRouter.get("/getnotteachers", auth, teacherController.getnotTeachers);

teacherRouter.post("/applyforteacher", auth, teacherController.applyforTeacher);

teacherRouter.put("/deleteteacher", auth, teacherController.deleteTeacher);

teacherRouter.put("/acceptteacher", auth, teacherController.acceptTeacher);

teacherRouter.put("/rejectteacher", auth, teacherController.rejectTeacher);

module.exports = teacherRouter;
