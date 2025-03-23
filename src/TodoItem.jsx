import { useState, useRef } from "react";

const TodoItem = ({ setTodos, todoItem, index, deleteItem, darkMode }) => {
    const [editMode, setEditMode] = useState(false);
    const editedTodo = useRef();

    // Function to handle todo editing
    function changeTodo(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const newValue = editedTodo.current.value.trim();
            if (newValue) {
                setTodos((t) => t.map(todo => 
                    todo.text === todoItem.text 
                        ? { text: newValue, completed: todo.completed } 
                        : todo
                ));
            }
            setEditMode(false);
        }
    }

    // Function to toggle completion state
    function toggleComplete() {
        setTodos((t) => {
            return t.map((todo) => 
                todo.text === todoItem.text 
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        });
    }

    // Generate accent color based on index
    const getAccentColor = (idx) => {
        if (darkMode) {
            return idx % 4 === 0 ? 'bg-purple-500' :
                   idx % 4 === 1 ? 'bg-indigo-500' :
                   idx % 4 === 2 ? 'bg-blue-500' : 'bg-violet-500';
        } else {
            return idx % 4 === 0 ? 'bg-violet-500' :
                   idx % 4 === 1 ? 'bg-fuchsia-500' :
                   idx % 4 === 2 ? 'bg-indigo-500' : 'bg-purple-500';
        }
    };

    // Function to handle escape key to cancel editing
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            changeTodo(e);
        } else if (e.key === "Escape") {
            setEditMode(false);
        }
    }

    return (
        <div className="group">
            <li className={`relative flex items-center px-6 py-4 rounded-xl transition-all duration-300 ${
                darkMode 
                    ? 'bg-gray-700 hover:bg-gray-650' 
                    : 'bg-white hover:bg-gray-50'
                } ${
                todoItem.completed ? 'opacity-70' : 'opacity-100'
                } shadow-sm hover:shadow-md`}>
                
                {/* Left accent bar with different colors */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${getAccentColor(index)} 
                    opacity-70 group-hover:opacity-100 transition-opacity`}></div>

                {/* Status indicator dot */}
                <div className={`mr-4 h-3 w-3 rounded-full flex-shrink-0 transition-colors ${
                    todoItem.completed 
                        ? (darkMode ? 'bg-purple-500' : 'bg-violet-500') 
                        : (darkMode ? 'bg-gray-600' : 'bg-gray-300')
                    } ${
                    !todoItem.completed && 'group-hover:bg-indigo-400'
                    }`}></div>

                {/* Todo text or edit input */}
                {editMode ? (
                    <input 
                        onKeyDown={handleKeyDown}
                        ref={editedTodo}
                        className={`flex-grow p-2 rounded-lg outline-none border ${
                            darkMode 
                                ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' 
                                : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-violet-300'
                            }`}
                        type="text"
                        defaultValue={todoItem.text}
                        autoFocus
                    />
                ) : (
                    <span className={`flex-grow ${
                        darkMode 
                            ? 'text-gray-200 group-hover:text-white' 
                            : 'text-gray-700 group-hover:text-gray-900'
                        } transition-colors ${
                        todoItem.completed && (darkMode ? 'line-through text-gray-500' : 'line-through text-gray-400')
                        }`}>
                        {todoItem.text}
                    </span>
                )}

                {/* Action buttons */}
                <div className={`ml-auto flex space-x-2 ${
                    darkMode 
                        ? 'opacity-0 group-hover:opacity-100' 
                        : 'opacity-30 group-hover:opacity-100'
                    } transition-all duration-300`}>
                    {/* Complete button */}
                    <button 
                        onClick={toggleComplete} 
                        className={`p-2 rounded-lg transition-colors ${
                            darkMode 
                                ? 'bg-gray-800 hover:bg-gray-600 text-gray-400 hover:text-green-400' 
                                : 'bg-gray-100 hover:bg-green-100 text-gray-500 hover:text-green-600'
                            }`}
                        aria-label={todoItem.completed ? "Mark as incomplete" : "Mark as complete"}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </button>

                    {/* Edit button */}
                    <button 
                        type="button" 
                        onClick={() => setEditMode((state) => !state)} 
                        className={`p-2 rounded-lg transition-colors ${
                            darkMode 
                                ? 'bg-gray-800 hover:bg-gray-600 text-gray-400 hover:text-blue-400' 
                                : 'bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-blue-600'
                            }`}
                        aria-label="Edit task"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>

                    {/* Delete button */}
                    <button 
                        onClick={() => deleteItem(todoItem)} 
                        className={`p-2 rounded-lg transition-colors ${
                            darkMode 
                                ? 'bg-gray-800 hover:bg-gray-600 text-gray-400 hover:text-red-400' 
                                : 'bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600'
                            }`}
                        aria-label="Delete task"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </li>
        </div>
    );
};

export default TodoItem;