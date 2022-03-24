import React,{useState,useEffect} from 'react'
import '../../App.css'
import ProductTable from '../common/ProductsTable'
import UpdateProducts from '../common/UpdateProducts'
import { Link } from 'react-router-dom'
import { getProducts } from '../service/productsService'

function ProductsForm({ user, categories }) {
  
  const [dbProducts, setDbProducts] = useState([])
  const [update , setUpdate] = useState(0)
  
  const populateProducts = async () => {
    const { data: products } = await getProducts()
    setDbProducts(products);
  }

  const handleUpdate = () => {
    setUpdate(update => update + 1)
  }

  useEffect(() => {
    populateProducts()
  }, [update])

  const columns = [
    {
      path: "title",
      label: "商品名稱",
      content: (product) => (
        <Link
          to={`/products/${product._id}`} // 作者要的
        >
          {product.title}
        </Link>
      ),
    },
    { path: "src", label: "圖片", content: (product) => <img className='table-img' src={product.src} alt={product.title} /> },
    { path: "category.name", label: "種類" },
    { path: "price", label: "價格" },
    { path: "sales", label: "銷售量" },
    { path: "numberInStock", label: "庫存" ,content: (product) => (product.numberInStock ? <span className="on-sale">{product.numberInStock}</span> : <span className="no-stock">0</span>)},
    { path: "onSale", label: "上下架", content: (product) => (product.onSale ? <span className="on-sale">上架中</span> : <span className="not-on-sale">未上架</span>)},
    // {
    //   key: "like",
    //   content: (product) => ( // 屬性content函式化，參數Product，回傳react element<Like>
    //     <Like isLiked={product.isLiked} onLike={() => this.props.onLike(product)} />
    //   ),
    // }, // const x = <h1></h1>，x就是原javascript物件，可用來當作參數傳遞
  ];

  return (
    <>
      <h1 className="ProductsForm">ProductsForm</h1>
      <UpdateProducts
        user={user}
        columns={columns}
        categories={categories}
        update={update}
        onUpdate={handleUpdate} />
      <ProductTable
        user={user}
        columns={columns}
        dbProducts={dbProducts}
        categories={categories} />
    </>
  )
}

export default ProductsForm