const isAuth = (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    return res.status(400).json({ success: false, message: "please login" });
  }
  next();
};
module.exports = { isAuth };
