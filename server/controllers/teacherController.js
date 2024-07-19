const Teacher = require("../models/teacherModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Session = require("../models/sessionModel");

const getallTeachers = async (req, res) => {
  try {
    console.log('request reaching here');
    
    let teacher;
    if (!req.locals) {
      teacher = await Teacher.find({ isTeacher: true }).populate("userId");
    } else {
      teacher = await Teacher.find({ isTeacher: true })
        .find({
          _id: { $ne: req.locals },
        })
        .populate("userId");
    }

    return res.send(teacher);
  } catch (error) {
    res.status(500).send("Unable to get Teachers");
  }
};

const getnotTeachers = async (req, res) => {
  try {
    const docs = await Teacher.find({ isTeacher: false })
      .find({
        _id: { $ne: req.locals },
      })
      .populate("userId");

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get non Teachers");
  }
};

const applyforTeacher = async (req, res) => {
  try {
    const alreadyFound = await Teacher.findOne({ userId: req.locals });
    if (alreadyFound) {
      return res.status(400).send("Application already exists");
    }

    const newTeacher = new Teacher({ ...req.body.formDetails, userId: req.locals });
    const result = await newTeacher.save();

    return res.status(201).send("Application submitted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Unable to submit application");
  }
};

const acceptTeacher = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isTeacher: true, status: "accepted" }
    );

    const teacher = await Teacher.findOneAndUpdate(
      { userId: req.body.id },
      { isTeacher: true }
    );

    const notification = await Notification({
      userId: req.body.id,
      content: `Congratulations, Your application has been accepted.`,
    });

    await notification.save();

    return res.status(201).send("Application accepted notification sent");
  } catch (error) {
    console.log(error);
    
    res.status(500).send("Error while sending notification");
  }
};

const rejectTeacher = async (req, res) => {
  try {
    const details = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isTeacher: false, status: "rejected" }
    );
    const delTeacher = await Teacher.findOneAndDelete({ userId: req.body.id });

    const notification = await Notification({
      userId: req.body.id,
      content: `Sorry, Your application has been rejected.`,
    });

    await notification.save();

    return res.status(201).send("Application rejection notification sent");
  } catch (error) {
    res.status(500).send("Error while rejecting application");
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.body.userId, {
      isTeacher: false,
    });
    const removeTeacher = await Teacher.findOneAndDelete({
      userId: req.body.userId,
    });
    const removeSession = await Session.findOneAndDelete({
      userId: req.body.userId,
    });
    const notification = await Notification({
      userId: req.body.userId,
      content: `Sorry You have been removed as a Teacher`,
    });
    await notification.save();
    return res.send("Teacher deleted successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to delete Teacher");
  }
};

module.exports = {
  getallTeachers,
  getnotTeachers,
  deleteTeacher,
  applyforTeacher,
  acceptTeacher,
  rejectTeacher,
};
