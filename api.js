const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const path = require("path");

app.use(
  express.json({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// user
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// college basic
const departmentRoutes = require("./routes/department");
const programRoutes = require("./routes/program");
const courseRoutes = require("./routes/course");
const permissionRoutes = require("./routes/permission");
const batchRoute = require("./routes/batch");
const FileRoute = require("./routes/file");

// exam
const examHallRoutes = require("./routes/examhall");
const examRoute = require("./routes/exam");
const seatArragement = require("./routes/seatArragement");
const ExamAnsSheetRoute = require("./routes/examAnsSheet");
const examHallAttendance = require("./routes/examAttendance");

// website
const eventRoute = require("./routes/event");
const websiteCoreData = require("./routes/website/websiteCoreData");
const BannerRoute = require("./routes/website/banner");
const GalleryRoute = require("./routes/website/gallery");


// base
app.get("/", (req, res) => res.send("College API Running"));

// users
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// college  basic
app.use("/api/department", departmentRoutes);
app.use("/api/program", programRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/batch", batchRoute);
app.use("/api/file", FileRoute);
app.use("/api/permission", permissionRoutes);

// exams
app.use("/api/examhall", examHallRoutes);
app.use("/api/exam", examRoute);
app.use("/api/seatarragement", seatArragement);
app.use("/api/examAnsSheet", ExamAnsSheetRoute);
app.use("/api/examAttendance", examHallAttendance);

// website
app.use("/api/event", eventRoute);
app.use("/api/webiste/coredata", websiteCoreData);
app.use("/api/website/banner", BannerRoute);
app.use("/api/website/gallery", GalleryRoute);

// upload
app.use("/uploads", express.static("uploads"));

module.exports = app;
