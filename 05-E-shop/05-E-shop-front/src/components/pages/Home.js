import {useState,useEffect} from 'react'
import '../../App.css'
import Cards from '../common/Cards'
import Footer from '../Footer'
import HeroSection from '../HeroSection'
import _ from "lodash";
import { useToasts } from "react-toast-notifications";
import { useLocation } from 'react-router-dom';


function Home({ onSaleProducts, user}) {


  const { addToast } = useToasts()
  const location = useLocation()

  useEffect(() => {
    // 透過login中的navigate傳來的state參數，來判斷上一頁是login
    if (user && location.state==='login') {
      addToast(`歡迎${user.name}登入!`,
        {
          appearance: 'success',
          autoDismiss: true
        }
      )
      location.state= '' // 消除state
    }
    else {
      // 透過logout中的navigate傳來的state參數，來判斷上一頁是logout
      if (location.state === 'logout') {
        addToast('你已經登出',
        {
          appearance: 'success',
          autoDismiss: true
          })
        location.state=''
      }
    }
  },[user])

  

  // 在priceOrder被選擇後，才會開始篩選
  let salesSortedData = _.orderBy(
      onSaleProducts,
      ['sales'],
      'desc'
  )

  // 只取前面8份
  salesSortedData = salesSortedData.slice(0, 8)

  return (
    <>
      <HeroSection />
      <Cards
        title='熱銷排行版'
        data={salesSortedData}
        noPaginated={true}
      /> 
    </>
  )
}

export default Home