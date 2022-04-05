import React, { useState } from "react";
import Table from "./Table";
import paginate from "../../utils/paginate";
import CategoryBar from "./CategoryBar";
import SearchBox from "./SearchBox";
import _ from 'lodash'
import Pagination from "./Pagination"; 

// step1:從func component改變成class component
// step2:將Movie母元件的handleSort移至自己元件本身內，另設方法
function ProductTable({ user, dbProducts, categories,columns  }) {
  // 只有admin才能進行刪除

  const [pageSize, setPageSize] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState({ _id: 0 , name: '全部種類'})
  const [searchQuery, setSearchQuery] = useState('')
  const [sortedColumn, setSortedColumn] = useState( {path: "title", order: "asc" })


    // if (user && user.isAdmin) this.columns.push(this.deleteColumn());

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // searchQuery: "", // 當使用者選擇genre種類，清空搜尋字串
    setCurrentPage(1);  // 這裡要重設為第1頁，是因為在第2頁是因為movies超過pageSize=4，所以從startIndex=4開始切割
    // ->不過，我們丟到paginate(filtered)，經過filtered的movies只有3個，所以因為state中currentPage還在2，一樣會幫你從index=4的元素開始切割
  };

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
    setCurrentPage(1)
  }

   const handleSort = (sortedColumn) => {
    setSortedColumn(sortedColumn); // ascending升序
  };
  

  const itemsCount = dbProducts.length

  
  let categorySortedData = dbProducts;

  if (categories && selectedCategory.name !== '全部種類') {
     categorySortedData = dbProducts.filter( data => data.category.name === selectedCategory.name)  
  } 
  

  let sortedData= categorySortedData
  
  // 在priceOrder被選擇後，才會開始篩選
  sortedData = _.orderBy(
    categorySortedData,
    [sortedColumn.path],
    [sortedColumn.order]
  )
  
  const searchedData = sortedData.filter(data => data.title.toLowerCase().includes(searchQuery.toLowerCase()))
  
  const paginatedData = paginate(searchedData, currentPage, pageSize)



    return (
      <div className="table-container">
      <CategoryBar
        items={categories}
        onItemSelect={handleCategorySelect}
        selectedItem={selectedCategory}
      />
      <SearchBox
        value={searchQuery}
        placeholder='搜尋想要的商品...'
        onChange={handleSearchQuery} />
    
        <Table
          items={paginatedData}
          columns={columns}
          sortedColumn={sortedColumn}
          onSort={handleSort}       
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
