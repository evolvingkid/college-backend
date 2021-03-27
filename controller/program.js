const Program = require('../model/program');
const { mainUserEnums } = require('../config/enums');


exports.createProgram = async (req, res) => {

    try {
        const programData = Program({
            name: req.body.name,
            departmentID: req.body.department
        });

        await programData.save();

        // TODO: removed before hosting
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`createProgram API : uses approximately ${used} MB`);

        return res.status(201).json({
            msg: "The program is created",
            data: programData,
        });
    } catch (error) {

        if (error.errors.name) {
            return res.status(403).json({
                msg: error.errors.name.properties.message
            });
        }

        return res.status(500).json({
            status: false,
            msg: "Error Occured",
        });

    }
}


exports.listProgram = async (req, res) => {

    try {

        const programData = await Program.find().populate('departmentID');

        // TODO: removed before hosting
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`listProgram API : uses approximately ${used} MB`);

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

        await Program.remove({ _id: req.program });

        // TODO: removed before hosting
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`programdelete API : uses approximately ${used} MB`);

        return res.status(200).json({ status: true, msg: "Program is Deleted" });

    } catch (error) {

        return res.status(500).json({ status: false, msg: "Error Occured" });

    }

}


exports.programByID = async (req, res, next, id) => {
    try {

        const programData = await Program.findOne({ _id: id });

        if (!programData) return res.status(403).json({ status: false, msg: "program not found" });

        req.program = programData;
        // TODO: removed before hosting
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`programByID API : uses approximately ${used} MB`);

        next();
    } catch (error) {

        return res.status(500).json({ status: false, msg: "Error Occured" });

    }

}




exports.programPermission = (req, res, next) => {

    let flag = 0;
    req.user.priviliage.forEach(element => {
        if (element == mainUserEnums.admin || element == mainUserEnums.department) {
            flag++;
        }
    });

    if (flag == 0) return res.status(401).json({
        msg: "This is user is not Authorized"
    });

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`programPermission API : uses approximately ${used} MB`);

    next();
}