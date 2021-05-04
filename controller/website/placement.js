const Placement = require("../../model/website/placement")

exports.createPlacement = async (req, res) => {

    try {

        const body = req.body;

        const placementData = Placement(body);
        await placementData.save();

        return res.json({ data: placementData });

    } catch (error) {

        return res.status(500).json({ error: "Error Occured" });
    }
};

exports.listPlacement = async (req, res) => {

    try {

        const query = req.query;
        const placementData = await Placement.find(query);

        return res.json({ data: placementData });

    } catch (error) {

        return res.status(500).json({ error: "Error Occured" });
    }
};

exports.editPlacement = async (req, res) => {

    try {

        const body = req.body;
        const placementData = req.placement;

        await Placement.updateMany({ _id: placementData._id }, body);

        return res.json({ msg: "Placement Updated" });

    } catch (error) {

        return res.status(500).json({ msg: "error Occured" });
    }
};

exports.deleteplacement = async (req, res) => {

    try {
        const placementData = req.placement;
        await Placement.deleteMany({ _id: placementData.id });
        return res.json({ msg: "Placement Deleted" });
    } catch (error) {

        return res.status(500).json({ msg: "error Occured" });
    }

};


exports.placementByID = async (req, res, next, id) => {
    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res
                .status(406)
                .json({ status: false, msg: "This placement is not acceptable" });
        }

        const data = await Placement.findOne({ _id: id });

        if (!data)
            return res.status(401).json({
                msg: "This placement doesn't exist",
            });

        req.placement = data;

        next();
    } catch (error) {
        return res.status(500).json({ msg: "error Occured" });
    }
};