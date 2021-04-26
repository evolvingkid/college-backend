const connectDB = require("./config/db");
const mongoose = require("mongoose");
const app = require("./api");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const PORT = process.env.PORT || 4000;
connectDB();
let server = app.listen(PORT, () => console.log(`Server starts on  ${PORT}`));

module.exports = server;
