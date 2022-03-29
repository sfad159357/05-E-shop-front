import { useState, useContext,useEffect } from 'react'
import { CartContext } from '../../App'

export default function Counter({item }) {

  
  const [num, setNum] = useState(item.count)
  const { cart, setCart } = useContext(CartContext)
  
  
  
  // 這裡之所以要用useEffect依賴num，如果更新state回到App，渲染子元件，又會再次觸發setCart，導致無限輪迴
  useEffect(() => {
    item.count = num
    // 如果沒有淺複製array，react無法辨別巢狀物件內值的改變
    // 因為物件所參照的位置一樣，導致更新狀態時，前面的cart state也連同一起被修改，故無法區分出來
    setCart([...cart])
  },[num])


  const handleInput = (e) => {
    if (e.target.value < 0) setNum(1)
    else { setNum(parseInt(e.target.value)) }
    
  }

  const handleMinus = () => {
    if (num === 1) return;
    setNum(num => num - 1)
    
  }

  const handlePlus = () => {
    setNum(num => num + 1)
    
  }


  return (
      <>
        <button className='cards__item__cart__minus' onClick={handleMinus}>-</button>
        <input className='cards__item__cart__number' type='number' value={num} onChange={handleInput} />
        <button className='cards__item__cart__plus' onClick={handlePlus}>+</button>
    </>
  )
}
