const File = require("../model/file");

exports.changeVisibiltyOfFile = async (req, res) => {
  try {
    const fileData = req.fileData;

    await File.findByIdAndUpdate(fileData._id, {
      visibility: !fileData.visibility,
    });

    return res.json({ msg: "File Visibility Change" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Error Occured" });
  }
};

exports.fileList = async (req, res) => {
  try {
    const quey = req.quey;

    const fileData = await File.find(quey);

    return res.json({ data: fileData });
  } catch {
    return res.json({ error: "Error Occured" });
  }
};

exports.fileDelete = async (req, res) => {
  try {
    const fileData = req.fileData;

    await File.deleteOne({ _id: fileData.id });

    return res.json({ msg: "Data Deleted" });
  } catch (error) {
    return res.json({ error: "Error Occured" });
  }
};

exports.sendFile = async (req, res) => {
  const fileData = req.fileData;

  return res.sendFile(__dirname + fileData.path);
};

exports.fileByID = async (req, res, next, id) => {
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(406)
        .json({ status: false, msg: "This File is not acceptable" });
    }

    const fileData = await File.findOne({ _id: id });

    if (!fileData)
      return res.status(401).json({
        msg: "This File doesn't exist",
      });

    req.fileData = fileData;

    next();
  } catch (error) {
    return res.status(500).json({ msg: "error Occured" });
  }
};
