import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignUpPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

function SignUpPage() {
  const[error,setError] = useState("")
  const[formData,setFormData] = useState({userId:"",password:"",confirmPassword:""})
  const navigate = useNavigate()

  const handleChange = (e) =>{
    const{name,value} = e.target
    setFormData({...formData,[name]:value})
  }

  const validatePassword = (password) =>{
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
    return regex.test(password);
  }

  const handleSignUp = () =>{
    const{userId,password,confirmPassword} = formData

    const users = JSON.parse(localStorage.getItem("users"))||{}

    if(!userId || !password || !confirmPassword){
      setError("Please enter all the fields")
      return
    }
    if(users[userId]){
      setError("Account alredy exists")
      return
    }
    if (!validatePassword(password)){
      setError(`Password must be 8-16 character long.\n Must contain atleast one capital letter,small letter,a digit and one special charater.\n No spaces allowed.`)
      return
    }
    if(password !== confirmPassword){
      setError("Passwords do not match, please check the password")
      return
    }    
      
    // Add new user
    users[userId] = password
    // Save users to localStorage
    localStorage.setItem("users",JSON.stringify(users))

    alert("SignUp successfull! You can now login")
    navigate('/')
  }  

  return (
    <div className='App'>
      <div className='container' autoComplete='off'>
      <div className='heading'>Sign In</div>
        <div className='sub-heading'>Username</div>
        <div>
        <FontAwesomeIcon icon={faUser} />
        <input type="text" name="userId" value={formData.userId} onChange={handleChange} placeholder='User Id'
        className='input'></input>
        </div>
        <div className='sub-heading'>Password</div>
        <div>
        <FontAwesomeIcon icon={faLock} />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password'
        className='input'></input>
        </div>
        <div className='sub-heading'>Confirm Password</div>
        <div>      
        <FontAwesomeIcon icon={faLock} />
        <input type="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} 
        className="input" placeholder='Confirm Password'></input>
        </div> 
        <div>
        <button onClick={handleSignUp} className='btn'>Create Account</button>
        </div>
        <div>
        <p style={{whiteSpace:"pre-line"}}>{error}</p>  
        </div>
  
      </div>         
               
           
    </div>
  )
}

export default SignUpPage
