"use client"
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";


const Todo = () => {
    // defining state type
    interface TodoArr {
        task: string;
        completed: boolean;
    }

    // defining states
    const [todo, setTodo] = useState<TodoArr[]>([]);
    const [inputVal, setInputVal] = useState<string>("");
    const [completedState, setCompletedState] = useState<boolean>(false);
    const [todoInLocal, setTodoInLocal] = useState<boolean>(false);

    useEffect(() => {
        setTodoInLocal(true);
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTodo(JSON.parse(savedTasks) as TodoArr[]);
        }
    }, []);


    useEffect(() => {
        if (todoInLocal) {
            localStorage.setItem("tasks", JSON.stringify(todo));
        }
    }, [todo, todoInLocal]);

    // creating add function
    const add = () => {
        if (inputVal.trim().length === 0) {
            alert("enter a task");

        } else {
            setTodo([...todo, {
                task: inputVal,
                completed: completedState
            }]);
            setInputVal("");
        }
    }



    // creating delete task function
    const delHandler = (i: any) => {
        let copyTodo = [...todo];
        copyTodo.splice(i, 1);
        setTodo(copyTodo);
    }

    const toggleCompleted = (i: number) => {
        let copyTodo = [...todo];
        copyTodo[i].completed = !copyTodo[i].completed;
        setTodo(copyTodo);
    };



    return (
        <>
            <div className="p-5 h-screen m-auto border-4 border-dark rounded-lg bg-containerColor md:w-1/2 lg:w-1/2">
                <main>
                    <div>
                        <h1 className="text-center font-bold text-dark text-6xl">TASK List</h1>
                        <form onSubmit={(e) => {
                            // stop from auto refresh
                            e.preventDefault();
                            add();
                        }
                        }>
                            <div className="flex flex-wrap justify-center">
                                <input name="taskList" value={inputVal} type="text" placeholder="Enter Task to Do..." className="focus:outline-none w-72 rounded m-3 px-3 py-2 bg-light text-dark placeholder-dark" onChange={(e) => setInputVal(e.target.value)}></input>
                                <button className="item-center bg-dark text-light rounded px-6 m-3 py-2" >Add Task</button>

                            </div>
                        </form>
                        {/* Check if todo array is empty */}
                        {todo.length === 0 ? (
                            <div className="text-center mt-5">
                                <h3 className="text-dark text-xl bg-light p-2 rounded-lg">No tasks here</h3>
                            </div>
                        ) : (
                            // render each task 
                            todo.map((item, index) => (

                                <div key={index} className="flex justify-between mt-3 bg-light p-2 rounded-lg">
                                    <ul>
                                        <li className={`text-dark text-2xl cursor-pointer ${item.completed ? "line-through" : ""
                                            }`}
                                            onClick={() => toggleCompleted(index)}>
                                            {index + 1} - {item.task}

                                        </li>
                                    </ul>
                                    <button className="w-8 text-3xl" onClick={() => {

                                        delHandler(index);

                                    }}>


                                        {/*add delete icon */}
                                        <MdDelete className="text-dark" />
                                    </button>


                                </div>

                            ))

                        )}

                    </div>
                </main>

            </div>
        </>

    )
}

export default Todo;