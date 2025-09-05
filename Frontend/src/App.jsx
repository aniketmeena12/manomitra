import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import{Toaster} from "react-hot-toast";
import Landingpage from './pages/landingpage';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import Dashboard from './pages/home/dashboard';

function App() {
  
  return (
    <div >
    <Router>
      <Routes>
        <Route path='/' element={<Landingpage/>}/>
         <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<SignUp/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App
