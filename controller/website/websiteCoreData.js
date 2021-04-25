const CoreDATA = require('../../model/website/websiteCoreData');
const { mongoDB } = require('../../error/mongoDB');

exports.addCoreData = async (req, res) => {

    try {

        let body = req.body;
        body.indentifier.trim();
        const files = req.files;

        if (files) {
            body.data.img = files['data[img]'][0].path;
        }

        let coreData = CoreDATA(body);

        if (coreData.type === 'SINGLEDATA') {
            coreData.link = `webiste/coredata?indentifier=${body.indentifier}`;
        }

        await coreData.save();

        return res.json({ data: coreData });

    } catch (error) {

        const errorMsg = mongoDB(error);

        if (errorMsg.length) {
            return res.status(403).json({
                error: errorMsg[0],
                errorMsgs: errorMsg
            });
        }

        return res.status(500).json({
            error: "Error Occured",
        })

    }

}

exports.listCoreData = async (req, res) => {

    try {
        const query = req.query;

        const coreData = await CoreDATA.find(query);

        res.json({ data: coreData });
    } catch (error) {

        return res.status(500).json({
            error: "Error Occured",
        })

    }

}

exports.updateCoreData = async (req, res) => {

    try {
        let body = req.body;
        const core = req.coreData;

        const files = req.files;

        if (files) {

            if (body.data === undefined) {
                body['data'] = {};
                body.data.title = core.title;
                body.data.body = core.body;
            }

            body['data']['img'] = files['data[img]'][0].path;
        }

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
                errorMsgs: errorMsg
            });
        }

        return res.status(500).json({ msg: "Error Occured" });

    }

}

exports.coreDataByID = async (req, res, next, id) => {

    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(406).json({ status: false, msg: "This data is not acceptable" });
        }

        const coreData = await CoreDATA.findOne({ _id: id });

        if (!coreData) return res.status(403).json({ status: false, msg: "Data not found" });

        req.coreData = coreData;

        next();
    } catch (error) {

        return res.status(500).json({ msg: "Error Occured" });
    }
}