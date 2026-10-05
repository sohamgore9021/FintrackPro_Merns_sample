import { body, validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid Request",
      errors: errors.array(),
    });
  }

  next();
};  

export const registerValidator = [
  body("email")
    .isString()
    .withMessage("Email must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email address")
    .bail()
    .normalizeEmail(),
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be 2–50 characters long"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isStrongPassword()
    .withMessage(
      "Strong password is required with 8+ characters, upper and lower case, a number, and a symbol.",
    ),

  handleValidationErrors
];

export const loginValidator = [
  body("email")
    .isString()
    .withMessage("Email must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email address")
    .bail()
    .normalizeEmail(),

  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .notEmpty()
    .withMessage("Password is required"),

  handleValidationErrors,
];