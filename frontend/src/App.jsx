import { useEffect, useState } from "react"
import { TodoProvider } from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

export default function App() {

  const [todos, setTodos] = useState([]);

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

  const updateTodo = async(_id, title, isCompleted) => {
    const res = await fetch(`/api/todos/update`,{
      method: "PATCH",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({_id, title, isCompleted})
    })
    const data = await res.json();
    // console.log(data);
    setTodos((prev) => prev.map((prevTodo) => (prevTodo._id === _id) ? {...prevTodo,title} : prevTodo))
  }

  const deleteTodo = async(id) => {
    const res = await fetch(`http://localhost:3000/api/todos/delete?id=${id}`,{
      method: "DELETE",
    });
    const data = await res.json();
    // console.log(data);
    setTodos((prev) => prev.filter((todo) => todo._id !== id))
  }

  const toggleComplete = async(_id, isCompleted) => {
    const res = await fetch(`/api/todos/update`,{
      method: "PATCH",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({_id, isCompleted:!isCompleted})
    })
    const data = await res.json();
    // console.log(data);
    setTodos((prev) => prev.map((prevTodo) => (prevTodo._id === _id) ? {...prevTodo,isCompleted: !isCompleted} : prevTodo))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/todos/`);
        const data = await res.json();
        setTodos(data.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);

      }
    };
    fetchData();
  }, []);


  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {
              todos.map((todo) => (
                <div key={todo._id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}