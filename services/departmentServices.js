const Program = require("../model/program");
const Course = require("../model/course");
const Department = require("../model/department");

exports.deleteDeapartmentServices = async (department) => {
  let programData = await Program.find({ departmentID: department._id });

  let courseQuery = [];
  for (let index = 0; index < programData.length; index++) {
    courseQuery[index] = { program: programData[index]._id };
  }

  if (courseQuery.length) {
    await Promise.all([
      Course.deleteMany({ $or: courseQuery }),
      Program.deleteMany({ departmentID: department._id }),
      Department.deleteMany({ _id: req.department._id }),
    ]);

    return "Department Deleted";
  }
  await Promise.all([
    Program.deleteMany({ departmentID: department._id }),
    Department.deleteMany({ _id: req.department._id }),
  ]);

  return "Department Deleted";
};
