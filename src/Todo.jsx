import TodoItem from "./TodoItem";
import useLocalStorage from "./useLocalStorage";
import { useState, useRef, useMemo, useEffect } from "react";

const TodoApp = () => {
    const search = useRef();
    const newTodo = useRef();
    const [todos, setTodos] = useLocalStorage("todos", []);
    const [filter, setFilter] = useState(false);
    const [searchState, setSearchState] = useState("");
    const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

    const filteredTodos = useMemo(() => {
        if (searchState === "" && filter === false) {
            return todos;
        } else if (searchState !== "" && filter === false) {
            return todos.filter((t) => t.text.toLowerCase().includes(searchState.toLowerCase()));
        } else if (searchState === "" && filter === true) {
            return todos.filter((t) => !t.completed);
        } else {
            return todos.filter(
                (t) => t.text.toLowerCase().includes(searchState.toLowerCase()) && !t.completed
            );
        }
    }, [todos, filter, searchState]);

    function updateTodos(e) {
        e.preventDefault();
        let addNewTodo = newTodo.current.value.trim();
        if (addNewTodo) {
            setTodos((t) => [...t, { text: addNewTodo, completed: false }]);
            newTodo.current.value = "";
        }
    }

    function deleteTodo(itemToBeDeleted) {
        setTodos((t) => t.filter((todo) => todo.text !== itemToBeDeleted.text));
    }

    function clearCompletedTodos() {
        setTodos((t) => t.filter((todo) => !todo.completed));
    }

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`min-h-screen transition-all duration-300 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-purple-50"} flex items-center justify-center p-4`}>
            <div className={`w-full max-w-2xl ${darkMode ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-xl overflow-hidden transition-colors duration-300`}>
                {/* Top gradient accent */}
                <div className="h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>

                <div className="p-8">
                    {/* Header section */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? "from-purple-400 to-indigo-300" : "from-violet-600 to-fuchsia-600"}`}>
                            Cosmic Tasks
                        </h1>
                        <button 
                            onClick={toggleTheme} 
                            className={`p-3 rounded-full transition-colors ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
                            aria-label="Toggle theme"
                        >
                            {darkMode ? (
                                <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Add todo form with animation */}
                    <form className={`flex rounded-xl overflow-hidden shadow-lg mb-8 ${darkMode ? "focus-within:ring-2 focus-within:ring-purple-500" : "focus-within:ring-2 focus-within:ring-violet-300"} transition-all duration-300 group`}>
                        <input 
                            ref={newTodo}
                            type="text"
                            placeholder="Add a new task..."
                            className={`flex-grow py-4 px-5 ${darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-50 text-gray-800"} outline-none transition-colors`}
                        />
                        <button 
                            onClick={updateTodos} 
                            className={`bg-gradient-to-r ${darkMode ? "from-purple-600 to-indigo-500" : "from-violet-500 to-fuchsia-500"} text-white px-6 font-medium hover:opacity-90 transition-all duration-300 group-hover:px-8`}
                        >
                            Add
                        </button>
                    </form>

                    {/* Search and filter bar */}
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                        <div className={`flex items-center px-4 py-3 ${darkMode ? "bg-gray-700" : "bg-gray-100"} rounded-xl w-full md:w-auto md:flex-1 transition-colors`}>
                            <svg className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"} mr-3`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input 
                                onChange={(e) => setSearchState(e.target.value)} 
                                ref={search}
                                type="text"
                                placeholder="Search tasks..."
                                className={`bg-transparent ${darkMode ? "text-gray-200" : "text-gray-700"} outline-none w-full transition-colors`}
                            />
                        </div>

                        <div className="flex gap-2">
                            <button 
                                onClick={() => setFilter(true)} 
                                className={`px-4 py-3 rounded-xl transition-all duration-300 ${filter ? (darkMode ? "bg-purple-600 text-white" : "bg-violet-500 text-white") : (darkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}`}
                            >
                                Active
                            </button>
                            <button 
                                onClick={() => setFilter(false)} 
                                className={`px-4 py-3 rounded-xl transition-all duration-300 ${!filter ? (darkMode ? "bg-purple-600 text-white" : "bg-violet-500 text-white") : (darkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}`}
                            >
                                All
                            </button>
                        </div>
                    </div>

                    {/* Todo list */}
                    <div className="space-y-3">
                        {filteredTodos.length > 0 ? (
                            <ul className="space-y-2">
                                {filteredTodos.map((todo, index) => (
                                    <TodoItem 
                                        key={index} 
                                        index={index} 
                                        todoItem={todo} 
                                        setTodos={setTodos} 
                                        deleteItem={deleteTodo}
                                        darkMode={darkMode}
                                        todosList={todos}
                                    />
                                ))}
                            </ul>
                        ) : (
                            <div className={`text-center py-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <p className="font-medium">No tasks found</p>
                                <p className="text-sm">Add a new task or change your filters</p>
                            </div>
                        )}
                    </div>

                    {/* Footer section */}
                    <div className={`mt-8 pt-4 ${darkMode ? "border-gray-700" : "border-gray-200"} border-t flex justify-between items-center text-sm ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
                        <span className="font-medium">
                            {todos.reduce((noOfCompletedTodos, t) => t.completed === false ? noOfCompletedTodos + 1 : noOfCompletedTodos, 0)} tasks left
                        </span>
                        <button 
                            onClick={clearCompletedTodos} 
                            className={`px-4 py-2 rounded-lg ${darkMode ? "text-gray-400 hover:text-purple-400 hover:bg-gray-700" : "text-gray-600 hover:text-violet-500 hover:bg-gray-100"} transition-all`}
                        >
                            Clear completed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoApp;