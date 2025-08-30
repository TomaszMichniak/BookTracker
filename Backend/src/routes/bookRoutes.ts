import { Router} from "express";
import { BookController } from "../controllers/bookController";
import { validateBook, validateBookId } from "../validation/bookValidation";

const router = Router();
const controller = new BookController();

router.get("/books", controller.getAllBooks);
router.post("/books", validateBook, controller.addBook);
router.patch("/books/:id/read", validateBookId, controller.markRead);

export default router;