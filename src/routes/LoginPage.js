import React, { useEffect, useRef, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import './LoginPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

function LoginPage() {
  const[error,setError] = useState('')
  const[formData,setFormData] = useState({userId:'',password:''})

  const navigate = useNavigate()
  const focusRef = useRef()
  const users = JSON.parse(localStorage.getItem("users"))||{}

  // localStorage.getItem("users"): Retrives the value associated with the key "users" from the browser's local storage and returns null if key does not exists.
  // Json.parse: converts the value retrived from browser's localStorage to object or array which is usually stored as a JSON string.
  // || {}: If JSON.parse() gives the false value it falls back to an empty object.

  const handleChange = (e) =>{
    const{name,value} = e.target
    setFormData({...formData,[name]:value})   
  }

  const loginToTodo = () =>{
    navigate('/addtodo')
  }

  const handleLogin = () =>{
    const{userId,password} = formData
    
    if(!userId || !password){
      setError("Please enter all the fields")
    }
    else if(users[userId]!== password){
      setError("Invalid user Id or password")
    }
    else if(users[userId] && users[userId]===password){
      loginToTodo()
      alert("Login successful")
      setFormData({userID:'',password:''})
    }
    else{
      setError("You dont have accout, please sign up") 
    }    
  }

  useEffect(()=>{
    focusRef.current.focus()
    },[])

  return (
    <div className='App'>
      <div className='container' autoComplete='off'>
        <div className='heading'>User Login</div>
        <div>
          <FontAwesomeIcon icon={faUser} />
          <input type='text'value={formData.userId} onChange={handleChange} 
          ref={focusRef} name="userId" placeholder='Username' className='input'></input>
        </div>
        
        <div>
          <FontAwesomeIcon icon={faLock} />
          <input type='password'value={formData.password} onChange={handleChange} name="password" placeholder='Password'
          className='input'></input>  
        </div>        
        <div>  <button onClick={handleLogin} className='btn'>Login</button>  </div>     

        <div>        
          <div>Don't have an account, Sign Up now</div>
          <button onClick={()=>navigate('/signuppage')} className='btn'>Sign Up</button>
        </div>  
        <div>
          <span>Forgot password? </span>
          <span onClick={()=>navigate('/forgotpassword')} style={{cursor:"pointer",color:"blue"}}>Click here</span>
        </div>
        <p> {error} </p> 
        </div>
    </div>
  )
}

export default LoginPage
