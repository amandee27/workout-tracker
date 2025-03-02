import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login/Login';
import CreateAccount from './Pages/CreateAccount/CreateAccount';
import PrivateRoutes from './Shared/PrivateRoutes';
import ForgotPassword from './Pages/ForgotPassword /ForgotPassword';
import PublicRoutes from './Shared/PublicRoutes';
import Calendar from './Pages/Calendar/Calendar';
import UserDetails from './Pages/UserDetails/UserDetails';
import Logs from './Pages/Logs/Logs';
import Exercises from './Exercises/Exercises';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />}>
            <Route path="calendar" element={<Calendar />} />
            <Route path="user-detail" element={<UserDetails />} />
            <Route path="logs" element={<Logs />} />
            <Route path="exercises" element={<Exercises />} />
          </Route>
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/create-account" element={<CreateAccount />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
