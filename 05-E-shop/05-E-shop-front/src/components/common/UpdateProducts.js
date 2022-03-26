import {  useEffect, useState} from 'react'
import './UpdateProducts.css'
// import {useNavigate } from 'react-router-dom';
import { TableHeader } from './TableHeader';
import { saveProduct } from '../service/productsService'
import { useToasts } from "react-toast-notifications";

function UpdateProducts({
  columns,
  categories,
  onUpdate,
  productId,
  handleProductId,
  dbProducts })

{
  const [inputValue, setInputValue] = useState({
      _id:'',
      title: '',
      src:'',
      categoryId: '',
      numberInStock: '',  
      sales: 0,
      price: '',
      onSale: 1
  })

  // 點選table商品名，其input值更改為被點商品各屬性值
  useEffect(() => {
    if (productId) {
      let productClicked = dbProducts.find(product => product._id === productId)
      setInputValue({
        _id:productClicked._id,
        title: productClicked.title,
        src: productClicked.src,
        categoryId: productClicked.category._id,
        numberInStock: productClicked.numberInStock,
        sales: productClicked.sales,
        price: productClicked.price,
        onSale: productClicked.onSale
      })
    }
  },[productId]
  )

  const { addToast } = useToasts();

  // 進行淺複製，才不會一起連動同一個物件
  const inputData = { ...inputValue }
  
    // 讓TableHeader省略一些功能
  const isSimpleHeader = true;

    //  把'全部種類篩掉'
  const categoriesFiltered = categories.filter(category => category._id !== 0)
  
  const cleanInput = () => {
      handleProductId('')
      setInputValue({ // 儲存以後input內清空
        _id:'',
        title: '',
        src:'',
        categoryId: '',
        numberInStock: '',
        sales: 0,
        price: '',
        onSale: 1
      })
  }
   
  const doSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!inputValue._id) delete inputValue._id 
      await saveProduct(inputValue); // 將前端的data儲存到後端，函式會幫助再將前端data的欄位格式轉換成後台需要的格式
      cleanInput()
      onUpdate() // 使其能夠重新更新母元件，使其重新抓db的資料下來
      addToast(
        `已成功更新「${inputValue.title}」`, {
          appearance: "success",
          autoDismiss:true
      });
    } catch (ex) {
      if (ex)  addToast(
        `錯誤，由於「${ex}」，無法更新此product`, {
          appearance: "error",
          autoDismiss:true
      });
    }
  };

  const handleChange = ({ target: input }) => {    
    if (input.name === 'price' || input.name === 'numberInStock' || input.name === 'onSale'){
      let value = Number(input.value)
      inputData[input.name] = value
    }
    else { inputData[input.name] = input.value }

    setInputValue(inputData)
  }

  // 要傳遞NewMeetupForm的表單內所整理的json data
  // function addMeetupHandler(meetupData) {
    // fetch()是內建於javascript，跟react無關
    // 後面的字段加入後，firebase就會幫你建立collection以及table，後面的.json是firebase需要的
    // 參2是個{}物件，可以配置fetch的方法、以及要儲存的data
  //   fetch('https://react-backend-25f08-default-rtdb.asia-southeast1.firebasedatabase.app/meetups.json',
  //   {
  //     method: 'POST',
  //     body: JSON.stringify(meetupData), // 要先將物件字串化才能傳送
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  //   ).then(() => {
  //     navigate('/')
  //   })
    
  // }

  return (
      <>
      <form className='form' onSubmit={doSubmit}>
        <table className="table table-striped mt-4 md-4"> 
          <TableHeader columns={columns} isSimpleHeader={isSimpleHeader} />
          <tbody >
            <tr>
              <td><input  name='_id' className='table_input' type='text' value={inputValue._id }onChange={handleChange}  disabled /></td>
              <td><input  name='src' className='table_input' type='text' value={inputValue.src }  onChange={handleChange}/></td>
              <td><input  name='title' className='table_input' type='text' value={inputValue.title } onChange={handleChange}/></td>
              <td><select name='categoryId' value={inputValue.categoryId} onChange={handleChange}>
                  <option value='' />
                  {categoriesFiltered.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                {/* {error && <div className="alert alert-danger">{error}</div>} */}
              </td>
              <td><input name='price' className='table_input' type='text' value={inputValue.price } onChange={handleChange}/></td>
              <td><input disabled name='sales' className='table_input' type='text' value={inputValue.sales } /></td>
              <td><input  name='numberInStock'  className='table_input' type='text' value={inputValue.numberInStock } onChange={handleChange}/></td>
              <td>
                <select  name='onSale' id='table-select' className='table_select' value={inputValue.onSale }  onChange={handleChange}>
                  <option value='' />
                  <option className='opt' value={1} >上架</option>
                  <option className='opt' value={0} >下架</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='form_btn'>
          <button type='button' className='btn btn-success' onClick={cleanInput}>清空</button>
          <button type='submit' className='btn btn-primary'>儲存</button>
        </div>
           
          </form>
      </>
  )
}

export default UpdateProducts