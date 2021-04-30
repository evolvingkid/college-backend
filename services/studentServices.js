const User = require("../model/user");
const Studnet = require("../model/student");
const Batch = require("../model/batch");

exports.bulkCreationStudent = async (req) => {
  try {
    let bulkuser = [];
    let bulkStudent = [];

    let { studnet, usertype, program, startingBatch } = req.body;
    const programData = req.program;
    let isBatchAlready = true;

    let batch = await Batch.findOne({
      $and: [{ startingDate: startingBatch }, { program: program }],
    });

    if (batch) {
      isBatchAlready = false;

      batch = Batch({ startingDate: startingBatch, program: program });
      let endingDate = new Date(batch.startingDate);

      endingDate.setMonth(endingDate.getMonth() + 12 * programData.duration);
      endingDate.setMonth(endingDate.getMonth() - 2);
      batch.endingDate = endingDate;
    }

    for (let index = 0; index < studnet.length; index++) {
      let studentSingle = Studnet(studnet[index].student);
      studentSingle.program = [program];
      studentSingle.startingBatch = startingBatch;
      studentSingle.endingbatch = batch.endingDate;
      studentSingle.batch = batch._id;

      let userSingle = User(studnet[index]);
      userSingle.userType = usertype;
      userSingle.student = studentSingle;

      bulkuser.push(userSingle);
      bulkStudent.push(studentSingle);
    }

    if (isBatchAlready) {
      await Promise.all([
        User.insertMany(bulkuser),
        Studnet.insertMany(bulkStudent),
      ]);
      return bulkuser;
    }

    await Promise.all([
      User.insertMany(bulkuser),
      Studnet.insertMany(bulkStudent),
      batch.save(),
    ]);
  } catch (error) {
    throw error;
  }
};
