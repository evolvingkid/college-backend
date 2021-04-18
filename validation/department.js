const User = require('../model/user');


exports.departmentReq = async (req, res, next) => {
    req.check('name', 'Name is required').notEmpty().isString().withMessage('Name Value is in valid');

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            status: false,
            error: errors
        });
    }

    const { hods } = req.body;
    if (hods) {
        const hodData = await User.findOne({ _id: hods[0].hod });

        if (!hodData) {
            return res.status(400).json({
                status: false,
                msg: "HOD Not Found"
            });
        }

    }

    next();
}