import { Routes, Route } from 'react-router-dom';
import {Home} from './components/Main/Home'
import {Me} from './components/Main/Me'
import {Login} from './components/Auth/Login'
import {ForgetPassword} from './components/Auth/ForgetPassword'
import {ChangePassword} from './components/Auth/ChangePassword'
import {Reset} from './components/Auth/Reset'
import {SinglePost} from './components/Post/SinglePost';
import { Create } from './components/Auth/Create';
import './index.css';
import './root.css';
function App() {

  return (
    <Routes>
      <Route index element={<Home/>}></Route>
      <Route path={'/login'} element={<Login/>}></Route>
      <Route path={'/forgetPassword'} element={<ForgetPassword/>}></Route>
      <Route path={'/changePassword'} element={<ChangePassword/>}></Route>
      <Route path={'/reset'} element={<Reset/>}></Route>
      <Route path={'/createUser'} element={<Create/>}></Route>
      <Route path={'/me'} element={<Me/>}></Route>
      <Route path={'/:id'} element={<SinglePost/>}></Route>
    </Routes>
    
)
}

export default App
