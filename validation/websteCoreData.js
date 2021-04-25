exports.websiteCoreDataCreationValidation = async (req, res, next) => {

    req.body = JSON.parse(JSON.stringify(req.body));

    req.check('name', 'name is required').notEmpty();
    req.check('indentifier', 'indentifier is required').notEmpty();


    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            status: false,
            error: errors
        });
    }

    next();
}