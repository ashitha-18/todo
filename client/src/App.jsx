import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Signup from './components/signup'
import Login from './components/login'
import Tasks from './components/tasks'

function App() {

  return (
    <BrowserRouter>
    <Routes>

      <Route path='/' element = {<Signup/>}></Route>
      <Route path='/login' element = {<Login/>}></Route>
      <Route path='/tasks' element = {<Tasks/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
