import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProvider from "./context/usercontext";
import Landingpage from "./pages/landingpage/landingpage";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import MainLayout from "./layouts/mainlayout";
import Dashboard from "./pages/home/dashboard";
import ResourceHub from "./pages/home/Resourcehub";
import Peerform from "./pages/home/peerform";
import Appointmentbook from "./pages/home/counsellingbook";
import MoodTrackerPage from "./pages/home/moodtracker";
import { Toaster } from "sonner";


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes (no navbar/sidebar) */}
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />

          {/* Protected routes (with MainLayout) */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resourcehub" element={<ResourceHub />} />
            <Route path="/community" element={<Peerform />} />
            <Route path="/counselingsessions" element={<Appointmentbook />} />
            <Route path="/moodtracker" element={<MoodTrackerPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* Global toaster */}
      <Toaster
        toastOptions={{
          className: "",
          style: { fontSize: "13px" },
        }}
      />
    </UserProvider>
  );
}

export default App;
