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