const Program = require('../model/program');
const { mainUserEnums } = require('../config/enums');
const Course = require('../model/course');


exports.createProgram = async (req, res) => {

    try {
        let body = req.body;
        const programData = Program(body);

        await programData.save();
        

        return res.status(201).json({
            msg: "The program is created",
            data: programData,
        });
    } catch (error) {

        console.log(error);

        if (error.errors.name) {
            return res.status(403).json({
                error: error.errors.name.properties.message
            });
        }

        return res.status(500).json({
            status: false,
            error: "Error Occured",
        });

    }
}


exports.listProgram = async (req, res) => {

    try {

        const programData = await Program.find().populate({
            path : "department",
            populate : {
                path : "hods.hod"
            },
           // path : "course"
        }).populate('course');

        return res.json({
            data: programData
        })

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            status: false,
            msg: "Error Occured",
        });

    }

}


exports.programdelete = async (req, res) => {

    try {

        const programID = req.program;
        await Promise.all([Program.deleteMany({ _id: programID }), Course.deleteMany({ program: programID })]);

        return res.status(200).json({ status: true, msg: "Program is Deleted" });

    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error Occured" });
    }
}


exports.programByID = async (req, res, next, id) => {
    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(406).json({ status: false, msg: "This program is not acceptable" });
          }

        const programData = await Program.findOne({ _id: id });

        if (!programData) return res.status(403).json({ status: false, msg: "program not found" });

        req.program = programData;

        next();
    } catch (error) {

        return res.status(500).json({ status: false, msg: "Error Occured" });

    }

}

exports.deleteProgramByParentTable = async (query) => {

    try {
        await Program.deleteMany(query);
    } catch (error) {
        throw error;
    }

}