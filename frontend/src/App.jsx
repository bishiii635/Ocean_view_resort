import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import UserManagement from './pages/UserManagement'
import RoomCategories from './pages/RoomCategories'
import RoomManagement from './pages/RoomManagement'
import ReservationManagement from './pages/ReservationManagement'
import About from './pages/About'
import Contact from './pages/Contact'
import Rooms from './pages/Rooms'
import Help from './pages/Help'
import AdminHelp from './pages/AdminHelp'
import StaffHelp from './pages/StaffHelp'
import StaffDashboard from './pages/StaffDashboard'
import RoomCleaning from './pages/RoomCleaning'
import RoomDetails from './pages/RoomDetails'



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/help" element={<Help />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Protected Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/reservations" element={<ReservationManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/room-categories" element={<RoomCategories />} />
          <Route path="/admin/rooms" element={<RoomManagement />} />
          <Route path="/admin/help" element={<AdminHelp />} />
          
          {/* Staff Routes */}
          <Route path="/staff/help" element={<StaffHelp />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/room-cleaning" element={<RoomCleaning />} />
          <Route path="/staff/guests" element={<UserManagement />} />
          
          {/* Default Catch */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
