import { Router, Request, Response } from "express";
import {
  getAll,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/todos.controller";

const router = Router();

router.get("/todos", async (res: Response, req: Request) => {
  try {
    const response = await getAll();
    res.send({ data: response, success: true });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message, success: false });
  }
});

router.post("/todos", async (res: Response, req: Request) => {
  try {
    const { title } = req.body;
    const response = await createItem(title);
    res.send({ data: response, success: true });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message, success: false });
  }
});

router.put("/todos/:id", async (res: Response, req: Request) => {
  try {
    const { id } = req.params;
    const { isDone } = req.body;
    const response = await updateItem(id, isDone);
    res.send({ data: response, success: true });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message, success: false });
  }
});

router.delete("/todos/:id", async (res: Response, req: Request) => {
  try {
    const { id } = req.params;
    const response = await deleteItem(id);
    res.send({ data: response, success: true });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message, success: false });
  }
});

export default router;
