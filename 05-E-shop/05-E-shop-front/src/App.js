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
import './App.css';



function App() {
  
  const [onSaleProducts, setOnSaleProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [user, setUser] = useState({})

  const populateProducts = async () => {
    const { data: products } = await getProducts()
    setAllProducts(products);

    // 篩選掉「未上架」和「庫存為0」的商品
    const productsFiltered =  products.filter(product => (product.onSale === true) && (product.numberInStock !== 0))
    setOnSaleProducts(productsFiltered)
  }

  const populateCategories = async () => {
    let { data: categoriesArray } = await getCategories()
    categoriesArray = [{_id:0,name:'全部種類'}, ...categoriesArray]
    setCategories(categoriesArray)
  } 
  
  useEffect(() => {
     const _user = auth.getAuthUser();
    setUser(_user);
    populateCategories()
    populateProducts()

  }, [])


  return (
    <BrowserRouter>
      <Navbar user={user}/>
      <Routes>
        <Route path="/" element={<Home originProducts={onSaleProducts} />} />
        <Route path="/products" element={<Products originProducts={onSaleProducts} categories={ categories}/>} />
        <Route path="/update-products" element={<ProductsForm user={user} originProducts={allProducts}  categories={ categories}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>

    </BrowserRouter>
  );
}
// export { MyContext };
export default App;
