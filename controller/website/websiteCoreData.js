const CoreDATA = require('../../model/website/websiteCoreData');

exports.addCoreData = async (req, res) => {

    try {

        const body = req.body;
        body.indentifier.trim();
        let coreData = CoreDATA(body);

        if (coreData.type === 'SINGLEDATA') {
            coreData.link = `website/coredata?indentifier=${body.indentifier}`;
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