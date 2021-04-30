const Department = require("../model/department");
const { deleteDeapartmentServices } = require("../services/departmentServices");

exports.createDepartment = async (req, res) => {
  try {
    const body = req.body;
    const departmentData = await Department(body);

    await departmentData.save();

    return res.status(200).json({
      msg: "Department Created",
      data: departmentData,
    });
  } catch (error) {
    if (error.errors.name) {
      return res.status(403).json({
        error: error.errors.name.properties.message,
      });
    }

    return res.status(500).json({
      status: false,
      error: "Error Occured",
    });
  }
};

exports.listDepartment = async (req, res) => {
  try {
    const departmentData = await Department.find().populate({
      path: "hods.hod",
      populate: [
        {
          path: "profilePic",
        },
        {
          path: "employee",
        },
      ],
    });

    return res.json({
      data: departmentData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.editDepartment = async (req, res) => {
  try {
    let dataBaseBody = req.body;

    await Department.updateOne(
      { _id: req.department._id },
      { $set: dataBaseBody }
    );

    return res.json({
      msg: "Department Upated",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Error Occured",
    });
  }
};

exports.departmentDelete = async (req, res) => {
  try {
    const department = req.department;
    console.log(department._id);

    await deleteDeapartmentServices(department, req);

    return res.json({
      status: true,
      msg: "Department Deleted",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.getDepartmentData = async (req, res) => {
  const departmentData = req.department;

  return res.json({ data: departmentData });
};

exports.departmentByID = async (req, res, next, id) => {
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(406)
        .json({ status: false, msg: "This Department is not acceptable" });
    }

    const departmentData = await Department.findOne({ _id: id }).populate({
      path: "hods.hod",
      populate: [
        {
          path: "profilePic",
        },
        {
          path: "employee",
        },
      ],
    });
    if (!departmentData)
      return res.status(401).json({
        msg: "This Department doesn't exist",
      });

    req.department = departmentData;

    next();
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Error occured" });
  }
};
