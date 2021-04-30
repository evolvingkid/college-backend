const Program = require("../model/course");
const Course = require("../model/course");

exports.createProgramWithCourse = async (body) => {
  let courseData = [];
  for (let index = 0; index < body.course.length; index++) {
    courseData[index] = Course(body.course[index]);
  }
  body.course = courseData;
  const programData = Program(body);

  for (let index = 0; index < body.course.length; index++) {
    courseData[index].program = programData._id;
  }
  body.course = courseData;

  await Promise.all([Course.insertMany(body.course), programData.save()]);

  return programData;
};
