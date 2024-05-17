import express from 'express'
import { addTodo, deleteTodo, getTodos, updateTodo } from '../controller/todos.controller.js';

const router = express.Router();

router.get('/',getTodos);
router.post('/add',addTodo);
router.delete('/delete',deleteTodo);
router.patch('/update',updateTodo);

export default router;