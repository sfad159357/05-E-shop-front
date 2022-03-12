import React,{useState,useEffect} from 'react'
import Input from "./Input";
import Select from "./Select";
import Joi from "joi-browser";

function Form2({ cpnts, data, onSetData }) {
    console.log('Form2 data', data)
    
    const [data2, setData2] = useState({})
    const [error2, setError2] = useState(null)

    const handleSetData2 = (key, value) => {  
        setData2(state2 => {
            state2[key] = value;
            return state2;
        })
        let e = validate()
        setError2(e)
  }

    const schema = {
        email: Joi.string().required().label("email"), // label可以更改跳出error時的欄位名稱
        password: Joi.string().required().label("password"),
        };
        
    const validate = () => {
        const options = { abortEarly: false }; // 參3為false，是將全部的error訊息顯示出來，讓使用者知道提交後還有哪裡的格式不對
        const { error } = Joi.validate(data2, schema, options);
        console.log('Joi error', error)
        if (!error) return null; // 為了要讓errors可被條件式判斷，才會回傳null

        const errors = {};
        for (let item of error.details) {
        errors[item.path] = item.message;
        }
        return errors;
    };
    
 

     return (
     cpnts.map(item => {
        let type = item.name
        switch (item.cpnt) {
            case 'Input':
                return(
                    <Input
                        key={type}
                        name={type}
                        label={type}
                        type={type}
                        onSetData2={handleSetData2}
                         // 如果data有值，就會顯示在頁面讓使用者知道多少值
                    // onChange={handleChange}
                    // error={errors[name]}
                    />)
             case 'Button':
                return(
                    <input
                        key={type}
                        type="submit"
                        value={type}
                        className="btn btn-primary mt-4"
                        disabled={error2} // 有值代表有error，為truthy，所以開啟disabled，取消submit功能
                    />)
            default:
                return <h3>沒有東西</h3>

            }
         })
    )
}
        
    
    
export default Form2;