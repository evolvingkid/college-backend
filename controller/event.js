
const { mainUserEnums } = require('../config/enums');
const Department = require('../model/department');
const Program = require('../model/program');
const Course = require('../model/course');
const Events = require('../model/event');


exports.createEvent = async (req, res) => {

    try {
        const body = req.body;
        const eventData = await Events(body);

        await eventData.save();

        return res.status(200).json({
            msg: "Event Created",
            data: eventData
        });
    } catch (error) {

        if (error?.errors?.name) {
            return res.status(403).json({
                error: error.errors.name.properties.message
            });
        }

        return res.status(500).json({
            status: false,
            error: error,
        });

    }


}

exports.listEvents = async (req, res) => {
    try {
        const eventData = await Events.find();

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

        await Events.remove({ _id: req.event._id });
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
            return res.status(406).json({ status: false, msg: "This Department is not acceptable" });
        }

        const eventData = await Events.findOne({ _id: id });

        if (!eventData) return res.status(401).json({
            msg: "This Department doesn't exist"
        });

        req.event = eventData;

        next();
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error occured" });
    }


}