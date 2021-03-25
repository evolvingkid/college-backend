
const { mainUserEnums } = require('../config/enums');
const Department = require('../model/department');


exports.createDepartment = async (req, res) => {


    try {
        const departmentData = await Department({
            name: req.body.name,
            hod: req.body.hod
        });

        await departmentData.save();

        // TODO: removed before hosting
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`createDepartment API : uses approximately ${used} MB`);

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
        const departmentData = await Department.find();

        // TODO: removed before hosting
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`listDepartment API : uses approximately ${used} MB`);

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

        await Department.remove({ _id: req.department._id });

        // TODO: removed before hosting
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`deleteDepartment API : uses approximately ${used} MB`);

        return res.json({
            status: true,
            msg: "Department Deleted"
        });

    } catch (error) {

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

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`perimissionOnDeprt API : uses approximately ${used} MB`);

    next();
}

exports.departmentByID = async (req, res, next, id) => {

    const departmentData = await Department.findOne({ _id: id });

    if (!departmentData) return res.status(401).json({
        msg: "This Department doesn't exist"
    });

    req.department = departmentData;

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`departmentByID API : uses approximately ${used} MB`);

    next();
}