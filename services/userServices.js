const student = require("../model/student");
const UserModel = require("../model/user");
const Batch = require("../model/batch");
const Employee = require("../model/employee");

exports.createStudentServices = async (req, body) => {
  try {
    const studentData = student(body.student);
    body.student = studentData;
    const userData = new UserModel(body);

    if (studentData.program.length) {
      // * calculating ending date
      const programData = req.program;
      let startingYear = new Date(body.student.startingBatch);
      startingYear.setMonth(
        startingYear.getMonth() + 12 * programData.duration
      );
      startingYear.setMonth(startingYear.getMonth() - 2);
      studentData.endingbatch = new Date(startingYear);

      let batchData = await Batch.findOne({
        program: programData._id,
        startingDate: studentData.startingBatch,
      });

      if (!batchData) {
        batchData = await Batch({
          startingDate: studentData.startingBatch,
          endingDate: studentData.endingbatch,
          program: programData._id,
        });

        studentData.batch = batchData;
        await Promise.all([
          studentData.save(),
          userData.save(),
          batchData.save(),
        ]);
        return userData;
      }

      studentData.batch = batchData;
    }

    await Promise.all([studentData.save(), userData.save()]);

    return userData;
  } catch (error) {
    throw error;
  }
};

exports.createEmployeeServices = async (body) => {
  const employee = Employee(body.employee);
  body.employee = employee;
  userData = new UserModel(body);
  await Promise.all([employee.save(), userData.save()]);

  return userData;
};
