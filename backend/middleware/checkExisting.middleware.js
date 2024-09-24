import { User } from "../models/user.model.js";

const checkExisting = async (req, res, next) => {
    const {
      body: { username, email },
    } = req;
    const user =
      (await User.findOne({ username })) || (await User.findOne({ email }));
    if (user) {
      req.user = user;
    }
    next();
  };
export { checkExisting }