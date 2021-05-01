const CoreDATA = require("../../model/website/websiteCoreData");
const { mongoDB } = require("../../error/mongoDB");
const Department = require("../../model/department");
const Course = require("../../model/course");
const Program = require("../../model/program");
const File = require("../../model/file");

exports.addCoreData = async (req, res) => {
  try {
    let body = req.body;
    body.indentifier.trim();
    const files = req.files;

    // to take multipart data
    if (files) {
      body.data.img = files["data[img]"][0].path;
    }

    let coreData = CoreDATA(body);

    if (
      coreData.type === "SINGLEDATA" ||
      coreData.type === "COLLECTIONOFDATA"
    ) {
      // for collection data and single data
      coreData.link = `webiste/coredata?indentifier=${body.indentifier}`;
    }

    if (coreData.type === "PAGES") {
      // for page data since we need to indentify it before the core data find query
      // so that every data can be loaded async
      coreData.link = `webiste/coredata?indentifier=${body.indentifier}&type=PAGES`;
    }

    await coreData.save();

    return res.json({ data: coreData });
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

exports.listCoreData = async (req, res) => {
  try {
    const query = req.query;

    if (query.type === "PAGES") {
      //* view core data from webpages
      //since page needed these data these are shown outside

      const pageData = await getDataFromPages(query);

      return res.json({ data: pageData });
    }

    const coreData = await CoreDATA.find(query);

    res.json({ data: { coreData: coreData } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error Occured",
    });
  }
};

exports.updateCoreData = async (req, res) => {
  try {
    let body = req.body;
    const core = req.coreData;

    const files = req.files;

    if (files) {
      // because of undefined error occured idf update dont have title or body
      if (body.data === undefined) {
        body["data"] = {};
        body.data.title = core.title;
        body.data.body = core.body;
      }

      body["data"]["img"] = files["data[img]"][0].path;
    }
    // cant change indentifier in any way once it is set it cannot be edited
    if (body.indentifier) {
      body.indentifier = core.indentifier;
    }

    await CoreDATA.updateOne({ _id: core._id }, body);

    return res.json({ msg: "core data update" });
  } catch (error) {
    const errorMsg = mongoDB(error);

    if (errorMsg.length) {
      return res.status(403).json({
        error: errorMsg[0],
        errorMsgs: errorMsg,
      });
    }

    return res.status(500).json({ msg: "Error Occured" });
  }
};

exports.deleteCoreData = async (req, res) => {
  try {
    const coreData = req.coreData;

    await CoreDATA.remove({ _id: coreData.id });

    return res.json({ msg: "The core data removed" });
  } catch {
    return res.json({ msg: "Error Occured" });
  }
};

exports.coreDataByID = async (req, res, next, id) => {
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(406)
        .json({ status: false, msg: "This data is not acceptable" });
    }

    const coreData = await CoreDATA.findOne({ _id: id });

    if (!coreData)
      return res.status(403).json({ status: false, msg: "Data not found" });

    req.coreData = coreData;

    next();
  } catch (error) {
    return res.status(500).json({ msg: "Error Occured" });
  }
};

async function getDataFromPages(query) {
  const [
    courseData,
    departmentData,
    programData,
    fileData,
    navBarData,
    coreData,
  ] = await Promise.all([
    Course.find(),
    Department.find(),
    Program.find(),
    File.find(),
    CoreDATA.findOne({ indentifier: "NavBar" }).populate({
      path: "collectionOfDatas.data",
      populate: {
        path: "collectionOfDatas.data",
      },
    }),
    CoreDATA.findOne(query).populate({
      path: "collectionOfDatas.data",
      populate: {
        path: "collectionOfDatas.data",
      },
    }),
  ]);

  let reqFeild = {
    Department: departmentData,
    course: courseData,
    program: programData,
    File: fileData,
  };

  let fileResponce = {};

  fileResponce["coreData"] = coreData;
  // required feild managing
  const requiredFeild = coreData[0].requiredFeilds;

  if (requiredFeild) {
    for (i = 0; i < requiredFeild.length; i++) {
      if (reqFeild.hasOwnProperty(requiredFeild[i])) {
        fileResponce[requiredFeild[i]] = reqFeild[requiredFeild[i]];
      }
    }
  }

  if (requiredFeild.includes("NavBar")) {
    fileResponce["NavBar"] = navBarData;
  }

  return fileResponce;
}
