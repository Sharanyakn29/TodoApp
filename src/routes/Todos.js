import React,{useState,useRef,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import './todo.css'

function Todos() {
    const[todos,setTodos] = useState([])
    const[todoName,setTodoName] = useState('')
    const[editIndex,setEditIndex]=useState(null)
    // const[clickCount,setClickCount] = useState(0)
    const inputRef = useRef()

    const addOrUpdateTodo = () =>{
        if(todoName !== ''){
            if (editIndex !== null){
                
                // const updatedTodos = todos.map((todo,index) => index === editIndex ? todoName : todo)
                const updatedTodos = todos.map((todo,index)=>{
                    if(index === editIndex){
                        return {...todos,text:todoName}
                    }
                    else{
                        return todo
                    }
                })
                setTodos(updatedTodos)
                setEditIndex(null)
            }
            else{
                setTodos([...todos, {text:todoName,completed:false}])
            }
            setTodoName('')
        }        
    } 

    const editTodo = (index) =>{
        const todoName = todos[index]
        setTodoName(todoName.text)
        setEditIndex(index)
        inputRef.current.focus()
    }

    const deleteAll = () =>{        
        setTodos([])
    }

    const completedTodo = (todoId) =>{
       const updatedTodo = todos.map((todo,index)=> index===todoId ? {...todo,completed:! todo.completed}:todo )
       setTodos(updatedTodo)
        }      

    const deleteTodo = (todosId) =>{
            // const updatedTodo = todos.filter(todo => todo.todosId !== todosId);
        setTodos((previousTodo)=>
        previousTodo.filter((_,index)=>index !== todosId));
        }
               
    useEffect(()=>{
        inputRef.current.focus()
    })

    // const handleClick = (index) =>{
    //     if(todos.completed===true){
    //         deleteTodo(index)
    //     }
    //     else {
    //         completedTodo(index)
    //         todos.completed = !todos.completed
    //     }
    //     setClickCount(clickCount+1)
    // }

  return (
    <div>    
      <input type='text' value={todoName} onChange={(e)=>setTodoName(e.target.value)} ref={inputRef} />
      <button onClick={addOrUpdateTodo}> {editIndex !== null ? "Update Todo" : "Add Todo"} </button>      
      <button onClick={deleteAll}>Delete All</button>
      
        <ul>
            {todos.map((todo,index)=>(
                <>
                 <li key={index}
                  onDoubleClick={()=>editTodo(index)}
                  onClick={()=>(todo.completed? deleteTodo(index) : completedTodo(index))}
                  className= {todo.completed ? "todoCompleted" : ""}>
                    {todo.text}
                    
                 </li>
                </>            
            ))}
        </ul>      
    </div>
  )
}

export default Todos
