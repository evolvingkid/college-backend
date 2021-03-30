const User = require('../model/user');


exports.departmentReq = async (req, res, next) => {
    req.check('name', 'Name is required').notEmpty().isString().withMessage('Name Value is in valid');
    req.check('hod', 'HOD is required').notEmpty()
        .isString().withMessage('HOD Value is in valid')
        .matches(/^[0-9a-fA-F]{24}$/).withMessage('HOD Value is in valid');

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            status: false,
            error: errors
        });
    }

    const { hod } = req.body;
    const hodData = await User.findOne({ _id: hod });

    if (!hodData) {
        return res.status(400).json({
            status: false,
            msg: "HOD Not Found"
        });
    }

    next();
}