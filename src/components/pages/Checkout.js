import {useContext} from 'react'
import { CartContext } from '../../App';
import Table from '../common/Table';
import './Cart.css'


function Checkout() {

    const { cart } = useContext(CartContext)

    const pay = () => {
        fetch(`${process.env.REACT_APP_API_URL}/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: cart.map(item => ({
                    id: item._id,
                    name: item.title,
                    price: item.price,
                    quantity: item.count,
                }))
            })
        }).then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }).then(({ url }) => {
            window.location = url
        }).catch(e => {
            console.error(e)
        })
    }  
    
    
    const columns = [
        { path: "src", label: "圖片", content: (item) => <img className='table-img' src={item.src} alt={item.title} /> },
        {
            path: "title", label: "商品名稱"
        },
        { path: "category.name", label: "種類" },
        { path: "price", label: "價格" },
        { path: "count", label: "數量" }
    ]

    const sumUp = (acc, cur) => {
        acc += cur.count * cur.price
        return acc
    }

    return (
      <div className='checkout'>
        <h1>結帳</h1>
        <div className='table-container'>
            <Table
                items={cart}
                columns={columns}
            />
            <hr className='cart-hr' />
            <div className='cart-sum'>
                <span className='cart-sum-title'>合計：</span>
                <span className='cart-sum-number'>{cart?.reduce(sumUp, 0)} </span>
                <span>元</span>
            </div>
            <button className='btn btn-primary pay btn-next' onClick={pay}>付款</button>
        </div>
      </div>
  )
}



export default Checkout