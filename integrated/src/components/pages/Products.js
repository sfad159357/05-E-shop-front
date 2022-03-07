import {useState, useEffect} from 'react'
import '../../App.css'
import Cards from '../common/Cards'
import Footer from '../Footer'
// import HeroSection from '../HeroSection'
import paginate from '../../utils/paginate'
import CategoryBar from '../common/CategoryBar'
import _ from "lodash";
import SortedBar from '../common/SortedBar'


const dummy_data = [
  { id: '01', text: 'asd', category: {name:'生活用具'}, src: '/images/img-1.jpg', path: '/service',price:100 },
  { id: '02', text: 'zxc', category: {name:'3C電子'}, src: '/images/img-2.jpg', path: '/service',price:2000 },
  { id: '03', text: 'qwe', category: {name:'服裝配件'}, src: '/images/img-3.jpg', path: '/service',price:300 },
  { id: '04', text: 'rty', category: {name:'3C電子'}, src: '/images/img-4.jpg', path: '/service',price:4000 },
  { id: '05', text: 'fgh', category: {name:'食物飲品'}, src: '/images/img-5.jpg', path: '/service',price:500 },
  { id: '06', text: 'yui', category: {name:'服裝配件'}, src: '/images/img-6.jpg', path: '/service',price:5400 },
  { id: '07', text: 'ghj', category: {name:'食物飲品'}, src: '/images/img-7.jpg', path: '/service',price:700 },
  { id: '08', text: 'nmb', category: {name:'生活用具'}, src: '/images/img-8.jpg', path: '/service',price:1100 },
  { id: '09', text: 'asd', category: {name:'服裝配件'}, src: '/images/img-1.jpg', path: '/service',price:3500 },
  { id: '10', text: 'zxc', category: {name:'3C電子'}, src: '/images/img-2.jpg', path: '/service',price:5000 },
  { id: '11', text: 'qwe', category: {name:'生活用具'}, src: '/images/img-3.jpg', path: '/service',price:100 },
  { id: '12', text: 'rty', category: {name:'服裝配件'}, src: '/images/img-4.jpg', path: '/service',price:200 },
  { id: '13', text: 'fgh', category: {name:'食物飲品'}, src: '/images/img-5.jpg', path: '/service',price:400 },
  { id: '14', text: 'yui', category: {name:'服裝配件'}, src: '/images/img-6.jpg', path: '/service',price:500 },
  { id: '15', text: 'ghj', category: {name:'3C電子'}, src: '/images/img-7.jpg', path: '/service',price:3300 },
  { id: '16', text: 'nmb', category: {name:'食物飲品'}, src: '/images/img-8.jpg', path: '/service',price:500 },
]

  const categoryData = [{name:'全部',_id:0},{name:'3C電子', _id:1}, {name:'服裝配件', _id:2}, {name:'食物飲品', _id:3},{name:'生活用具', _id:4}]

function Products() {
  
  const [pageSize, setPageSize] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState({ name: '全部', _id: 0 })
  const [priceOrder, setPriceOrder] = useState('')
  

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
  
 

const itemsCount = dummy_data.length

  
  let categorySortedData = dummy_data;

  if (selectedCategory.name !== '全部') {
     categorySortedData = dummy_data.filter( data => data.category.name === selectedCategory.name)  
  } 
  
console.log('priceOrder', priceOrder)

let priceSortedData = categorySortedData
  
  // 在priceOrder被選擇後，才會開始篩選
if (priceOrder) {
  priceSortedData = _.orderBy(
    categorySortedData,
    ['price'],
    priceOrder
  )
}
  
  const paginatedData = paginate(priceSortedData, currentPage, pageSize)

  
  
  return (
    <>
      <h1>Products</h1>
      <CategoryBar
        items={categoryData}
        onItemSelect={handleCategorySelect}
        selectedItem={selectedCategory}
      />
      <SortedBar
        orderState={priceOrder}
        onPriceOrder={handlePriceOrder}
      />
      <Cards
        data={paginatedData}
        pageSize={pageSize}
        itemsCount={itemsCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onCategoryChange={handleCategorySelect}
      /> 

      <Footer />
    </>
  )

  
}

export default Products