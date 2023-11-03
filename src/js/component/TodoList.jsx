import React, { useState, useEffect } from "react";

const TodoList = () => {
    //declaro los states para mi todoList
    const [todoList, setTodoList] = useState([])
    const [input, setInput] = useState("")
    const [todoCont, setTodoCont] = useState(0)
    let localList = [...todoList]

    // utilizo el hook UseEffect para actualizar mi lista de todos y mi contador de todos
    useEffect(() => {
        getTodos()
        setTodoCont(localList.length)

    })

    //declaro mi funcion para leer los valores escritos por el usuario, luego capturo la tecla enter con un if
    //creo un objeto con los valores si el input no esta vacio para luego hacer un PUT request
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

            }
        } catch (e) {
            console.log("enterItem function ERROR === ", e)
        }
    }
    //Declaro mi funcion de borrar las tareas mediante el metodo filter retorno un nuevo array sin el elemento seleccionado y luego hago un put con el array retornado
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
    // hago un GET request para convertir la respuesta en mi estado local
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
    // declaro mi funcion y deleteAll que borra todos las tareas
    const deleteAll = async () => {
        try {
            await fetch("https://playground.4geeks.com/apis/fake/todos/user/estarlin", { method: 'DELETE' })
        } catch (e) {
            console.log("deleteAll function ERROR=== ", e)
        }
    }
    //declaro mi funcion que hace un POST request y crear el usuario en caso de ser borrado
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
                <input type="text" placeholder="What needs to be done?" className="todoInput col-12 form-control" onKeyDown={enterItem} value={input} onChange={(event) => setInput(event.target.value)} />

                <button className="btn btn-danger w-100 my-2 p-2 fs-5" onClick={() => deleteAll()} >Delete All Tasks!!</button>

                <div className={todoCont == 1 ? "noTaskMessage" : "hiden"}>
                    <h1>{todoCont == 1 ? "No tasks, add a task" : ""}</h1>
                </div>

                <div className="row">
                    <ul >
                        {todoList.map((ele, index) => <li key={index} className={index > 0 ? "task col-11" : "hide"}>{ele.label} <div className="deleteIcon " onClick={() => deleteTask(ele.id)}>X</div></li>)}
                    </ul>
                </div>
                <div className="todosCont">{todoCont - 1} Item Left</div>
            </div>
        </div>
    );
}

export default TodoList;