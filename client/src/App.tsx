import { Routes, Route } from 'react-router-dom';
import {Home} from './components/Main/Home'
import {Me} from './components/Main/Me'
import {Login} from './components/Auth/Login'
import {ForgetPassword} from './components/Auth/ForgetPassword'
import {ChangePassword} from './components/Auth/ChangePassword'
import {Reset} from './components/Auth/Reset'
import {SinglePost} from './components/Post/SinglePost';
import {EditPost} from './components/Post/EditPost';
import { Create } from './components/Auth/Create';
import {CreateNewPost} from './components/Post/CreateNewPost'
import { ContainerCard } from './components/Utilities/ContainerCard';
import './index.css';
import './root.css';
function App() {
  const a = import.meta.env.VITE_API_URL;
  console.log(a)
  return (
    <ContainerCard>
      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path={'/login'} element={<Login/>}></Route>
        <Route path={'/forgetPassword'} element={<ForgetPassword/>}></Route>
        <Route path={'/resetPassword/:id'} element={<Reset/>}></Route>
        <Route path={'/changePassword'} element={<ChangePassword/>}></Route>
        <Route path={'/createUser'} element={<Create/>}></Route>
        <Route path={'/me'} element={<Me/>}></Route>
        <Route path={'/CreateNewPost'} element={<CreateNewPost/>}></Route>
        <Route path={'/editPost/:id'} element={<EditPost/>}></Route>
        <Route path={'/:id'} element={<SinglePost/>}></Route>
      </Routes>
    </ContainerCard>
  )
}

export default App
