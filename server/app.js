const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/conn");
const userRouter = require("./routes/userRoutes");
const path = require("path");
const notificationRouter = require("./routes/notificationRouter");
const bodyParser = require("body-parser");
const teacherRouter = require("./routes/teacherRoutes");
const sessionRouter = require("./routes/sessionRoutes");

//configuring cloudinary
const cloudinary=require("cloudinary");

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
})

const app = express();
const port = process.env.PORT || 5000;

// Increase the payload size limit
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/teacher", teacherRouter);
app.use("/session", sessionRouter);
app.use("/notification", notificationRouter);

app.get('/', (req, res) => res.json({ message: 'Welcome to our API' }));

app.listen(port, () => {});
