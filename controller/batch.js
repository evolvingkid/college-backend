const Batch = require("../model/batch");

exports.addSem = async (req, res) => {
  try {
    const batchData = req.batch;
    let body;

    body = {
      currentActiveSem: req.body.name,
      sem: [req.body],
    };

    if (batchData.sem.length) {
      body = { sem: batchData.sem, currentActiveSem: req.body.name };
      body.sem[batchData.sem.length - 1].endingDate = Date();
      body["sem"].push(req.body);
    }

    await Batch.updateOne({ _id: batchData._id }, body);

    return res.json({ msg: "sem added" });
  } catch (error) {
    return res.status(500).json({
      error: "Error Occured",
    });
  }
};

exports.listbatch = async (req, res) => {
  try {
    const query = req.query;

    const batchData = await Batch.find(query).populate("program");

    return res.json({ data: batchData });
  } catch (error) {
    return res.status(500).json({ error: "Error occured" });
  }
};

exports.getBatchData = async (req, res) => {
  const batchData = req.batch;

  return res.json({ data: batchData });
};

exports.batchByID = async (req, res, next, id) => {
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(406)
        .json({ status: false, error: "This batch is not acceptable" });
    }

    const batchData = await Batch.findOne({ _id: id }).populate("program");

    if (!batchData)
      return res.status(403).json({
        status: false,
        error: "Batch is not found",
      });

    req.batch = batchData;
    next();
  } catch (error) {
    return res.status(500).json({
      error: "Error Occured",
    });
  }
};

