import React from 'react'
import {Link} from 'react-router-dom'

function CardItems({item}) {
  return (
    <>
        <li className="cards__item">
            <Link to={item.path} className="cards__item__link">
                <figure className="cards__item__pic-wrap" data-category={item.label}>
                    <img src={item.src} alt={item.text} className="cards__item__img" />
                </figure>
                <div className="cards__item__info">
                      <h5 className="cards__item__text" >{item.text}</h5>
                </div>
            </Link>
        </li>
    </>
  )
}

export default CardItems