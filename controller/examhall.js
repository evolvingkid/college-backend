
const ExamHall = require('../model/examhall');
const { mainUserEnums } = require('../config/enums');

exports.createExamHall = async (req, res) => {

    try {

        const { name, maxcount, usedcount } = req.body;

        const examHall = await ExamHall({
            name: name,
            maxCount: maxcount,
            usedCount: usedcount
        });

        await examHall.save();


        return res.status(201).json({
            msg: "exam hall Created",
            data: examHall,
        });
    } catch (error) {

        if (error.errors.name) {
            return res.status(403).json({
                msg: error.errors.name.properties.message
            });
        }

        return res.status(500).json({ msg: "Error Occured" });

    }

}


exports.examHallList = async (req, res) => {

    try {
        const examHallData = await ExamHall.find();

        return res.json({ data: examHallData });
    } catch (error) {
        return res.status(500).json({ msg: "Error Occured" });
    }

}

exports.examHallEdit = async (req, res) => {

    try {

        const { name, maxcount, usedcount } = req.body;
        let databaseBody = {};

        if (name) {
            databaseBody['name'] = name;
        }

        if (maxcount) {
            databaseBody['maxCount'] = maxcount;
        }

        if (usedcount) {
            databaseBody['usedCount'] = usedcount;
        }

        const examID = req.examhall._id;
        await ExamHall.updateOne({ _id: examID }, { $set: databaseBody });


        return res.json({
            msg: "ExamHall updated"
        });


    } catch (error) {

        return res.status(500).json({ msg: "error Occured" });
    }


}


exports.examHallDelete = async (req, res) => {

    try {

        const examHallID = req.examhall._id;
        await ExamHall.deleteOne({ _id: examHallID });

        return res.json({ msg: "Examhall Deleted" });

    } catch (error) {

        return res.status(500).json({ msg: "Error Occured", status: false });
    }


}

exports.examHallPermission = (req, res, next) => {
    let flag = 0;
    req.user.priviliage.forEach(element => {
        if (element == mainUserEnums.admin || element == mainUserEnums.examHall) {
            flag++;
        }
    });

    if (flag == 0) return res.status(401).json({
        msg: "This is user is not Authorized"
    });

    next();
}


exports.examhallByID = async (req, res, next, id) => {

    try {

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(406).json({ status: false, msg: "This ExamHall is not acceptable" });
          }

        const examHall = await ExamHall.findOne({ _id: id });

        if (!examHall) return res.status(401).json({
            msg: "This ExamHall doesn't exist"
        });

        req.examhall = examHall;

        next();

    } catch (error) {

        return res.status(500).json({ msg: "error Occured" });

    }

}