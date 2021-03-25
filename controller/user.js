const User = require('../model/user');
const { mainUserEnums } = require('../config/enums')

exports.listUsers = async (req, res) => {

    try {
        const userData = await User.find();

        // TODO: removed before hosting
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`listUsers API : uses approximately ${used} MB`);

        res.json({
            sucess: true, data: userData
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error Occured"
        });

    }
}

exports.deleteUser = async (req, res) => {

    try {

        await User.deleteOne({ _id: req.userIDData });

        // TODO: removed before hosting
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`deleteuser API : uses approximately ${used} MB`);

        res.json({
            sucess: true,
            msg: "user is deleted"
        });

    } catch (error) {

        return res.status(500).json({
            msg: "Error Occured"
        });

    }
}

exports.userByID = async (req, res, next, id) => {

    const userData = await User.findOne({ _id: id });

    if (!userData) return res.status(403).json({
        status: false,
        msg: "User is not found"
    });

    req.userIDData = userData;

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`userByID API : uses approximately ${used} MB`);

    next();

}

exports.userPermission = (req, res, next) => {

    let flag = 0;
    req.user.priviliage.forEach(element => {
        if (element == mainUserEnums.admin) {
            flag++;
        }
    });

    if (flag == 0) return res.status(401).json({
        msg: "This is user is not Authorized"
    });

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`userPermission API : uses approximately ${used} MB`);

    next();
}