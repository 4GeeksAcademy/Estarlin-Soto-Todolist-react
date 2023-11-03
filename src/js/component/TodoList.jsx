import React, { useState, useEffect } from "react";

const TodoList = () => {
    //declaro los states para mi todoList
    const [todoList, setTodoList] = useState([])
    const [input, setInput] = useState("")
    const [todoCont, setTodoCont] = useState(0)
    let localList = [...todoList]

    // declaro una funcion para escuchar la tecla enter y meter dentro del array el valor de mi input
    useEffect(() => {
        getTodos()
        setTodoCont(localList.length)
    })

    const enterItem = async (e) => {
        try {

            if (e.key === 'Enter' && input.length != 0) {

                const data = {
                    label: input,
                    done: false
                }

                localList.push(data)

                await fetch("https://playground.4geeks.com/apis/fake/todos/user/estarlin", {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(localList)
                });
                setInput("")
                console.log(todoList)

            }
        } catch (e) {
            console.log("enterItem function ERROR === ", e)
        }
    }
    //Declaro mi funcion de borrar las tareas mediante el metodo filter retorno un nuevo array sin el elemento seleccionado
    const deleteTask = async (ele) => {
        try {
            const newTodoList = todoList.filter((task) => { return ele !== task.id })

            await fetch("https://playground.4geeks.com/apis/fake/todos/user/estarlin", {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newTodoList)
            });

            setInput("")

        }
        catch (e) {
            console.log("deleteUser function ERROR === ", e)
        }
    }

    const getTodos = async () => {
        try {

            await fetch("https://playground.4geeks.com/apis/fake/todos/user/estarlin")
                .then((res) => res.json())
                .then((data) => setTodoList(data)
                )

        }
        catch (e) {
            console.log("Error de getTodos === ", e)
            createUser()
            location.reload(true)
        }
    }

    const deleteAll = async () => {
        try {
            await fetch("https://playground.4geeks.com/apis/fake/todos/user/estarlin", { method: 'DELETE' })
        } catch (e) {
            console.log("deleteAll function ERROR=== ", e)
        }
    }

    const createUser = async () => {
        try {
            await fetch("https://playground.4geeks.com/apis/fake/todos/user/estarlin", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify([])
            });
        }
        catch (e) {
            console.log("createUser function ERROR === ", e)
        }
    }

    return (

        <div className="container-fluid">
            <div className="row app">
                <div className="todoListTitle">
                    <h1>To Do List</h1>
                </div>
                <input type="text" placeholder="What needs to be done?" className="todoInput col-12" onKeyDown={enterItem} value={input} onChange={(event) => setInput(event.target.value)} />
                <button className="btn btn-danger w-100 my-2 p-2 fs-5" onClick={() => deleteAll()} >Delete All Tasks!!</button>

                <div className="row">
                    <ul >

                        <div className={todoCont == 5 ? "noTaskMessage" : "hiden"}><h1>{todoCont == 5 ? "No tasks, add a task" : ""}</h1></div>

                        {todoList.map((ele, index) => <li key={index} className="task col-11">{ele.label} <div className="deleteIcon " onClick={() => deleteTask(ele.id)}>X</div></li>)}

                    </ul>
                </div>
                <div className="todosCont">{todoCont} Item Left</div>

            </div>
        </div>
    );
}

export default TodoList;