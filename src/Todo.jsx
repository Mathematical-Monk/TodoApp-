import TodoItem from "./TodoItem";
import useLocalStorage from "./useLocalStorage";
import { useState, useRef, useMemo, useEffect } from "react";

const TodoApp = () => {

    const search = useRef()
    const newTodo = useRef()

    const [todos, setTodos] = useLocalStorage("todos", [])

    const [filter, setFilter] = useState(false)

    const [searchState, setSearchState] = useState("")

    const filteredTodos = useMemo(() => {
       if(searchState == "" && filter == false){
          return todos
       }else if(searchState !== "" && filter == false){
          return todos.filter((t) => t.text.includes(searchState))
       }else if(searchState == "" && filter == true){
          return todos.filter((t) => !t.completed)
       }else{
          return todos.filter((t) => t.text.includes(searchState) && !t.completed)
       }
    }, [todos, filter, searchState])


    function updateTodos(e) {

        e.preventDefault()

        let addNewTodo = newTodo.current.value
        setTodos((t) => [...t, { text: addNewTodo, completed: false }])
        newTodo.current.value = ""
    }

    function deleteTodo(itemToBeDeleted) {
        setTodos((t) => t.filter((todo) => todo.text !== itemToBeDeleted.text))

    }

    function clearCompletedTodos() {
        setTodos((t) => t.filter((todo) => !todo.completed))
    }



    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                {/* Top gradient accent */}
                <div className="h-2 bg-gradient-to-r from-purple-600 to-indigo-500"></div>

                <div className="p-6">
                    {/* Header section */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-400">
                            Cosmic Tasks
                        </h1>
                        <button onClick={() => alert("this feature is not currently active")} className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                            {/* Theme toggle icon */}
                            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </button>
                    </div>

                    {/* Add todo form */}
                    <form className="flex rounded-xl overflow-hidden shadow-lg mb-6 focus-within:ring-2 focus-within:ring-purple-500">
                        <input ref={newTodo}
                            type="text"
                            placeholder="Add a new task..."
                            className="flex-grow py-3 px-4 bg-gray-700 text-gray-100 outline-none"
                        />
                        <button onClick={updateTodos} className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-6 font-medium hover:opacity-90 transition-opacity">
                            Add
                        </button>
                    </form>

                    {/* Search and filter bar */}
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                        <div className="flex items-center px-4 py-2 bg-gray-700 rounded-lg w-full md:w-auto md:flex-1">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input onChange={(e) => setSearchState(e.target.value)}  ref={search}
                                type="text"
                                placeholder="Search tasks..."
                                className="bg-transparent text-gray-200 outline-none w-full"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button onClick={() => setFilter(true)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors">
                                Active
                            </button>
                            <button onClick={() => setFilter(false)} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                                All
                            </button>
                        </div>
                    </div>

                    {/* Todo list */}
                    {filteredTodos.map((todo, index) => <TodoItem key={index} index={index} todoItem={todo} setTodos={setTodos} deleteItem={deleteTodo}></TodoItem>)}


                    {/* Footer section */}
                    <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between text-sm text-gray-500">
                        <span>{todos.reduce((noOfCompletedTodos, t) => t.completed == false ? noOfCompletedTodos + 1 : noOfCompletedTodos, 0)} tasks left</span>
                        <div className="space-x-2">
                            {/* <button className="text-gray-400 hover:text-purple-400 transition-colors">All</button>
                            <button onClick={() => setFilter(true)} className="text-gray-400 hover:text-purple-400 transition-colors">Active</button>
                            <button  className="text-gray-400 hover:text-purple-400 transition-colors">Completed</button> */}
                        </div>
                        <button onClick={clearCompletedTodos} className="text-gray-400 hover:text-purple-400 transition-colors">Clear completed</button>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default TodoApp;