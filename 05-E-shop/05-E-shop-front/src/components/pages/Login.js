import {useState} from "react";
import Joi from "joi-browser";
import Form2 from "../common/Form2";
import auth from "../service/authService";
import Home from './Home'
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";


function Login({setUser}) {

  // const data = {
      //  email: email_value,
      // password: password_value
  
  
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const {addToast} = useToasts()

  const schema = {
        email: Joi.string().required().label("email"), // label可以更改跳出error時的欄位名稱
        password: Joi.string().min(5).required().label("password"),
  };
  

  const doSubmit = async (data) => {
    // const { state } = this.props.location;
    // console.log("location state", state);
    try {
      await auth.login(data);
      let user = auth.getAuthUser()
      setUser(user)
      navigate('/', {state:'login'})
    //   this.props.history.push("/"); // 我們不要子元件的跳轉，因為這無法讓App.js呼叫CMD，也就是需要母元件被重新載入
      // 如果訪客要訪問被保護元件，而Route的props有記錄被保護元件的location當前位置，所以如果從被保護元件過來，登入後返回被保護元件。
      // 但不一定都是從被保護元件點進login，所以返回"/"首頁
    //   window.location = state ? state.from : "/";
    } catch (ex) {
      console.log("ex", ex.response);
      if (ex.response && ex.response.status === 400) {
        errors.message = ex.response.data;
        console.log('errors',errors)
        setErrors(errors);
        addToast(`登入失敗：${errors.message}`,
          {
            appearance: 'error',
            autoDismiss:true
          }
        )
      }
    }
  };

  if (auth.getAuthUser()) return <Home /> 
      
  // 假如訪客已經登入，就不要再讓訪客進入login頁面，直接返回首頁
      
  
  return (
      <>
        <h1>登入會員</h1>
        <Form2
          cpnts={[
            { cpnt: 'Input', label:'電子信箱:',name: 'email' ,type:'email', placeholder:'請符合信箱格式，如abc@gmail.com'},
            { cpnt: 'Input', label:'密碼:',name: 'password', type:'password' ,placeholder:'請輸入密碼至少5碼以上' },
            { cpnt: 'Button', label:'提交',name: 'submit', type:'submit' }

        ]}
        schema={schema}
        onSubmit={doSubmit}
        errors={errors}
        />
        {/* {this.renderInput("email", "Email")}
        {this.renderInput("password", "Password", "password")}
        {this.renderButton("Login")} */}
      </>
    );
}
  



export default Login;

//   username = React.createRef(); // ref物件

//   componentDidMount() {
//     this.username.current.focus();
//   }

//   不用套件的方法2，很麻煩瑣碎
//   validate2 = () => {
//     const errors = {};
//     const { email, password } = this.state.data;
//     if (email.trim() === "") errors.username = "Username is required"; // 透過String.trim()能將任何位元的空白字元都軋成""無位元字串
//     if (password.trim() === "") errors.password = "Password is required";
//     console.log("Object.keys:", Object.keys(errors));
//     return Object.keys(errors).length === 0 ? {} : errors; // Object.keys可以將物件內所有屬性(key)，轉化成字串型態的陣列:[ "key1", "key",...]
//   };
