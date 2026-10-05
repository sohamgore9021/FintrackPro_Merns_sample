import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  generateToken,
  hashToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth.js";

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const isAlreadyInDb = await userModel.findOne({ email });

  if (isAlreadyInDb) {
    return res.status(409).json({
      message: "User already exist",
      errors: {
        path: "email",
        message: "Uer already exist",
      },
    });
  }
  try {
    const user = await userModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
    });

    res.status(201).json({
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          currency:user.currency
        },
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: `User already exist`,
      });
    }
    res.status(500).json({
      message: `Server error`,
    });
    console.log(`the error is ${error}`);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const { accessToken, refreshToken } = generateToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: hashToken(refreshToken),
    });

    res.status(200).json({
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          currency:user.currency
        },
      },
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: `Server error`,
    });
    console.log(`In Login Form:- the error is ${error}`);
  }
};

export const refreshAllTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized, refersh token not found",
    });
  }

  try {
    const data = verifyRefreshToken(refreshToken);
    const user = await userModel.findById(data.id).select("+refreshToken");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const hashedRefreshToken = hashToken(refreshToken);

    if (hashedRefreshToken !== user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, { refreshToken: null });
      res.clearCookie("refreshToken");

      return res.status(403).json({
        message: "Unauthorized, refersh token mismatch",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken(
      user._id,
    );

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: hashToken(newRefreshToken),
    });

    return res.status(200).json({
      message: "Tokens created",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          currency:user.currency
        },
        accessToken: accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: `Server error`,
    });
    console.log(`In Refresh:- the error is ${error}`);
  }
};

export const getMeController = async (req, res) => {
  try {
    const { _id, name, email, currency } = req.user;

    res.status(200).json({
      message: "User data fetched successfully",
      data: {
        user: {
          name,
          email,
          id: _id,
          currency
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      message: `Server error`,
    });
    console.log(`the error is ${error}`);
  }
};

export const logoutController = async (req, res) => {
  try {
    const { _id } = req.user;

    await userModel.findByIdAndUpdate(_id, { refreshToken: null });

    res.clearCookie("refreshToken");

    res.status(200).json({
      message: "User Logged Out",
    });
  } catch (error) {
    res.status(500).json({
      message: `Server error`,
    });
    console.log(`the error is ${error}`);
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, currency } = req.body;

    const user = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { name, currency },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Profile Updated",
      data: user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/* 
| Code    | Meaning               | When to use                                                   |
| ------- | --------------------- | ------------------------------------------------------------- |
| **200** | OK                    | Successful GET, PUT, PATCH, or general success                |
| **201** | Created               | Successfully created something → register, create transaction |
| **204** | No Content            | Successful operation with nothing to return                   |
| **400** | Bad Request           | Invalid/missing data from client                              |
| **401** | Unauthorized          | No/invalid/expired authentication                             |
| **403** | Forbidden             | Authenticated, but **not allowed** to perform the action      |
| **404** | Not Found             | User/resource/route doesn't exist                             |
| **409** | Conflict              | Duplicate/conflicting data → email already exists             |
| **422** | Unprocessable Entity  | Request format is valid but validation fails                  |
| **429** | Too Many Requests     | Rate limit exceeded                                           |
| **500** | Internal Server Error | Unexpected error on your backend                              |
| **502** | Bad Gateway           | Your server got a bad response from another server/service    |
| **503** | Service Unavailable   | Server/service temporarily unavailable                        |


200 → Fetch/update/delete successful
201 → Register/create transaction
400 → Validation/bad input
401 → Authentication problem
403 → User doesn't have permission
404 → Transaction/user not found
409 → Duplicate email/data
500 → Backend/database error
*/
