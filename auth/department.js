const { userPermissionEnums } = require('../config/enums');


exports.departmentManagePermission = async (req, res, next) => {

    let user = req.user;

    if (user.userType === "Employee") {
        const permission = user.permission;

        if (permission.includes(userPermissionEnums.departmentManage)) {
            next();
        } else {
            return res.json({ error: "This user dont have permission" });
        }
    } else {
        return res.json({ error: "This user dont have permission" });
    }

}

exports.departmentReadPermission = async (req, res, next) => {

    let user = req.user;

    if (user.userType === "Employee") {
        const permission = user.permission;

        if (permission.includes(userPermissionEnums.departmentManage) || permission.includes(userPermissionEnums.departmentRead) ) {
            next();
        } else {
            return res.json({ error: "This user dont have permission" });
        }
    } else {
        return res.json({ error: "This user dont have permission" });
    }


}