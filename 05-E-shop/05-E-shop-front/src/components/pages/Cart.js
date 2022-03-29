import {useState,useEffect,useContext} from 'react'
import Table from '../common/Table'
import { CartContext } from '../../App';
import './Cart.css'
import Counter from '../common/Counter';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

function Cart() {

    const { cart, setCart } = useContext(CartContext)

    const {addToast} = useToasts()

   
    const sumUp = (acc, cur) => {
        acc += cur.count * cur.price
        return acc
    }

    const deleteColumn = () =>{
    return {
      key: "delete",
      content: (item) => {
        return (
          <button
            type="submit"
            className="btn btn-danger btn-sm"
            onClick={ () => {
                const newCart = cart.filter(e => e._id !== item._id)
                console.log()
                setCart([...newCart])
                addToast(`已成功將「${item.title}」從購物車中移除`,
                {
                  appearance: "error",
                }
              )
            }}
          >
            刪除
          </button>
        );
      },
    };
  }

    

     const columns = [
    { path: "src", label: "圖片", content: (item) => <img className='table-img' src={item.src} alt={item.title} /> },
    {
      path: "title", label: "商品名稱"
    },
    { path: "category.name", label: "種類" },
    { path: "price", label: "價格" },
    {path: "count", label: "數量", content:
        (item) => <Counter item={item} />
         },
    deleteColumn()

    ]


    return (
    <div className='cart'>
        <h1>購物車</h1>
            {cart.length
            ? (<div className='cart-table-container'>
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
                <Link to='/checkout' className='link-checkout'>
                    <button className='btn btn-primary'>結帳</button>
                </Link>
                </div>)
             : (<div className='no-item'>
                <p>購物車尚未有任何商品，</p>
                    <Link to='/products'>點我進來</Link>
                <p>挑選喜歡的商品</p>
                </div>)
            }
    </div>
  )
}

export default Cart