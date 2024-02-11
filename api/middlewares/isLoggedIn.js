import { getTokenFromHeader, verifyToken } from "../utils/tokenOperations.js";

const isLoggedIn = (req, res, next) => {
  const token = getTokenFromHeader(req);

  const decodedUser = verifyToken(token);
  if (!decodedUser)
    throw new Error("Invalid/Expired token, please login again!");
  req.userAuthId = decodedUser?.id;
  next();
};

export default isLoggedIn;
