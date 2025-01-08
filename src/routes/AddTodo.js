import React,{useState,useRef,useEffect} from 'react'
import './todo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheckToSlot} from '@fortawesome/free-solid-svg-icons'
function AddTodo() {

    const[todos,setTodos] = useState([])
    const[todoName,setTodoName] = useState('')
    const[editIndex,setEditIndex]=useState(null)
    // const[showButtons,setShowButtons]=useState(false)
    const[hoverTodoId,setHoverTodoId]=useState(null)
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

    const deleteTodo = (todosId) =>{
        // const updatedTodo = todos.filter(todo => todo.todosId !== todosId);
           setTodos((previousTodo)=>
            previousTodo.filter((_,index)=>index !== todosId));
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
        
    function handleMouseOver(todoId) {
        setHoverTodoId(todoId)

    }
    const handleMouseOut = () =>{
    setHoverTodoId(null)
    }        

    // const clearCompleted = () =>{
    //         const total_todos=((previousTodo)=>
    //         previousTodo.filter((todo,index)=> todo.completed!==true));
    //         setTodos(total_todos)
    // }

    const clearCompleted = () =>{
        setTodos((previousTodo) =>{
            const remainingTodos = previousTodo.filter((todo,index)=> todo.completed!==true);
            console.log(remainingTodos)
            return remainingTodos
        })
    }

    useEffect(()=>{
        inputRef.current.focus()
    },[todos])

  return (
    <div className='App'>
        <div className='main-container'>
            <div className='heading'>Todo List</div> 
            <div>
                <input type='text' value={todoName} onChange={(e)=>setTodoName(e.target.value)} ref={inputRef} 
                placeholder='Add your new todo' className='todo-input'/>
                <button onClick={addOrUpdateTodo} className='btn1'> {editIndex !== null ? "Update Todo" : "Add Todo"} </button>
            </div>    
            <ul className='todo-container'>
                {todos.map((todo,index)=>(
                    <>
                    <div className='todos'>
                    <li key={index} className= {todo.completed ? "todoCompleted" : "todo"} 
                    onMouseOver={()=>handleMouseOver(index)} onMouseOut={handleMouseOut}>
                       <div className='todo-text'>{todo.text}</div>    
                
                    {hoverTodoId===index &&
                    <div className='todo-btns'>
                        <div onClick={()=>deleteTodo(index)}> <FontAwesomeIcon icon={faTrash} className='icons'/></div>
                        <div onClick={()=>editTodo(index)}> <FontAwesomeIcon icon={faFilePen} className='icons' /></div>
                        <div  onClick={()=>completedTodo(index)}><FontAwesomeIcon icon={faCheckToSlot} className='icons' /></div>
                    </div> 
                    }
                    {/* {showButtons &&  */}
                    {/* <div>
                    <button className={showButtons ? 'button' : 'hide'} onClick={()=>deleteTodo(index)}>Delete</button>
                    <button  className={showButtons ? 'button' : 'hide'} onClick={()=>editTodo(index)}>Edit</button>
                    <button  className={showButtons ? 'button' : 'hide'} onClick={()=>completedTodo(index)}>Completed</button>
                    </div>  */}
                        
                    </li>
                    </div>                 
                    </>            
                ))}
            </ul>  
            <div className='btn-container'>
                <button onClick={deleteAll} className='btn2'>Delete All</button>
                <button onClick={clearCompleted} className='btn2'>Clear Completed</button>
            </div>     
            <div className='remain'>
                Remaining todos: {todos.filter((todo) => !todo.completed).length}
            </div>
        </div>
        
    </div>
  )
}

export default AddTodo
