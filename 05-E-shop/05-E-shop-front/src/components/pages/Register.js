import {useState} from "react";
import Joi from "joi-browser";
import Form2 from "../common/Form2";
import auth from "../service/authService";
import Home from './Home'
import { useToasts } from "react-toast-notifications";
import { useNavigate } from 'react-router-dom';


function Register() {
  
  const [errors, setErrors] = useState({})
  const { addToast } = useToasts()
  const navigate = useNavigate()

  const schema = {
    email: Joi.string().email().trim().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{5,30}$/)
      .required(),
    password2: Joi.string()
      .regex(/[a-zA-Z0-9]{5,30}$/)
      .required(),
    name: Joi.string().min(3).trim().required(),
  };

  const checkPassword = (data) => {
    console.log('do checkPassword ')
    if (data.password2 === '') return '請填寫確認密碼';
    return (data.password === data.password2 ) ? '' :  '密碼與確認密碼不一致';
  }

  const doSubmit = async (data) => {
   
    try {
      await auth.register(data);
      navigate('/login', {state:'register'})
      
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        errors.message  = ex.response.data;
        setErrors(errors.message);
        addToast(`註冊失敗：${errors.message}`,{appearance: 'error'})
      }
    }
  };

  if (auth.getAuthUser()) return <Home /> 
      
  // 假如訪客已經登入，就不要再讓訪客進入login頁面，直接返回首頁
      
  
  return (
      <>
        <h1>註冊會員</h1>
        <Form2
          cpnts={[
            { cpnt: 'Input', label:'電子信箱:',name: 'email' ,type:'email', placeholder:'請符合信箱格式，如abc@gmail.com'},
            { cpnt: 'Input', label:'密碼:',name: 'password', type:'password' ,placeholder:'請輸入密碼至少5碼以上' },
            { cpnt: 'Input', label:'確認密碼:',name: 'password2', type:'password' ,placeholder:'請與剛剛密碼輸入一致' },
            { cpnt: 'Input', label:'姓名:',name: 'name', type:'text' ,placeholder:'請輸入名字至少3個字元以上' },
          { cpnt: 'Button', label: '提交', name: 'submit', type: 'submit' },
            { cpnt: 'Link', label:'已經是會員了嗎？',name: '點我登入',path:'/login' }

        ]}
        schema={schema}
        checkPassword={checkPassword}
        onSubmit={doSubmit}
        errors={errors}
        />
     
      </>
    );
}
  



export default Register;


