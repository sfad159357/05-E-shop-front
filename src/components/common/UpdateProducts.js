import {  useEffect, useState} from 'react'
import {useNavigate } from 'react-router-dom';
import { TableHeader } from './TableHeader';
import { saveProduct } from '../service/productsService'
import { useToasts } from "react-toast-notifications";

function UpdateProducts({
  // user,
  columns,
  categories,
  onUpdate,
  productId,
  handleProductId,
  dbProducts })

{
  
  // const navigate = useNavigate()
  // if (!user) {
  //   navigate('/login')
  // }

  
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
          appearance: "error"
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


  return (
      <div className='table-responsive-sm'>
      <form className='form' onSubmit={doSubmit}>
        <table className="simple"> 
          <TableHeader columns={columns} isSimpleHeader={isSimpleHeader} />
          <tbody >
            <tr>
              <td className='_id'><input  name='_id'  type='text' value={inputValue._id }onChange={handleChange}  disabled /></td>
              <td className='src' ><input  name='src' type='text' value={inputValue.src }  onChange={handleChange}/></td>
              <td className='title'><input  name='title'  type='text' value={inputValue.title } onChange={handleChange}/></td>
              <td className='categoryId'><select name='categoryId' value={inputValue.categoryId} onChange={handleChange}>
                  <option value='' />
                  {categoriesFiltered.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                {/* {error && <div className="alert alert-danger">{error}</div>} */}
              </td>
              <td className='price'><input name='price'  type='number' value={inputValue.price } onChange={handleChange}/></td>
              <td className='sales'><input disabled name='sales'  type='text' value={inputValue.sales } /></td>
              <td className='numberInStock'><input  name='numberInStock'   type='number' value={inputValue.numberInStock } onChange={handleChange}/></td>
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
      </div>
  )
}

export default UpdateProducts