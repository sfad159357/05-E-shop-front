import { useState, useContext } from 'react'
import { CartContext } from '../../App'
import {Link} from 'react-router-dom'
import Counter from './Counter'

function CardItems({ item }) {
  
  const [num, setNum] = useState(1)

  const { cart } = useContext(CartContext)

  const handleInput = (e) => {
    if (e.target.value < 0) setNum(1)
    else { setNum(e.target.value) }
  }

  const handleMinus = () => {
    if (num === 1) return;
    setNum(num => num - 1)
  }

  const handlePlus= () => {
    setNum(num => num + 1)
  }

   
  const handleCart = () => {
    let repeatedProduct = cart.find(product => product._id === item._id)
    // 假設重複選取同個商品，數量增加就好，若購物車找不到同樣的_id，就為undefined
    if (repeatedProduct) {
      repeatedProduct.count += num
    }
    else {
      cart.push({
        _id: item._id,
        title: item.title,
        src: item.src,
        category: item.category,
        price: item.price,
        count: num
      })
    }
    setNum(1)
  }

 

  
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
                  <div className="cards__item__cart">
                  <button className='cards__item__cart__minus' onClick={handleMinus}>-</button>
                  <input className='cards__item__cart__number' value={num} onChange={handleInput} />
                  <button className='cards__item__cart__plus' onClick={handlePlus}>+</button>
                    <button className='cards__item__cart__addCart' onClick={handleCart}>加入購物車</button>
                  </div>
                </div>
        </li>
    </>
  )
}

export default CardItems;

