import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

function ForgotPassword() {
  const[error,setError] = useState("")
  const[formData,setFormData] = useState({userId:"",password:"",confirmPassword:""})
  const navigate = useNavigate()

  const handleChange = (e) =>{
    const{name,value} = e.target
    setFormData({...formData,[name]:value})
  }

  const updatePassword = () =>{
    const{userId,password,confirmPassword} = formData
    const users = JSON.parse(localStorage.getItem("users"))||{}

    if(!userId || !password || !confirmPassword){
        setError("Please enter all the fields")
        return
      }

    if(password !== confirmPassword){
        setError("Passwords do not match, please check the password")
        return
      }

    users[userId] = password
    localStorage.setItem("users",JSON.stringify(users)) 
    alert("Password updated!")
    navigate('/')
               
  }

  return (
    <div className='App'>
      <div className='container'>
        <div className='heading'>Reset password</div>
        <div className='sub-heading'style={{textAlign:"left",paddingLeft:"35px"}} >Username</div>
        <div>   
        <FontAwesomeIcon icon={faUser} />     
        <input type="text" name="userId" value={formData.userId} onChange={handleChange} placeholder='User Id'
        className='input'></input>
        </div>
        <div className='sub-heading' style={{textAlign:"left",paddingLeft:"35px"}}>Password</div>
        <div>
        <FontAwesomeIcon icon={faLock} />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password'
        className='input'></input>
        </div>
        <div className='sub-heading' style={{textAlign:"left",paddingLeft:"35px"}}>Confirm Password</div>
        <div>
        <FontAwesomeIcon icon={faLock} />
        <input type="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
        className='input' placeholder='Confirm Password'></input>
        </div> 
        <div>
        <button className='btn' onClick={updatePassword}>Update password</button>
        </div>       
        <p>{error}</p>
      </div>
       
    </div>
  )
}

export default ForgotPassword
