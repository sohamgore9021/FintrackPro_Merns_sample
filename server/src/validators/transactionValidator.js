import { body, validationResult } from "express-validator";

export const transactionValidator = [
   body("title").trim().notEmpty().withMessage("Title is required"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required").bail()
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be greater than 0"),

  body("type")
    .notEmpty()
    .withMessage("Type is required").bail()
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),

  body("category").trim().notEmpty().withMessage("Category is required"),

  body("date").optional().isISO8601().withMessage("Invalid date"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid transaction data",
        errors: errors.array(),
      });
    }

    next();
  },
];
