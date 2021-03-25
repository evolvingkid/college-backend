exports.examhallReq = async (req, res, next) => {
    req.check('name', 'Name is required').notEmpty();
    req.check('maxcount', 'maxcount is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            status: false,
            error: errors
        });
    }

    next();
}