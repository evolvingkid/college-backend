const student = require("../model/student");
const UserModel = require("../model/user");
const Batch = require("../model/batch");
const Employee = require("../model/employee");

exports.createStudentServices = async (req, body) => {
  const studentData = student(body.student);
  body.student = studentData;
  const userData = new UserModel(body);
  let batchData;
  try {
    if (studentData.program.length) {
      // * calculating ending date
      const programData = req.program;
      let startingYear = new Date(body.student.startingBatch);
      startingYear.setMonth(
        startingYear.getMonth() + 12 * programData.duration
      );
      startingYear.setMonth(startingYear.getMonth() - 2);
      studentData.endingbatch = new Date(startingYear);

      batchData = await Batch.findOne({
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

    // !need to delete unwanted data if error Occured in this function and retrive back

    if (batchData) {

      await Promise.all([
        student.deleteMany({ _id: studentData._id }),
        UserModel.deleteMany({ _id: userData._id }),
        Batch.deleteMany({ _id: batchData._id })
      ]);

    } else {

      await Promise.all([student.deleteMany({ _id: studentData._id }),
      UserModel.deleteMany({ _id: userData._id })]);
    }

    throw error;
  }
};

exports.createEmployeeServices = async (body) => {

  const employee = Employee(body.employee);
  body.employee = employee;
  userData = new UserModel(body);

  try {
    await Promise.all([employee.save(), userData.save()]);
    return userData;
  } catch (error) {

    // ! to delete unwanted Data
    await Promise.all([Employee.deleteMany({ _id: employee._id }),
    userData.deleteMany({ _id: userData._id })])
    throw error;

  }

};
