const User = require("../../model/user");
const mongoose = require("mongoose");
const { mongoDB } = require("../../error/mongoDB");
const { bulkCreationStudent } = require("../../services/studentServices");
exports.studentList = async (req, res) => {
  try {
    let studentData;

    let aggreateData = [
      {
        $lookup: {
          from: "student",
          localField: "student",
          foreignField: "_id",
          as: "student",
        },
      },
      { $match: { student: { $exists: true, $not: { $size: 0 } } } },
    ];

    aggreateData.push({
      $lookup: {
        from: "batches",
        localField: "student.batch",
        foreignField: "_id",
        as: "batches",
      },
    });

    if (startingbatch) {
      let startDate = new Date(startingbatch);
      aggreateData.push({
        $match: { "student.startingBatch": { $gte: startDate } },
      });
    }

    if (endingbatch) {
      let endingDate = new Date(endingbatch);
      aggreateData.push({
        $match: { "student.endingbatch": { $gte: endingDate } },
      });
    }

    if (program) {
      let programID = mongoose.Types.ObjectId(program);
      aggreateData.push({ $match: { "student.program": programID } });
    }

    if (sem) {
      aggreateData.push({
        $match: { "batches.currentActiveSem": parseInt(sem) },
      });
    }

    if (batch) {
      let batchID = mongoose.Types.ObjectId(batch);
      aggreateData.push({ $match: { "student.batch": batchID } });
    }

    studentData = await User.aggregate(aggreateData);

    return res.json({ data: studentData });
  } catch (error) {
    const errorMsg = mongoDB(error);

    if (errorMsg.length) {
      return res.status(403).json({
        error: errorMsg[0],
        errorMsgs: errorMsg,
      });
    }

    return res.status(500).json({
      error: "Error Occured",
    });
  }
};

exports.bulkStudentCreation = async (req, res) => {
  let { usertype } = req.body;

  let userData;
  try {
    if (usertype === "Student") {
      userData = await bulkCreationStudent(req);
    }

    return res.json({ msg: "All user are created", data: userData });
  } catch (error) {
    const errorMsg = mongoDB(error);

    if (errorMsg.length) {
      return res.status(403).json({
        error: errorMsg[0],
        errorMsgs: errorMsg,
      });
    }
    return res.status(500).json({ error: "Error Occured" });
  }
};
