import React, { createContext, useContext, useState } from "react"
import { v4 as uuid } from "uuid"

const TodoContext = createContext();

export const TodoProvider = ({children}) => {
    const [todos, setTodos] = useState(
        [
            { id: 1, text: 'Learn React', completed: true },
            { id: 2, text: 'Learn Redux', completed: false },
        ]
    )

    const [filter, setFilter] = useState("all")

    const addTodo = (text) => {
        setTodos(prev => [...prev, { id: uuid(), text: text, completed: false }])
    }

    const toggleTodo = (id) => {
        const cloned_todos = [...todos]
        const itemIndex = cloned_todos.findIndex(todo => todo.id === id)
        const item = todos[itemIndex]
        item.completed = !item.completed
        setTodos(cloned_todos)
        console.log(todos)
    }

    const deleteTodo = (id) => {
        const cloned_todos = [...todos]
        const items = cloned_todos.filter(todo => todo.id !== id)
        setTodos(items)
    }

    const clearCompleted = () => {
        const cloned_todos = [...todos]
        const items = cloned_todos.filter(todo => todo.completed === false)
        setTodos(items)
    }

    const values = {
        todos,
        setTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
        filter,
        setFilter
    }

    return (
        <TodoContext.Provider value={values}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => {
    const context = useContext(TodoContext)

    if(context === undefined) {
        throw new Error('useTodo hook must be call inside TodoProvider component')
    }
    
    return context
}