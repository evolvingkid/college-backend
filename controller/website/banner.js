const Banner = require("../../model/website/banner");
const File = require("../../model/file");

exports.bannerCreation = async (req, res) => {
  try {
    const fileData = req.files;

    let body = req.body;
    let fileDatas;
    if (fileData) {
      fileDatas = File({ path: fileData["img"][0].path });
      body.img = fileDatas;
    }

    const bannerData = Banner(body);

    await Promise.all([bannerData.save(), fileDatas.save()]);

    return res.json({ data: bannerData });
  } catch (error) {
    return res.json({ error: "Error Occured" });
  }
};

exports.bannerList = async (req, res) => {
  try {
    const bannerData = await Banner.find().populate("img");

    return res.json({ data: bannerData });
  } catch (error) {
    return res.json({ error: "Error Occured" });
  }
};

exports.bannerDelete = async (req, res) => {
  try {
    const bannerData = req.banner;

    await Banner.deleteOne({ _id: bannerData._id });

    return res.json({ msg: "Banner Deleted" });
  } catch (error) {
    return res.json({ error: "Error Occured" });
  }
};

exports.bannerByID = async (req, res, next, id) => {
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(406)
        .json({ status: false, msg: "This Banner is not acceptable" });
    }

    const bannerData = await Banner.findOne({ _id: id });

    if (!bannerData)
      return res.status(401).json({
        msg: "This Banner doesn't exist",
      });

    req.banner = bannerData;

    next();
  } catch (error) {
    return res.status(500).json({ msg: "error Occured" });
  }
};
