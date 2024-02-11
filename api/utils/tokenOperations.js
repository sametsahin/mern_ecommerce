import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "1d" });
};

const getTokenFromHeader = (req) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (token === undefined) return "No token found in header!";
  return token;
};
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return false;
    return decoded;
  });
};

export { generateToken, getTokenFromHeader, verifyToken };
