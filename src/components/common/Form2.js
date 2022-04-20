import React,{useState,useEffect} from 'react'
import Input from "./Input";
import { Link } from 'react-router-dom';
import Joi from "joi-browser";
import './Form2.css'

function Form2({ cpnts, onSubmit, schema, checkPassword, errors}) {
    
    const [data2, setData2] = useState({})
    const [errors2, setErrors2] = useState(null)
    // Form2的errors2馬上和login或register的errors合併
    useEffect(() => {
        setErrors2(errors)
    },[])
    
    console.log('Form2 data', data2)
        
    const validate = (schema) => {
        const options = { abortEarly: false }; // 參3為false，是將全部的error訊息顯示出來，讓使用者知道提交後還有哪裡的格式不對
        const { error } = Joi.validate(data2, schema, options);
        if (!error) return null; // 為了要讓errors可被條件式判斷，才會回傳null

        const errors = {};
        for (let item of error.details) {
        errors[item.path] = item.message;
        }
        return errors;
    };

    const handleSetData2 = (key) => (event) => {  
        setData2(state => {
            state[key] = event.target.value
            return state;
        })
        console.log('data2',data2)
    }

   const handleSubmit = (schema , data, checkPassword=null) =>(event)=> {
    event.preventDefault();
       let errors = validate(schema);
    //  要先確認有這個函式，然後再判斷密碼是否符合才走下一步
       if (checkPassword && checkPassword(data)) {
         // 假如errors是null就設errors就設{}，不然errors為null無法賦予key,value
           if (!errors) errors = {};
           errors['password2'] = checkPassword(data);
       }
       //密碼符合就可以刪除data.password2
       setErrors2(errors)
 // 為了讓username和password能夠參照沒有error的errors<
    // -> 使用 || or選擇器，沒有errors，不要設null，而是{}狀態
    if (errors) return; // 如果有errors，就停止函式繼續往下執行
        delete data.password2 
       onSubmit(data2);
   };
    
   
    
    return (
        <form onSubmit={handleSubmit(schema, data2, checkPassword)} className='form2'>
        {cpnts.map(item => {
            let { name, type,label,placeholder,path } = item
                switch (item.cpnt) {
                    case 'Input':
                        return (
                            <Input
                                key={name}
                                name={name}
                                label={label}
                                type={type}
                                placeholder={placeholder}
                                errors2={errors2}
                                onSetData2={handleSetData2}
                            // 如果data有值，就會顯示在頁面讓使用者知道多少值
                            // onChange={handleChange}
                            // error={errors[name]}
                            />)
                    case 'Button':
                        return (
                            <input
                                key={name}
                                type={type}
                                value={label}
                                className="btn btn-primary mt-4"
                                // disabled={errors2} // 有值代表有error，為truthy，所以開啟disabled，取消submit功能
                            />)
                    case 'Link':
                        return (
                            <p key={name} className='form2-p'>
                            <span>{label}</span>
                            <span><Link to={`${path}`}>{name}</Link></span>
                            </p>
                        )
                    default:
                        return <h3>沒有東西</h3>

                }
            })
        }
    </form>
    )
}
        
    
    
export default Form2;