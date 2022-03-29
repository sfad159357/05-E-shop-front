import {useContext} from 'react'
import { CartContext } from '../../App';
import Table from '../common/Table';
import './Cart.css'


function Checkout() {
    
    const columns = [
        { path: "src", label: "圖片", content: (item) => <img className='table-img' src={item.src} alt={item.title} /> },
        {
            path: "title", label: "商品名稱"
        },
        { path: "category.name", label: "種類" },
        { path: "price", label: "價格" },
        { path: "count", label: "數量" }
    ]

    const { cart } = useContext(CartContext)
    const sumUp = (acc, cur) => {
        acc += cur.count * cur.price
        return acc
    }

    return (
      <div className='checkout'>
            <h1>結帳</h1>
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
      </div>
  )
}

export default Checkout