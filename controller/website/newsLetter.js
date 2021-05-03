const NewsLetter = require("../../model/website/newsLetter");
const File = require("../../model/file");

exports.createNewsLetters = async (req, res) => {

    try {
        const user = req.user;
        const file = req.file;
        let body = req.body;

        // ? for multi part Data
        if (file) {

            const fileData = File({
                path: file.path,
                user: user.id,
                name: body.title
            });

            body.image = fileData;

            const newsData = NewsLetter(body);
            await Promise.all([fileData.save(), newsData.save()]);


            return res.json({ data: newsData });
        }

        const NewsData = NewsLetter(body);

        NewsData.save();
        return res.json({ data: NewsData });

    } catch (error) {
        return res.status(500).json({ error: "Error occured" });
    }

};

exports.listNewLetter = async (req, res) => {
    try {
        const query = req.query;

        const newsLettersData = await NewsLetter.find(query);

        return res.json({ data: newsLettersData });

    } catch (error) {
        return res.status(500).json({ error: "Error occured" });
    }

};

exports.publicListnewsLetter = async (req, res) => {

    try {

        const query = req.query;
        const currentDate = new Date;
        query.scheduledDate = { $lt: currentDate };
        const newsLetterData = await NewsLetter.find(query);

        return res.json({ data: newsLetterData });

    } catch (error) {

        return res.status(500).json({ error: "Error occured" });
    }

};

exports.editNewsLetter = async (req, res) => {

    const newsLetterData = req.newsLetter;
    const body = req.body;

    await NewsLetter.updateMany({ _id: newsLetterData._id }, body);

    return res.json({ msg: " NewsLetter Edited" });
};



exports.newsLetterByID = async (req, res, next, id) => {
    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res
                .status(406)
                .json({ status: false, msg: "This newsLetter is not acceptable" });
        }

        const data = await NewsLetter.findOne({ _id: id });

        if (!data)
            return res.status(401).json({
                msg: "This newsLetter doesn't exist",
            });

        req.newsLetter = data;

        next();
    } catch (error) {
        return res.status(500).json({ msg: "error Occured" });
    }
};