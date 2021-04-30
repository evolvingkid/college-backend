const User = require("../../model/user");
const mongoose = require("mongoose");

exports.listTeachers = async (req, res) => {
  try {
    let { department } = req.query;

    let aggregateData = [
      {
        $lookup: {
          from: "employees",
          localField: "employee",
          foreignField: "_id",
          as: "employee",
        },
      },
      { $match: { "employee.type": "Teachers" } },
    ];

    if (department) {
      console.log("department");
      aggregateData.push({
        $lookup: {
          from: "departmentmodels",
          localField: "employee.department",
          foreignField: "_id",
          as: "departmentdata",
        },
      });
      let departmentID = mongoose.Types.ObjectId(department);
      aggregateData.push({ $match: { "departmentdata._id": departmentID } });
    }

    const teacherData = await User.aggregate(aggregateData);

    for (let index = 0; index < teacherData.length; index++) {
      teacherData[index].hashed_password = undefined;
      teacherData[index].salt = undefined;
      teacherData[index].aadhar = undefined;
    }

    return res.json({
      sucess: true,
      data: teacherData,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error Occured",
    });
  }
};
