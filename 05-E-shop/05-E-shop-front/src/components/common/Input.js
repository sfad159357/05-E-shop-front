import React, {useRef} from "react";

// ...rest : value, type, onChanged，可以這樣用操作子，概念等同destruction，<Input value={value} ...>，props和值的名稱一樣就能這樣使用
const Input = (props, { ...rest }) => {

  const ref = useRef()
 
  function getRefCurrentValue()  {
    let value = ref.current.value
    props.onSetData2(props.name, value)
  }

  return (
    <div className="form-group mt-4">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        // value={this.state.data.xxx}子元素input的值綁住母元素LoginForm state
        //   ref={this.ref物件}
        {...rest}
        className="form-control"
        type={props.type}
        name={props.name}
        ref={ref}
        onChange={getRefCurrentValue}
      />

      {/* error存在，就是truthy，顯示最後一個statement;假如不存在，就是false。 */}
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  )
};


export default Input;