import logo from './logo.svg';
import Body from './Components/Auth/Js/Body.js';
import SignUp from './Components/Auth/Js/SignUp.js';
import FindPass from './Components/Auth/Js/FindPass.js';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Main from './Components/Main/Js/Main.js';
import Profile from './Components/Main/Js/Profile.js';

function App() {
  return (
    <>
    <Routes>
      <Route path='/Instagram/' element={<Body/>}/>
      <Route path='/main/' element={<Main/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/find' element={<FindPass/>}/>
      <Route path='/profile/:curUserEmail' element={<Profile/>}/>
    </Routes>
    </>
  );
}

export default App;
