import {useState} from 'react'
import '../../App.css'
import Cards from '../common/Cards'
import Footer from '../Footer'
import HeroSection from '../HeroSection'
import paginate from '../../utils/paginate'
import _ from "lodash";


const dummy_data = [
  { _id: '01', title: '書桌', category: {name:'生活用具'}, src: '/images/img-1.jpg', path: '/service',price:100 },
  { _id: '02', title: 'iphone X', category: {name:'3C電子'}, src: '/images/img-2.jpg', path: '/service',price:2000 },
  { _id: '03', title: '牛仔褲', category: {name:'服裝配件'}, src: '/images/img-3.jpg', path: '/service',price:300 },
  { _id: '04', title: 'rty', category: {name:'3C電子'}, src: '/images/img-4.jpg', path: '/service',price:4000 },
  { _id: '05', title: 'fgh', category: {name:'食物飲品'}, src: '/images/img-5.jpg', path: '/service',price:500 },
  { _id: '06', title: 'yui', category: {name:'服裝配件'}, src: '/images/img-6.jpg', path: '/service',price:5400 },
  { _id: '07', title: 'ghj', category: {name:'食物飲品'}, src: '/images/img-7.jpg', path: '/service',price:700 },
  { _id: '08', title: '桌椅組', category: {name:'生活用具'}, src: '/images/img-8.jpg', path: '/service',price:1100 },
  { _id: '09', title: 'asd', category: {name:'服裝配件'}, src: '/images/img-1.jpg', path: '/service',price:3500 },
  { _id: '10', title: 'iphone 12', category: {name:'3C電子'}, src: '/images/img-2.jpg', path: '/service',price:5000 },
  { _id: '11', title: 'qwe', category: {name:'生活用具'}, src: '/images/img-3.jpg', path: '/service',price:100 },
  { _id: '12', title: 'rty', category: {name:'服裝配件'}, src: '/images/img-4.jpg', path: '/service',price:200 },
  { _id: '13', title: 'fgh', category: {name:'食物飲品'}, src: '/images/img-5.jpg', path: '/service',price:400 },
  { _id: '14', title: 'yui', category: {name:'服裝配件'}, src: '/images/img-6.jpg', path: '/service',price:500 },
  { _id: '15', title: 'ipad 9', category: {name:'3C電子'}, src: '/images/img-7.jpg', path: '/service',price:3300 },
  { _id: '16', title: '堅果', category: {name:'食物飲品'}, src: '/images/img-8.jpg', path: '/service',price:500 },
]

function Home({ originProducts}) {

  const [pageSize, setPageSize] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (pageNumber) => {
    // console.log(pageNumber);
    setCurrentPage(pageNumber);
  };

  const paginatedData = paginate(originProducts, currentPage, pageSize)
  const itemsCount = originProducts.length

  return (
    <>
      <HeroSection />
      <Cards
        data={paginatedData}
        pageSize={pageSize}
        itemsCount={itemsCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      /> 

      <Footer />
    </>
  )

  
}

export default Home