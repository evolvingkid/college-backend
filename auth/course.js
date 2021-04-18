const { userPermissionEnums } = require('../config/enums');


exports.courseManagePermission = async (req, res, next) => {

    let user = req.user;

    if (user.userType === "Employee") {
        const permission = user.permission;

        if (permission.includes(userPermissionEnums.courseManage)) {
            next();
        } else {
            return res.json({ error: "This user dont have permission" });
        }
    } else {
        return res.json({ error: "This user dont have permission" });
    }

}

exports.courseReadPermission = async (req, res, next) => {

    let user = req.user;

    if (user.userType === "Employee") {
        const permission = user.permission;

        if (permission.includes(userPermissionEnums.courseManage) || permission.includes(userPermissionEnums.courseRead) ) {
            next();
        } else {
            return res.json({ error: "This user dont have permission" });
        }
    } else {
        return res.json({ error: "This user dont have permission" });
    }


}