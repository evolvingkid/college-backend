exports.courseReq = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty();
    req.check('courseid', 'courseid is required').notEmpty();
    req.check('program', 'program id is required').notEmpty();
    req.check('startingyear', 'startingyear id is required').notEmpty();
    req.check('isvalid', 'isvalid id is required').notEmpty();


    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            status: false,
            error: errors
        });
    }

    next();
}
