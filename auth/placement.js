const { userPermissionEnums } = require('../config/enums');


exports.placementManagePermission = async (req, res, next) => {

    let user = req.user;

    if (user.userType === "Employee") {
        const permission = user.permission;

        if (permission.includes(userPermissionEnums.placementManage)) {
            next();
        } else {
            return res.json({ error: "This user dont have permission" });
        }
    } else {
        return res.json({ error: "This user dont have permission" });
    }

}

exports.placementReadPermission = async (req, res, next) => {

    let user = req.user;

    if (user.userType === "Employee") {
        const permission = user.permission;

        if (permission.includes(userPermissionEnums.placementManage) || permission.includes(userPermissionEnums.placementRead) ) {
            next();
        } else {
            return res.json({ error: "This user dont have permission" });
        }
    } else {
        return res.json({ error: "This user dont have permission" });
    }


}