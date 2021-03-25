
const ExamHall = require('../model/examhall');

exports.createExamHall = async (req, res) => {

    try {

        const { name, maxcount } = req.body;


        const examHall = await ExamHall({ name: name, maxCount: maxcount });

        await examHall.save();


        return res.status(201).json({
            msg: "exam hall Created",
            data: examHall,
        });
    } catch (error) {

        return res.status(500).json({ msg: "Error Occured" });

    }

}