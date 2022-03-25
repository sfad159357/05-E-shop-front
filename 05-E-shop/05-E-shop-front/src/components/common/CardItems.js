import React from 'react'
import {Link} from 'react-router-dom'

function CardItems({item}) {
  return (
    <>
        <li className="cards__item">
            {/* <Link to={item.path} className="cards__item__link"> */}
          <figure className="cards__item__pic-wrap" data-category={item.category.name}>
              <img src={item.src} alt={item.text} className="cards__item__img" />
          </figure>
           {/* </Link> */}
                <div className="cards__item__info">
                 <h5 className="cards__item__text" >{item.title}</h5>
                  <div className="cards__item__inline">
                    <div className="cards__item__price" >${item.price}</div>
                    <div className="cards__item__sales" >銷售量:<span className="cards__item__sales_num">{item.sales}</span></div>
                  </div>
                </div>
        </li>
    </>
  )
}

export default CardItems