const { userPermissionEnums } = require('../config/enums');

exports.websitemanage = (req, res, next) => {
    let user = req.user;

    if (user.userType === "Employee") {
        const permission = user.permission;

        if (permission.includes(userPermissionEnums.websiteMange)) {
            next();
        } else {
            return res.json({ error: "This user dont have permission" });
        }
    } else {
        return res.json({ error: "This user dont have permission" });
    }
}