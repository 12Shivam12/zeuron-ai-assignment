import { useEffect, useState } from "react"
import { TodoProvider } from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from './components/Signup'
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Todos from "./components/Todos";

export default function App() {

  const [todos, setTodos] = useState([]);

  const [isActive, setIsActive] = useState(false);

  const addTodo = async ({ title, isCompleted }) => {
    // setTodos((prev) => [...prev, { id: Date.now(), ...todo }])
    const res = await fetch(`http://localhost:3000/api/todos/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, isCompleted })
    })
    const data = await res.json();
    const { _id } = data.Todo
    setTodos((prev) => [...prev, { _id, title, isCompleted }])
  }


  console.log('todos from store', todos);

  const updateTodo = async (_id, title, isCompleted) => {
    const res = await fetch(`/api/todos/update`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id, title, isCompleted })
    })
    const data = await res.json();
    // console.log(data);
    setTodos((prev) => prev.map((prevTodo) => (prevTodo._id === _id) ? { ...prevTodo, title } : prevTodo))
  }

  const deleteTodo = async (id) => {
    const res = await fetch(`/api/todos/delete?id=${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    // console.log(data);
    setTodos((prev) => prev.filter((todo) => todo._id !== id))
  }

  const toggleComplete = async (_id, isCompleted) => {
    const res = await fetch(`/api/todos/update`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id, isCompleted: !isCompleted })
    })
    const data = await res.json();
    // console.log(data);
    setTodos((prev) => prev.map((prevTodo) => (prevTodo._id === _id) ? { ...prevTodo, isCompleted: !isCompleted } : prevTodo))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/todos/`);
        const data = await res.json();
        setTodos(data.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);

      }
    };
    fetchData();
  }, []);



  return (
    <>
      <BrowserRouter>


        <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete, isActive }}>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup/>}/>
            <Route path="/todos" element={<Todos todos={todos}/>}/>
          </Routes>
        </TodoProvider>
      </BrowserRouter>

    </>
  )
}