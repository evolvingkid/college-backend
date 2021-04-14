const Program = require('../model/program');

exports.signupvalidation = async (req, res, next) => {

    req.check('email', 'Email is required').notEmpty().isEmail().withMessage('Please give valid email');
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({ min: 8 })
        .withMessage('Password must contain 8 character')
        .matches(/\d/)
        .withMessage("password must contain a number");

    //TODO: aadhar number
    //     req.check('aadhar').matches('^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$').withMessage('Must be a valid aadhar number');

    const body = req.body;

    try {

        if (body.student) {

            if (body.student.program.length) {

                let programID = body.student.program[0];

                if (!programID.match(/^[0-9a-fA-F]{24}$/)) {
                    return res.status(406).json({ error: "Please check program is correct" });
                }
    
                const programData = await Program.findOne({ _id: programID });

                req.program = programData;
    
            }
        }
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            error: "Error Occured"
        });
        
    }

    




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