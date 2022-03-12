import { useState,useEffect } from 'react';
import logo from './logo.svg';
import Navbar from './components/Navbar'
import Home from './components/pages/Home'
import Services from './components/pages/ProductsForm'
import Products from './components/pages/Products'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Logout from './components/pages/Logout';
import ProductsForm from './components/pages/ProductsForm';
import auth from './components/service/authService'
import {BrowserRouter , Routes,  Route} from "react-router-dom"
import './App.css';



function App() {
  
  const [user, setUser] = useState({})
  
  useEffect(() => {
    const _user = auth.getAuthUser();
    setUser(_user);

  },[])

  return (
    <BrowserRouter>
      <Navbar user={user}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update-products" element={<ProductsForm />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
