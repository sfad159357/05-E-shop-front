import { useState,useEffect } from 'react';
import Navbar from './components/Navbar'
import Home from './components/pages/Home'
import Products from './components/pages/Products'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Logout from './components/pages/Logout';
import ProductsForm from './components/pages/ProductsForm';
import auth from './components/service/authService'
import {BrowserRouter , Routes,  Route} from "react-router-dom"
import { getProducts } from './components/service/productsService'
import { getCategories } from './components/service/categoryService'
import { ToastProvider } from 'react-toast-notifications';
import './App.css';



function App() {
  
  const [onSaleProducts, setOnSaleProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [user, setUser] = useState(null)

  const populateProducts = async () => {
    const { data: products } = await getProducts()

    // 篩選掉「未上架」和「庫存為0」的商品
    const productsOnSale =  products.filter(product => (product.onSale === 1) && (product.numberInStock !== 0))
    setOnSaleProducts(productsOnSale)
  }

  const populateCategories = async () => {
    let { data: categoriesArray } = await getCategories()
    categoriesArray = [{_id:0,name:'全部種類'}, ...categoriesArray]
    setCategories(categoriesArray)
  } 


  
  useEffect(() => {
    populateCategories()
    populateProducts()
    const _user = auth.getAuthUser();
    setUser(_user);
  }, [])
  
  console.log('App render')
        console.log('onSaleProducts',onSaleProducts)

  


  return (
    <ToastProvider>
    <BrowserRouter>
      <Navbar user={user}/>
      <Routes>
        <Route path="/" element={<Home onSaleProducts={onSaleProducts} user={user} />} />
        <Route path="/products" element={<Products onSaleProducts={onSaleProducts} categories={ categories}/>} />
        <Route path="/update-products" element={<ProductsForm user={user} categories={ categories}/>} />
        <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/logout" element={<Logout setUser={setUser}/>} />
      </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
// export { MyContext };
export default App;
