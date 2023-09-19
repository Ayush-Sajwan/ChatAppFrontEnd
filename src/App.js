import React from 'react';
import Chat from './pages/Chat';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SetAvatar from './pages/SetAvatar';

export default function App() {
  return (
    <>
    <BrowserRouter>

      <Routes>

      <Route path='/' element={<Chat/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/setAvatar' element={<SetAvatar/>}></Route>

      </Routes>
    </BrowserRouter>

      
    </>
  )
}

