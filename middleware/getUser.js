import User from "../models/userdb.js";

const getUser = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({ _id: req.user.user_id });
      req.user = user;
    }
  } catch (err) {
    req.locals.error = err;
  }
  return next();
};

export default getUser;
