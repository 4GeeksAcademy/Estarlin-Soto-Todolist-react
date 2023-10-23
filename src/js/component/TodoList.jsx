import React, {useState} from "react";

const TodoList = () => {
    //declaro los states para mi todoList
    const [todoList, setTodoList] = useState([])
    const [input, setInput] = useState("")
    const [todoCont, setTodoCont] = useState(0)

    // declaro una funcion para escuchar la tecla enter y meter dentro del array el valor de mi input
   
    const enterItem = (e) => {
        if(e.key === 'Enter' && input != ''&& input != ' ' ){
            setTodoCont(todoList.length + 1)
            setTodoList([...todoList, input])
            setInput("")
            
        }   
    }
    //Declaro mi funcion de borrar las tareas mediante el metodo filter retorno un nuevo array sin el elemento seleccionado
    const deleteTask = (ele,index) =>{
        const newTodoList = todoList.filter((task, i)=> { return index !== i })
        setTodoList(newTodoList)
        setTodoCont(todoList.length -1)
       
    }
    
    return(
        
        <div className="container-fluid">
            <div className="row app">
            <div className="todoListTitle">
                <h1>To Do List</h1>
            </div>
            <input type="text" placeholder="What needs to be done?"  className="todoInput col-12" onKeyDown={enterItem} value={input} onChange={(event)=> setInput(event.target.value)}/>
            
            <div className="row">
                <ul >
                    
                    <div className={todoCont== 0 ? "noTaskMessage" : "hiden"}><h1>{todoCont == 0 ? "No tasks, add a task" : ""}</h1></div>
                    
                        {todoList.map((ele, index)=> <li key={index} className="task col-11">{ele} <div className="deleteIcon " onClick={() => deleteTask(ele, index)}>X</div></li>)}
                    
                </ul>
            </div>

                
                    <div className="todosCont">{todoCont} Item Left</div>
                
        </div>
        </div>
    );
}

export default TodoList;