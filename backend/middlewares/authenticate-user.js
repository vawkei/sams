const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      msg: "You are not authorized to access this route. Please login",
    });
  }
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_V);

  // res.json(verifiedToken)
  //   {
  //     "userId": "6539568ab19cab91b399c922",
  //     "name": "ben",
  //     "iat": 1698329372,
  //     "exp": 1698415772
  // }
  req.user = { userId: verifiedToken.userId, name: verifiedToken.name };
  //console.log(req.user);
  next();
};

const adminOnly = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({
        msg: "You are not authorized to access this route. Please login",
      });
  };
  const verifiedToken = jwt.verify(token,process.env.JWT_SECRET_V);
  console.log(verifiedToken);

  const user = await User.findOne({ _id: req.user.userId }).select("-password");
  //console.log(user);
  if (verifiedToken && user.role === "admin") {
    next();
  } else {
    return res.status(401).json({
      msg: "Admin only",
    });
  }
};

module.exports = { authenticateUser, adminOnly };
