const Session = require("../models/sessionModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");

const getallSessions = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [{ userId: req.query.search }, { teacherId: req.query.search }],
        }
      : {};

    const sessions = await Session.find(keyword)
      .populate("teacherId")
      .populate("userId");
    return res.send(sessions);
  } catch (error) {
    res.status(500).send("Unable to get sessions");
  }
};

const bookSession = async (req, res) => {
  try {

     const student1Id=req.locals
     const teacher1Id=req.body.teacherId
     if(student1Id===teacher1Id){
      return res.status(400).send("You cannot book a session with yourself");
     }

    const session = await Session({
      date: req.body.date,
      time: req.body.time,
      teacherId: req.body.teacherId,
      userId: req.locals,
    });

    const usernotification = Notification({
      userId: req.locals,
      content: `You booked a Session with . ${req.body.teachername} for ${req.body.date} ${req.body.time}`,
    });

    await usernotification.save();

    const user = await User.findById(req.locals);

    const teachernotification = Notification({
      userId: req.body.teacherId,
      content: `You have a Session with ${user.firstname} ${user.lastname} on ${req.body.date} at ${req.body.time}`,
    });

    await teachernotification.save();

    const result = await session.save();
    return res.status(201).send(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to book Session");
  } 
};

const completed = async (req, res) => {
  try {
    const alreadyFound = await Session.findOneAndUpdate(
      { _id: req.body.sessionid },
      { status: "Completed" }
    );

    const usernotification = Notification({
      userId: req.body.studentId,
      content: `Your Session with ${req.body.teachername} has been completed`,
    });

    await usernotification.save();

    const user = await User.findById(req.body.studentId);

    const teachernotification = Notification({
      userId: req.body.teacherId,
      content: `Your Session with ${user.firstname} ${user.lastname} has been completed`,
    });

    await teachernotification.save();

    return res.status(201).send("Session completed");
  } catch (error) {
    res.status(500).send("Unable to complete Session");
  }
};

module.exports = {
  getallSessions,
  bookSession,
  completed,
};
