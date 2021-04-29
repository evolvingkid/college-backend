exports.getUserData = async (req, res) => {
  const userData = req.user;

  return res.json({ data: userData });
};
