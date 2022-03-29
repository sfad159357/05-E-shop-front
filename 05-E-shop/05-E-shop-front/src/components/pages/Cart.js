import {useState,useEffect,useContext} from 'react'
import Table from '../common/Table'
import { CartContext } from '../../App';
import './Cart.css'
import Counter from '../common/Counter';

function Cart() {

    const { cart } = useContext(CartContext)

   
    const sumUp = (acc, cur) => {
        acc += cur.count * cur.price
        return acc
    }
    
     const columns = [
    { path: "src", label: "圖片", content: (product) => <img className='table-img' src={product.src} alt={product.title} /> },
    {
      path: "title", label: "商品名稱"
    },
    { path: "category.name", label: "種類" },
    { path: "price", label: "價格" },
    {path: "count", label: "數量", content:
        (item) => <Counter item={item} />
    }
    ]


    return (
    <>
        <h1>購物車</h1>
        <div className='cart-table-container'>
            <Table
                isSimpleHeader={true}
                items={cart}
                columns={columns}
            />
            <hr className='cart-hr' />
            <div className='cart-sum'>
                <span className='cart-sum-title'>合計：</span>
                <span className='cart-sum-number'>{cart?.reduce(sumUp, 0)} </span>
                <span>元</span>
            </div>
        </div>
    </>
  )
}

export default Cart