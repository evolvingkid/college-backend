exports.signupvalidation = async (req, res, next) => {
    req.check('name', 'Name is required').notEmpty();
    req.check('email', 'Email is required').notEmpty().isEmail().withMessage('Please give valid email');
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({ min: 8 })
        .withMessage('Password must contain 8 character')
        .matches(/\d/)
        .withMessage("password must contain a number");
    req.check('designation', 'designation is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            status: false,
            error: errors
        });
    }

    next();
}

exports.signinValidation = async (req, res, next) => {

    req.check('email', 'Email is required').notEmpty().isEmail().withMessage('Please give valid email');
    req.check('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            status: false,
            error: errors
        });
    }

    next();

}


exports.passwordvalidation = async (req, res, next) => {

    req.check('currentPassword', 'Current Password is required').notEmpty();
    req.check('newPassword', 'New Password is required').notEmpty().isLength({ min: 8 })
    .withMessage('Password must contain 8 character')
    .matches(/\d/)
    .withMessage("password must contain a number");

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            status: false,
            error: errors
        });
    }

    next();

}