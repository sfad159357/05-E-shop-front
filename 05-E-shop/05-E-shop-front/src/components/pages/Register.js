
import {useState} from "react";
import Joi from "joi-browser";
import Form2 from "../common/Form2";
import auth from "../service/authService";
import Home from './Home'

function Register() {
  
  const [errors, setErrors ] = useState({})

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
    // const { state } = this.props.location;
    // console.log("location state", state);
    try {
      await auth.register(data);
      window.location = '/'

    //   this.props.history.push("/"); // 我們不要子元件的跳轉，因為這無法讓App.js呼叫CMD，也就是需要母元件被重新載入
      // 如果訪客要訪問被保護元件，而Route的props有記錄被保護元件的location當前位置，所以如果從被保護元件過來，登入後返回被保護元件。
      // 但不一定都是從被保護元件點進login，所以返回"/"首頁
    //   window.location = state ? state.from : "/";
    } catch (ex) {
      console.log("ex", ex.response);
      if (ex.response && ex.response.status === 400) {
        errors.response = ex.response.data;
        errors.email = "此email已有人註冊過了";
        setErrors(errors);
        alert('register errors',errors)
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
            { cpnt: 'Button', label:'提交',name: 'submit', type:'submit' }

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


