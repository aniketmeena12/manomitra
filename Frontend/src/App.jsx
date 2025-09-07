import { BrowserRouter as Router,Routes,Route, BrowserRouter } from 'react-router-dom';
import{Toaster} from "react-hot-toast";
import Landingpage from './pages/landingpage';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import Dashboard from './pages/home/dashboard';
import UserProvider from './context/usercontext';
import ResourceHub from './pages/home/Resourcehub';
import Peerform from './pages/home/peerform';
import Appointmentbook from './pages/home/counsellingbook';
import MoodTracker from './pages/home/moodtracker';
import Navbar from './layouts/navbar';

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  
  return (
    <UserProvider>
    <div >
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage/>}/>
        <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<SignUp/>}/>
        <Route
        path='*'
        element={
          <MainLayout>
            <Routes>
              <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/resourcehub' element={<ResourceHub/>}/>
          <Route path='/Community' element={<Peerform/>}/>
          <Route path='/Counselingsessons' element={<Appointmentbook/>}/>
          <Route path='/moodtracker' element={<MoodTracker/>}/>
              </Routes>
              </MainLayout>
        }/>
      </Routes>
    </BrowserRouter>
    <Toaster
    toastOptions={{
      className:"",
      style:{
        fontSize:"13px",
      },
    }}
    />
    </div>
    </UserProvider>
  )
}

export default App
