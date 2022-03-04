import React from 'react'
import CardItems from './CardItems'
import './Cards.css'
import Pagination from './Pagination'


function Cards(props) {
  return (
    <div className="cards">
          <h1>探索神秘的旅程</h1>
          <div className="cards__container">
              <div className="cards__wrapper">
                  {/* <img src='images/img-3.jpg' alt='123'/> */}
                  <ul className="cards__items">
                      {props.data.map(item => <CardItems
                          key={item.id}
                          item={item}
                          
                      />)}
                    </ul>
                  </div>
          </div>
    <Pagination
        // 在Pagination元件所產生的event伴隨著參數，要返回來做handle event和參數處理
        onPageChange={props.onPageChange}
        itemsCount={props.itemsCount} // 所有電影中的總數
        pageSize={props.pageSize}
        currentPage={props.currentPage} // 當前頁面
        />

    </div>
  )
}

export default Cards