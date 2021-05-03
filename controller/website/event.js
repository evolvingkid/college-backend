const Events = require('../../model/event');
const File = require("../../model/file");

exports.createEvent = async (req, res) => {

    try {

        let body = req.body;
        const file = req.file;
        const user = req.user;
        const department = req.department;

        // ? if multipart request
        if (file) {
            const fileData = File({
                path: file.path,
                name: body.title,
                user: user._id,

            });

            body.image = fileData;
            body.department = department._id;

            const eventData = Events(body);

            await Promise.all([eventData.save(), fileData.save()]);

            return res.json({ data: eventData });
        }

        body.department = department._id;
        const eventData = Events(body);

        await eventData.save();

        return res.json({ data: eventData });

    } catch (error) {

        return res.status(500).json({ error: "Error Occured" });
    }
}

exports.listEvents = async (req, res) => {
    try {
        let query = req.query;
        const eventData = await Events.find(query);

        return res.json({
            data: eventData
        });

    } catch (error) {

        return res.status(500).json({
            status: false,
            error: "Error Occured",
        });
    }

}

exports.publicEventView = async (req, res) => {

    try {

        const query = req.query;
        const currentDate = new Date;

        query.scheduleDate = { $lt: currentDate }; 

        const eventData = await Events.find(query);

        return res.json({
            data: eventData
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Error Occured",
        });
    }
};

exports.editEvent = async (req, res) => {

    try {
        let eventData = req.body;

        await Events.updateOne({ _id: req.event._id },
            { $set: eventData });

        return res.json({
            msg: "Event Upated"
        });

    } catch (error) {

        return res.status(500).json({
            status: false,
            error: "Error Occured",
        });
    }
}

exports.eventDelete = async (req, res) => {

    try {
        
        await Events.deleteMany({ _id: req.event._id });
        return res.json({
            status: true,
            msg: "Event Deleted"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            status: false,
            msg: "Error Occured",
        });

    }
}

exports.eventByID = async (req, res, next, id) => {
    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res
                .status(406)
                .json({ status: false, msg: "This event is not acceptable" });
        }

        const data = await Events.findOne({ _id: id });

        if (!data)
            return res.status(401).json({
                msg: "This event doesn't exist",
            });

        req.event = data;

        next();
    } catch (error) {
        return res.status(500).json({ msg: "error Occured" });
    }
};