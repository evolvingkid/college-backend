const User = require("../../model/user");

const bcrypt = require("bcrypt");
const Student = require("../../model/student");
const File = require("../../model/file");
const { mongoDB } = require("../../error/mongoDB");

exports.getUserData = async (req, res) => {
  const userData = req.user;

  return res.json({ data: userData });
};

exports.listUsers = async (req, res) => {
  try {
    const query = body.query;

    const userData = await User.find(query)
      .populate("student")
      .populate("employee")
      .populate("profilePic");

    for (let index = 0; index < userData.length; index++) {
      userData[index].hashed_password = undefined;
      userData[index].salt = undefined;
    }

    return res.json({
      sucess: true,
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Error Occured",
    });
  }
};

exports.userEdit = async (req, res) => {
  try {
    const obj = Object.assign({}, req.body);

    let body = obj;

    const userData = req.userIDData;
    const file = req.files;
    let fileData = [];

    if (file) {
      if (file.profilePic) {
        const profilePic = File({
          path: file.profilePic[0].path,
          user: userData._id,
        });
        fileData.push(profilePic);
        body.profilePic = profilePic._id;
      }

      if (file.adharFile) {
        const aadharFile = File({
          path: file.adharFile[0].path,
          user: userData._id,
        });
        fileData.push(aadharFile);
        body.aadharCard = aadharFile._id;
      }

      if (file.certificate) {
        const certificateFile = File({
          path: file.certificate[0].path,
          user: userData._id,
        });
        fileData.push(certificateFile);
        body.certificate = certificateFile._id;
      }
      await Promise.all([
        User.updateOne({ _id: userData._id }, body),
        File.insertMany(fileData),
      ]);
    } else {
      await User.updateOne({ _id: userData._id }, body);
    }

    return res.json({ msg: "user updated" });
  } catch (error) {
    const errorMsg = mongoDB(error);

    if (errorMsg.length) {
      return res.status(403).json({
        error: errorMsg[0],
        errorMsgs: errorMsg,
      });
    }

    return res.status(500).json({
      error: "Error Occured",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userData = req.userIDData;
    await Promise.all([
      Student.deleteOne({ _id: userData.student }),
      User.deleteOne({ _id: userData._id }),
    ]);

    res.json({
      sucess: true,
      msg: "user is deleted",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error Occured",
    });
  }
};

exports.userPasswordChange = async (req, res) => {
  try {
    const userData = req.user;
    const { currentPassword, newPassword } = req.body;

    bcrypt.compare(
      currentPassword,
      userData.password,
      async function (err, result) {
        if (!result) {
          return res.status(403).json({ msg: "User password is wrong" });
        }

        bcrypt.hash(newPassword, 10, async function (err, hash) {
          await User.updateOne({ _id: userData._id }, { password: hash });

          return res.json({ msg: "User Password change" });
        });
      }
    );
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error Occured",
    });
  }
};

exports.userByID = async (req, res, next, id) => {
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(406)
        .json({ status: false, error: "This user is not acceptable" });
    }

    const userData = await User.findOne({ _id: id });

    if (!userData)
      return res.status(403).json({
        status: false,
        error: "User is not found",
      });

    req.userIDData = userData;

    next();
  } catch (error) {
    console.log(`userbyID ${error}`);

    return res.status(500).json({ status: false, error: "Error occured" });
  }
};
