import logo from './logo.svg';
import Body from './Components/Auth/Body.js';
import SignUp from './Components/Auth/SignUp.js';
import FindPass from './Components/Auth/FindPass.js';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Main from './Components/Main/Main.js';
import Modal from './Components/Modal/Modal.js';

function App() {
  return (
    <>
    <Routes>
      {/* <Route path='/Instagram/' element={<Body/>}/> */}
      <Route path='/Instagram/' element={<Main/>}/>
      {/* <Route path='/Instagram/' element={<Modal/>}/> */}
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/find' element={<FindPass/>}/>
      <Route path='/main' element={<Main/>}/>
    </Routes>
    {/* <FindPass/> */}
    </>
  );
}

export default App;
