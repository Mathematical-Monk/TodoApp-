import { useState, useRef } from "react"

const TodoItem = ({ todosList, setTodos, todoItem, index, deleteItem }) => {

    const [editMode, setEditMode] = useState(false)

    const editedTodo = useRef()

    function changeTodo(e) {

        if (e.key === "Enter") {

            e.preventDefault()
            setTodos((t) => t.map(todo => todo.text === todoItem.text ? {text:editedTodo.current.value,completed:false} : todo))
            setEditMode(false)
        }
        else {
            return
        }
    }

    function toggleComplete(){
        setTodos((t) => {
            return t.map((todo) => todo.text === todoItem.text? {...todo,completed:!todo.completed}:todo )
        })
    }

    return (
        <div>
            <li

                className="group relative flex items-center px-6 py-4 hover:bg-gray-700/30 transition-all duration-300"
            >
                {/* Left accent bar - different color for each item */}
                <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${index % 3 === 0 ? 'bg-purple-500' :
                        index % 3 === 1 ? 'bg-indigo-500' :
                            'bg-blue-500'
                        } opacity-70 group-hover:opacity-100 transition-opacity`}>
                </div>

                {/* Dot indicator */}
                <div className="mr-4 h-3 w-3 rounded-full bg-gray-600 group-hover:bg-purple-500 transition-colors"></div>

                {/* Todo text with subtle hover effects */}
                <span className={`text-gray-300 group-hover:text-white transition-colors ${ todoItem.completed ? "line-through text-gray-500" : ""
                    }`}>
                    {editMode ? <input onKeyDown={changeTodo} ref={editedTodo} className="border borderWhite rounded-2xl p-2" type="text"></input> : todoItem.text}
                </span>

                {/* Action buttons on hover */}
                <div className="ml-auto flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={toggleComplete} className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-green-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </button>

                    <form >
                        <button type="button" onClick={() => setEditMode((state) => !state)} className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-blue-400 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                    </form>


                    <button onClick={() => { deleteItem(todoItem) }} className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-red-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </li>

        </div>
    )
}

export default TodoItem
