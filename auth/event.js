const { userPermissionEnums } = require('../config/enums');


exports.eventManagePermission = async (req, res, next) => {

    let user = req.user;

    if (user.userType === "Employee") {
        const permission = user.permission;

        if (permission.includes(userPermissionEnums.eventManage)) {
            next();
        } else {
            return res.json({ error: "This user dont have permission" });
        }
    } else {
        return res.json({ error: "This user dont have permission" });
    }

}

exports.eventReadPermission = async (req, res, next) => {

    let user = req.user;

    if (user.userType === "Employee") {
        const permission = user.permission;

        if (permission.includes(userPermissionEnums.eventManage) || permission.includes(userPermissionEnums.eventRead) ) {
            next();
        } else {
            return res.json({ error: "This user dont have permission" });
        }
    } else {
        return res.json({ error: "This user dont have permission" });
    }


}