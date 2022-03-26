import {useState, useEffect,useContext} from 'react'
import '../../App.css'
import Cards from '../common/Cards'
import Footer from '../Footer'
// import HeroSection from '../HeroSection'
import paginate from '../../utils/paginate'
import CategoryBar from '../common/CategoryBar'
import _ from "lodash";
import SortedBar from '../common/SortedBar'
import SearchBox from '../common/SearchBox'
import { getProducts } from '../service/productsService'
import { getCategories } from '../service/categoryService'

function Products({ onSaleProducts,categories}) {
  

  const [pageSize, setPageSize] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState({_id: 0 , name: '全部種類' })
  const [priceOrder, setPriceOrder] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategorySelect = (category) => {
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
  
  // 計算產品的長度
  const itemsCount = onSaleProducts.length

  let categorySortedData = onSaleProducts;
  if (categories && selectedCategory.name !== '全部種類') {
     categorySortedData = onSaleProducts.filter( data => data.category.name === selectedCategory.name)  
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




  return (
    <>
      <h1 className='products-title'>所有商品</h1>
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
    
      {/* 如果沒有合乎篩選的data就叫出「抱歉...」 */}
      {paginatedData.length === 0
        ? <h3 className='not-searched'>抱歉，搜尋不到你想要的商品</h3>
        : <Cards
            data={paginatedData}
            pageSize={pageSize}
            itemsCount={itemsCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onCategoryChange={handleCategorySelect}
          />
      }
      <Footer />
    </>
  )

  
}

export default Products