exports.examCreationvalidation = async (req, res, next) =>{

    req.check('name', 'Name is required').notEmpty();
    req.check('date', 'date is required').notEmpty();
    req.check('batch', 'batch is required').notEmpty(); 

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            status: false,
            error: errors
        });
    }

    next();
}