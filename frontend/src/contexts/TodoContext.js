import { useContext } from "react";
import { createContext } from "react";

export const TodoContext = createContext({
    todos:[
        {
            _id:1,
            title:"Todo msg",
            isCompleted:false
        }
    ],
    isActive: false,
    addTodo: (todo) =>{

    },
    deleteTodo: (id) =>{

    },
    updateTodo: (id,todo) =>{

    },
    toggleComplete:(id) =>{
        
    }
});


export const useTodo = () =>{
    return useContext(TodoContext);
}


export const TodoProvider = TodoContext.Provider