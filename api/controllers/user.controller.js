import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import {
  generateToken,
  getTokenFromHeader,
  verifyToken,
} from "../utils/tokenOperations.js";

//@desc       Register User
//@route      POST /api/v1/users/register
//@access     Private/Admin
const register = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists!");

  //hashing password
  const salt = await bcrypt.genSalt(10);
  if (!password) throw new Error("Enter Password!");
  const hashedPassword = await bcrypt.hashSync(password, salt);

  const user = await User.create({ fullname, email, password: hashedPassword });
  if (user) {
    res.status(201).json({
      status: "success",
      message: "User has been created!",
      data: user,
    });
  }
});

//@desc       Login User
//route      POST /api/v1/users/login
//@access     Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email });
  if (!userFound) throw new Error("No registered Email!");

  const checkPassword = await bcrypt.compare(password, userFound.password);
  if (!checkPassword) throw new Error("Password is wrong!");

  res.json({
    status: "success",
    message: "User logged in successfully!",
    userFound,
    token: generateToken(userFound?._id),
  });
});

//@desc       Get user profile
//route      get /api/v1/users/profile
//@access     private
const profile = asyncHandler(async (req, res) => {
  //find the user
  const user = await User.findById(req.userAuthId).populate("orders");
  res.json({
    status: "success",
    message: "User profile fetched successfully!",
    user,
  });
});

//@desc       Update user shipping address
//route       put /api/v1/users/update/shipping
//@access     private
const updateShippingAddress = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    address,
    city,
    postalCode,
    province,
    country,
  } = req.body;
  const user = await User.findByIdAndUpdate(
    req.userAuthId,
    {
      shippingAddress: {
        firstName,
        lastName,
        phone,
        address,
        city,
        postalCode,
        province,
        country,
      },
      hasShippingAddress: true,
    },
    { new: true }
  );
  res.json({
    status: "success",
    message: "User shipping address updated successfully",
    user,
  });
});

export { register, login, profile, updateShippingAddress };
