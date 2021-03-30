
const { mainUserEnums } = require('../config/enums');
const Department = require('../model/department');
const { deleteProgramByParentTable } = require('../controller/program');
const Program = require('../model/program');
const Course = require('../model/course');


exports.createDepartment = async (req, res) => {


    try {
        const departmentData = await Department({
            name: req.body.name,
            hod: req.body.hod
        });

        await departmentData.save();

        return res.status(201).json({
            msg: "Department Created",
            data: departmentData
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

exports.listDepartment = async (req, res) => {

    try {
        const departmentData = await Department.find().populate("hod");

        return res.json({
            data: departmentData
        });
    } catch (error) {

        return res.status(500).json({
            status: false,
            msg: "Error Occured",
        });
    }

}

exports.editDepartment = async (req, res) => {

    try {
        let dataBaseBody = {};

        if (req.body.name) {
            dataBaseBody['name'] = req.body.name;
        }

        if (req.body.hod) {
            dataBaseBody['hod'] = req.body.hod;
        }

        await Department.updateOne({ _id: req.department._id },
            { $set: dataBaseBody });

        return res.json({
            msg: "Department Upated"
        });

    } catch (error) {

        return res.status(500).json({
            status: false,
            msg: "Error Occured",
        });
    }
}

exports.departmentDelete = async (req, res) => {

    try {

        const department = req.department;
        console.log(department._id);

        let programData = await Program.find({ departmentID: department._id });

        console.log(programData);

        let courseQuery = [];
        for (let index = 0; index < programData.length; index++) {
            courseQuery[index] = { program: programData[index]._id };
        }

        console.log(courseQuery);

        if (courseQuery.length) {
            await Promise.all([Course.deleteMany({ $or: courseQuery }),
            Program.deleteMany({ departmentID: department._id }),
            Department.deleteMany({ _id: req.department._id })])

            return res.json({
                status: true,
                msg: "Department Deleted"
            });
        }

        await Promise.all([Program.deleteMany({ departmentID: department._id }),
        Department.deleteMany({ _id: req.department._id })]);


        return res.json({
            status: true,
            msg: "Department Deleted"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            status: false,
            msg: "Error Occured",
        });

    }
}

exports.permissionOnDepartment = (req, res, next) => {

    let flag = 0;
    req.user.priviliage.forEach(element => {
        if (element == mainUserEnums.admin || element == mainUserEnums.department) {
            flag++;
        }
    });

    if (flag == 0) return res.status(401).json({
        msg: "This is user is not Authorized"
    });

    next();
}

exports.departmentByID = async (req, res, next, id) => {

    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(406).json({ status: false, msg: "This Department is not acceptable" });
        }

        const departmentData = await Department.findOne({ _id: id });

        if (!departmentData) return res.status(401).json({
            msg: "This Department doesn't exist"
        });

        req.department = departmentData;

        next();
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error occured" });
    }


}