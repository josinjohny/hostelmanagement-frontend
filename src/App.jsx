
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import AdminPage from './pages/AdminPage'
import PageNotFound from './pages/PageNotFound'
import Hostel from './pages/Hostel'
import PaymentPage from './pages/Payment'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import UserData from './pages/UserData'
import MyBookings from './pages/MyBookings'
import Messages from './pages/Messages'


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register={true}/>}/>
      <Route path='/adminpage' element={<AdminPage />}/>
      <Route path='*' element={<PageNotFound/>}/>
      <Route path='/hostels' element={<Hostel/>}/>
      <Route path='/payment' element={<PaymentPage/>}/>
      <Route path='/adminlogin' element={<AdminLogin/>}/>
      <Route path='/contactus' element={<Dashboard/>}/>
      <Route path='/userdata' element={<UserData/>}/>
      <Route path="/my-bookings" element={<MyBookings />} /> {/* ✅ Add Route */}
      <Route path='/messages' element={<Messages/>}/>









    </Routes>
    
    </>
  )
}

export default App
