import React,{createContext} from "react";
import ReactDOM from "react-dom";

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route , Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import Home from './pages';
import SigninPage from './pages/signin';
import SignupPage from './pages/signup';
import NotFound from './components/NotFound';


// ReactDOM.render(
//   <BrowserRouter>
   
//       <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
//       <Route path='/' component={Home} exact />
//       <Route path='/home' component={Home} exact />
//       <Route path='/signin' component={SigninPage} exact />
//       <Route path='/signup' component={SignupPage} exact />
//       <Route component={NotFound} />
//       < Navigate to="/home" />
   
//   </BrowserRouter>,
//   document.getElementById("root")
// );


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Admin route with layout */}
        <Route path="/admin/*" element={<AdminLayout />} />
        
        {/* Public routes */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Redirects and 404 */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);