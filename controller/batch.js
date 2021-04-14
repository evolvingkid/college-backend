const Batch = require('../model/batch');


exports.addSem = async (req, res) => {
    try {

        const batchData = req.batch;
        const body = { sem: req.body };

        await Batch.updateOne({ _id: batchData._id }, { $push: body });

        return res.json({ msg: "sem added" });
        
    } catch (error) {

        return res.status(500).json({
            error: "Error Occured"
        });
    }

}




exports.batchByID = async (req, res, next, id) => {

    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(406).json({ status: false, error: "This batch is not acceptable" });
        }

        const batchData = await Batch.findOne({ _id: id });


        if (!batchData) return res.status(403).json({
            status: false,
            error: "Batch is not found"
        });

        req.batch = batchData;
        next();

    } catch (error) {

        return res.status(500).json({
            error: "Error Occured"
        });

    }

}