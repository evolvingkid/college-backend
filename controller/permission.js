const { userPermissionEnums } = require('../config/enums');

exports.viewPermission = (req, res) => {

    let value = [];
    
    for (const key in userPermissionEnums) {
        value.push(userPermissionEnums[key]);
    }
    return res.json({data : value});
}
