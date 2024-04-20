import logo from './logo.svg';
import Body from './Components/Auth/Body.js';
import SignUp from './Components/Auth/SignUp.js';
import FindPass from './Components/Auth/FindPass.js';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Main from './Components/Main/Main.js';

function App() {
  return (
    <>
    <Routes>
      <Route path='/Instagram-Clone-Coding/' element={<Body/>/*<Main/>*/}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/find' element={<FindPass/>}/>
      <Route path='/main' element={<Main/>}/>
    </Routes>
    {/* <FindPass/> */}
    </>
  );
}

export default App;
