import { Routes, Route } from 'react-router-dom';
import {Home} from './components/Home/Home'
import './index.css';
import './root.css';
function App() {

  return (
    <Routes>
      <Route index element={<Home/>}></Route>
      {/* <Route path={'/login'} element={<Login/>}></Route> */}
    </Routes>
    
)
}

export default App
