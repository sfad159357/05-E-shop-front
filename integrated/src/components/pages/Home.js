import {useState} from 'react'
import '../../App.css'
import Cards from '../common/Cards'
import Footer from '../Footer'
import HeroSection from '../HeroSection'
import paginate from '../../utils/paginate'
import _ from "lodash";


const dummy_data = [
  { id: '01', text: 'asd', label: 'A', src: '/images/img-1.jpg', path: '/service' },
  { id: '02', text: 'zxc', label: 'B', src: '/images/img-2.jpg', path: '/service' },
  { id: '03', text: 'qwe', label: 'C', src: '/images/img-3.jpg', path: '/service' },
  { id: '04', text: 'rty', label: 'D', src: '/images/img-4.jpg', path: '/service' },
  { id: '05', text: 'fgh', label: 'E', src: '/images/img-5.jpg', path: '/service' },
  { id: '06', text: 'yui', label: 'F', src: '/images/img-6.jpg', path: '/service' },
  { id: '07', text: 'ghj', label: 'G', src: '/images/img-7.jpg', path: '/service' },
  { id: '08', text: 'nmb', label: 'H', src: '/images/img-8.jpg', path: '/service' },
  { id: '09', text: 'asd', label: 'A', src: '/images/img-1.jpg', path: '/service' },
  { id: '10', text: 'zxc', label: 'B', src: '/images/img-2.jpg', path: '/service' },
  { id: '11', text: 'qwe', label: 'C', src: '/images/img-3.jpg', path: '/service' },
  { id: '12', text: 'rty', label: 'D', src: '/images/img-4.jpg', path: '/service' },
  { id: '13', text: 'fgh', label: 'E', src: '/images/img-5.jpg', path: '/service' },
  { id: '14', text: 'yui', label: 'F', src: '/images/img-6.jpg', path: '/service' },
  { id: '15', text: 'ghj', label: 'G', src: '/images/img-7.jpg', path: '/service' },
  { id: '16', text: 'nmb', label: 'H', src: '/images/img-8.jpg', path: '/service' },

]

function Home() {

  const [pageSize, setPageSize] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (pageNumber) => {
    // console.log(pageNumber);
    setCurrentPage(pageNumber);
  };

  const paginatedData = paginate(dummy_data, currentPage, pageSize)
  const itemsCount = dummy_data.length

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