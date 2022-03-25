import React,{useState,useEffect} from 'react'
import '../../App.css'
import ProductTable from '../common/ProductsTable'
import UpdateProducts from '../common/UpdateProducts'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct} from '../service/productsService'

function ProductsForm({ user, categories }) {
  
  const [dbProducts, setDbProducts] = useState([])
  const [update, setUpdate] = useState(0)
  const [productId, setProductId] = useState('')

  
  const populateProducts = async () => {
    const { data: products } = await getProducts()
    setDbProducts(products);
  }

  const handleUpdate = () => {
    setUpdate(update => update + 1)
  }

  const handleProductId = (id) => {
    setProductId(id)
  }

  const deleteColumn = () =>{
    return {
      key: "delete",
      content: (product) => {
        return (
          <button
            type="submit"
            className="btn btn-danger btn-sm"
            onClick={() => {
              deleteProduct(product._id);
              handleUpdate();
            }}
          >
            刪除
          </button>
        );
      },
    };
  }

  // 一旦狀態更新，就重新去後端撈資料
  useEffect(() => {
    populateProducts()
  }, [update])

  const columns = [
    {
      path: "_id",
      label: 'ID',
      content: (product) => (
        <a
          onClick={() => { handleProductId(product._id) }}
          href='#update-div'
        >
          {product._id}
        </a>
      )
    },
    { path: "src", label: "圖片", content: (product) => <img className='table-img' src={product.src} alt={product.title} /> },
    {
      path: "title", label: "商品名稱"
    },
    { path: "category.name", label: "種類" },
    { path: "price", label: "價格" },
    { path: "sales", label: "銷售量" },
    { path: "numberInStock", label: "庫存", content: (product) => (product.numberInStock ? <span className="on-sale">{product.numberInStock}</span> : <span className="no-stock">0</span>) },
    { path: "onSale", label: "上下架", content: (product) => (product.onSale ? <span className="on-sale">上架中</span> : <span className="not-on-sale">未上架</span>) },
    deleteColumn()
  ];

  return (
    <>
      <h1 id='update-div' className="ProductsForm">產品資訊一覽表</h1>
      <UpdateProducts
        user={user}
        columns={columns}
        categories={categories}
        update={update}
        onUpdate={handleUpdate}
        productId={productId}
        handleProductId={handleProductId}
        dbProducts={dbProducts}
      />
      <ProductTable
        user={user}
        columns={columns}
        dbProducts={dbProducts}
        categories={categories} />
    </>
  )
}

export default ProductsForm