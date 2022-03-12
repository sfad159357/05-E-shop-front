import {useState} from "react";
import Joi from "joi-browser";
import Form2 from "../common/Form2";
import Input from "../common/Input";
import auth from "../service/authService";
import render from "../../utils/renderComponents";
import {useLocation, useNavigate} from 'react-router-dom'

function Login() {

  // const data = {
      //  email: email_value,
      // password: password_value
  
  
  const [data, setData] = useState({  })
  const [errors, setErrors ] = useState({})
  
 

  const handleSetData = (key, value) => {
    
    setData(state => {
      state[key] = value;
      console.log('state',state)
      return state;
    })

    console.log('data',data)
  }
  

  const location = useLocation()

 const doSubmit = async () => {
    // const { state } = this.props.location;
    // console.log("location state", state);
    try {
      await auth.login(data);
    //   this.props.history.push("/"); // 我們不要子元件的跳轉，因為這無法讓App.js呼叫CMD，也就是需要母元件被重新載入
      // 如果訪客要訪問被保護元件，而Route的props有記錄被保護元件的location當前位置，所以如果從被保護元件過來，登入後返回被保護元件。
      // 但不一定都是從被保護元件點進login，所以返回"/"首頁
    //   window.location = state ? state.from : "/";
    } catch (ex) {
      console.log("ex", ex.response);
      if (ex.response && ex.response.status === 400) {
        errors.email = ex.response.data;
        setErrors({ errors });
      }
    }
  };

    // if (auth.getAuthUser()) return <Redirect to="/" />; // 假如訪客已經登入，就不要再讓訪客進入login頁面，直接返回首頁
    console.log('location',location)
  console.log('data', data)
  
    return (
      <form onSubmit={doSubmit}>
        <h1>登入會員</h1>
        <Form2
          cpnts={[
            { cpnt: 'Input', name: 'email' },
            { cpnt: 'Input', name: 'password' },
            { cpnt: 'Button', name: 'submit' }

          ]}
          data={data}
          onSetData={handleSetData}
        />
        {/* {this.renderInput("email", "Email")}
        {this.renderInput("password", "Password", "password")}
        {this.renderButton("Login")} */}
      </form>
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
