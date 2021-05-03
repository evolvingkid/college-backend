const Gallery = require("../../model/website/gallery");
const File = require("../../model/file");

exports.addGallery = async (req, res) => {
    try {
        const body = req.body;
        const file = req.file;
        const userData = req.user;

        // ? is its multipart Data
        if (file) {
            const fileData = File({
                path: file.path,
                name: body.name,
                user: userData._id,
            });
            const galleryData = Gallery({
                file: fileData,
                name: body.name,
                uploadBy: userData._id
            });

            await Promise.all([fileData.save(), galleryData.save()]);
            return res.json({ data: galleryData });
        }

        // ? inhert data from files
        const galleryData = Gallery({
            file: body.file,
            name: body.name,
            uploadBy: userData._id
        });

        return res.json({ data: galleryData });

    } catch (error) {

        return res.status(500).json({ error: "Error Occured" });
    }

};

exports.listGallery = async (req, res) => {

    try {
        const query = req.query;

        const gallery = await Gallery.find(query)
            .populate("file").populate("uploadBy");

        return res.json({ data: gallery })
    } catch (error) {

        return res.status(500).json({ error: "Error Occured" });

    }

};

exports.deleteGallery = async (req, res) => {

    try {

        const galleryData = req.gallery;
        await Gallery.deleteOne({ _id: galleryData._id });

        return res.json({ msg: "Gallery Deleted" });

    } catch (error) {
        return res.status(500).json({ msg: "error Occured" });
    }
};

exports.galleryByID = async (req, res, next, id) => {
    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res
                .status(406)
                .json({ status: false, msg: "This gallery is not acceptable" });
        }

        const data = await Gallery.findOne({ _id: id });

        if (!data)
            return res.status(401).json({
                msg: "This gallery doesn't exist",
            });

        req.gallery = data;

        next();
    } catch (error) {
        return res.status(500).json({ msg: "error Occured" });
    }
};


