const CoreData = require('../../model/website/websiteCoreData');

exports.websiteCoreListDataCreate = async (req, res) => {

    let body = req.body;

    if (body.type === 'COLLECTIONOFDATA') {
        body.link = `webiste/coredata?indentifier=${body.indentifier}`;
    }

    const coreData = CoreData(body);

    await coreData.save();

    return res.json({ data: coreData });

}