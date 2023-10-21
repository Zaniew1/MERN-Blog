import { Routes, Route } from 'react-router-dom';
import {Home} from './components/Main/Home'
import {Login} from './components/Auth/Login'
import {Forget} from './components/Auth/Forget'
import {Reset} from './components/Auth/Reset'
import { CreateNewPost } from './components/Post/CreateNewPost';
import './index.css';
import './root.css';
function App() {

  return (
    <Routes>
      <Route index element={<Home/>}></Route>
      <Route path={'/login'} element={<Login/>}></Route>
      <Route path={'/forget'} element={<Forget/>}></Route>
      <Route path={'/reset'} element={<Reset/>}></Route>
      <Route path={'/create'} element={<CreateNewPost/>}></Route>
    </Routes>
    
)
}

export default App
