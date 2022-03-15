import React, { useState } from "react";
import Table from "./Table";
import Like from "./Like";
import { Link } from "react-router-dom";
import auth from "../service/authService";
import paginate from "../../utils/paginate";
import CategoryBar from "./CategoryBar";
import SearchBox from "./SearchBox";
import SortedBar from "./SortedBar";
import _ from 'lodash'
import Pagination from "./Pagination"; 
import './ProductsTable.css'

// step1:從func component改變成class component
// step2:將Movie母元件的handleSort移至自己元件本身內，另設方法
function ProductTable({ onSort,user, originProducts, categories }) {
  // 只有admin才能進行刪除

  const [pageSize, setPageSize] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState({ name: '全部', _id: 0 })
  const [priceOrder, setPriceOrder] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  

    if (user && user.isAdmin) this.columns.push(this.deleteColumn());
  

  const sortedColumn = { path: "title", order: "asc" }

  
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
    {
      key: "like",
      content: (product) => ( // 屬性content函式化，參數Product，回傳react element<Like>
        <Like isLiked={product.isLiked} onLike={() => this.props.onLike(product)} />
      ),
    }, // const x = <h1></h1>，x就是原javascript物件，可用來當作參數傳遞
  ];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategorySelect = (category) => {
    console.log('handleCategorySelect',category)
    setSelectedCategory(category);
    // searchQuery: "", // 當使用者選擇genre種類，清空搜尋字串
    setCurrentPage(1);  // 這裡要重設為第1頁，是因為在第2頁是因為movies超過pageSize=4，所以從startIndex=4開始切割
    // ->不過，我們丟到paginate(filtered)，經過filtered的movies只有3個，所以因為state中currentPage還在2，一樣會幫你從index=4的元素開始切割
  };

  const handlePriceOrder = (order) => {
    setPriceOrder(order);
    setCurrentPage(1)
  }

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
    setCurrentPage(1)

  }
  
  console.log('originProducts', originProducts)

  const itemsCount = originProducts.length

  
  let categorySortedData = originProducts;

  if (categories && selectedCategory.name !== '全部') {
     categorySortedData = originProducts.filter( data => data.category.name === selectedCategory.name)  
  } 
  

  let priceSortedData = categorySortedData
  
  // 在priceOrder被選擇後，才會開始篩選
if (priceOrder) {
  priceSortedData = _.orderBy(
    categorySortedData,
    ['price'],
    priceOrder
  )
}
  
  const searchedData = priceSortedData.filter(data => data.title.toLowerCase().includes(searchQuery.toLowerCase()))
  
  const paginatedData = paginate(searchedData, currentPage, pageSize)


  const deleteColumn = () =>{
    return {
      key: "delete",
      content: (product) => {
        return (
          <button
            type="submit"
            className="btn btn-danger btn-sm"
            onClick={() => this.props.onDelete(product._id)}
          >
            Delete
          </button>
        );
      },
    };
  }


    return (
      <div className="table-container">
      <CategoryBar
        items={categories}
        onItemSelect={handleCategorySelect}
        selectedItem={selectedCategory}
      />
      <SortedBar
        orderState={priceOrder}
        onPriceOrder={handlePriceOrder}
      />
      <SearchBox
        value={searchQuery}
        placeholder='搜尋想要的商品...'
        onChange={handleSearchQuery} />
    
        <Table
          items={paginatedData}
          columns={columns}
          sortedColumn={sortedColumn}
          onSort={onSort}
          
        />
        <Pagination
        // 在Pagination元件所產生的event伴隨著參數，要返回來做handle event和參數處理
        onPageChange={handlePageChange}
        itemsCount={itemsCount} // 所有電影中的總數
        pageSize={pageSize}
        currentPage={currentPage} // 當前頁面
        />
      </div>
    );
}


export default ProductTable;
