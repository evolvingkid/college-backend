const Examhall = require("../model/examhall");
const SeatArrangemnet = require("../model/seatArragement");

exports.seatArragmentprintOut = async (query) => {


    const examHallData = await Examhall.find();

    let arrangeData = [];

    for (let index = 0; index < examHallData.length; index++) {

        let lessArrange = {};
        const seatArragment = await SeatArrangemnet
            .find({ examhall: examHallData[index]._id, date: query.date })
            .populate({
                path : "course",
                populate : {
                    path : "program"
                }
            }).populate({
                path: "student", populate: {
                    path: "student"
                }
            });

            if (!seatArragment.length) {
             continue;
            }

            lessArrange['examHall'] = examHallData[index].name;
            lessArrange['course'] = [];

        for (let j = 0; j < seatArragment.length; j++) {

            if (!isExistsInList('course', seatArragment[j].course.program.name, lessArrange['course'])) {
                let courseArange = {
                    course: seatArragment[j].course.program.name,
                    student: [seatArragment[j].student.student.rollno]
                }

                lessArrange['course'].push(courseArange);
                continue;
            }

            let listIndex = whereIndexInList('course', seatArragment[j].course.program.name, lessArrange['course']);


            if (listIndex == null) {
                console.log("couldn't find index");
                continue;
            }

            lessArrange['course'][listIndex].student.push(seatArragment[j].student.student.rollno);

        }
        arrangeData.push(lessArrange);

    }


    return arrangeData;

};


function isExistsInList(key, value, list) {

    for (let index = 0; index < list.length; index++) {

        if (list[index][key] === value) {
            return true;
        }

    }
    return false;

}


function whereIndexInList(key, value, list) {

    for (let index = 0; index < list.length; index++) {

        if (list[index][key] === value) {
            return index;
        }

    }
    return null;
}