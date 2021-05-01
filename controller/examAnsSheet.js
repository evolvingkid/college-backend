exports.CreateExamAnsSheet = async (req, res) => {
  const examHall = req.examHall;

  return res.json({ msg: "created" });
};
