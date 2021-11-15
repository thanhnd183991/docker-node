const user = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  const { username, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 12);
  try {
    const findUser = await user.findOne({ username });
    if (findUser) {
      return res.status(400).json({
        success: false,
      });
    }
    const rs = await user.create({
      username,
      password: hashPassword,
    });
    req.session.user = rs;
    return res.status(200).json({
      success: true,
      data: {
        rs,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
    });
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const rs = await user.findOne({ username });
    if (!rs) {
      return res.status(400).json({
        success: false,
      });
    }
    const isCorrect = await bcrypt.compare(password, rs.password);

    if (!isCorrect) {
      return res.status(400).json({
        success: false,
      });
    }
    req.session.user = rs;
    return res.status(200).json({
      success: true,
      data: {
        rs,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
    });
  }
};
module.exports = {
  login,
  register,
};
