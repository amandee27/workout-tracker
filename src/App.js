import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import CreateAccount from "./Pages/CreateAccount/CreateAccount";
import PrivateRoutes from "./Shared/PrivateRoutes";
import ForgotPassword from "./Pages/ForgotPassword /ForgotPassword";
import PublicRoutes from "./Shared/PublicRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
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
