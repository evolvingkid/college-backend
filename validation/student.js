exports.studentReq = async (req, res, next) => {
    req.check('name', 'Name is required').notEmpty();
    req.check('rollnumber', 'rollnumber is required').notEmpty();
    req.check('regNumber', 'regNumber is required').notEmpty();
    req.check('phoneNumber', 'phoneNumber is required').notEmpty();
    req.check('program', 'program is required').notEmpty();
    req.check('password', 'password is required').notEmpty();
    req.check('email', 'email is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            status: false,
            error: errors
        });
    }

    next();
}