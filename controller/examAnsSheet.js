const SeatArragement = require("../model/seatArragement");



exports.addAnsSheet = async (req, res) => {

  const userData = req.userIDData;
  const { ansSheet } = req.body;

  await SeatArragement.updateOne({ student: userData._id },
    { ansSheet: ansSheet });

  return res.json({ msg: "Ans Paper Added" });

};
