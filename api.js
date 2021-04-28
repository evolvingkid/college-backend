const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

app.use(
  express.json({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

const authRoutes = require("./routes/auth");
const departmentRoutes = require("./routes/department");
const userRoutes = require("./routes/user");
const programRoutes = require("./routes/program");
const examHallRoutes = require("./routes/examhall");
const courseRoutes = require("./routes/course");
const permissionRoutes = require("./routes/permission");
const batchRoute = require("./routes/batch");
const eventRoute = require("./routes/event");
const examRoute = require("./routes/exam");
const seatArragement = require("./routes/seatArragement");
const websiteCoreData = require("./routes/website/websiteCoreData");
const FileRoute = require("./routes/file");
const BannerRoute = require("./routes/website/banner");

app.get("/", (req, res) => res.send("College API Running"));
app.use("/api/auth", authRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/program", programRoutes);
app.use("/api/examhall", examHallRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/permission", permissionRoutes);
app.use("/api/batch", batchRoute);
app.use("/api/event", eventRoute);
app.use("/api/exam", examRoute);
app.use("/api/seatarragement", seatArragement);
app.use("/api/webiste/coredata", websiteCoreData);
app.use("/api/file", FileRoute);
app.use("/api/website/banner", BannerRoute);
module.exports = app;
