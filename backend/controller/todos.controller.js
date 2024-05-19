import Todo from "../models/todos.mode.js";

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json({ message: "success", todos })
    } catch (error) {
        return res.status(500).json({ message: "server error" })
    }
}

export const addTodo = async (req, res) => {
    const { title, isCompleted } = req.body;

    if (!title || title === '') {
        return res.status(400).json({ message: "Title is required" })
    }

    const newTask = new Todo({
        title,
        isCompleted
    })

    try {
        await newTask.save();
        return res.status(201).json({ message: "Todo added successfully", Todo: newTask })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "something went wrong" })
    }
}

export const deleteTodo = async (req, res) => {
    const {id} = req.query
    try {
        const deleteTodo = await Todo.findOneAndDelete({_id:id})
        if (deleteTodo) {
            return res.status(200).json({ message: "todo deleted successfully" })
        }
    } catch (error) {
        return res.status(500).json({ message: "server error" })
    }

}

export const updateTodo = async (req, res) => {
    const { _id, title, isCompleted } = req.body;

    // if (!title ||  title === '') {
    //     return res.status(400).json({ message: "All fields are required" });
    // }

    try {
        const todo = await Todo.findOneAndUpdate({ _id }, { title, isCompleted });
        return res.status(200).json({ message: "updated successfully", todo });
    } catch (error) {
        return res.status(500).json({ message: "sever error" });
    }

}