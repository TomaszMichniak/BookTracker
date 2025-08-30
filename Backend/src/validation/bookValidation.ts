import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateBook = [
    body("title")
        .isString()
        .notEmpty()
        .withMessage("Title is required"),
    body("author")
        .isString()
        .notEmpty()
        .withMessage("Author is required"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
export const validateBookId = [
    param("id")
        .isInt({ gt: 0 })
        .withMessage("Book id must be a positive integer"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];