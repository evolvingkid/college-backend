exports.seatArragemnetValidation = async (req, res, next) => {
  req.check("date", "date is required").notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      status: false,
      error: errors,
    });
  }

  next();
};

exports.attendanceExamValidation = async (req, res, next) => {
  req.check("date", "date is required").notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      status: false,
      error: errors,
    });
  }

  next();
};

