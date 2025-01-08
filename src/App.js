import './App.css';
import React from 'react';
import AddTodo from './routes/AddTodo';
import {Routes, Route} from 'react-router-dom';
import LoginPage from './routes/LoginPage';
import SignUpPage from './routes/SignUpPage';
import ForgotPassword from './routes/ForgotPassword';

function App() {
  return (
    <div>
    <Routes>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/signuppage" element={<SignUpPage/>}></Route>
          <Route path="/addtodo" element={<AddTodo/>}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
    </Routes> 
    </div>
                     
       
  );
}

export default App;
