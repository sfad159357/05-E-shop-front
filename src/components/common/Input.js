import React from "react";

// ...rest : value, type, onChanged，可以這樣用操作子，概念等同destruction，<Input value={value} ...>，props和值的名稱一樣就能這樣使用
const Input = (props, { ...rest }) => {

 
  return (
    <div className="form-group mt-4">
      <span className="required">*</span>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        // value={this.state.data.xxx}子元素input的值綁住母元素LoginForm state
        //   ref={this.ref物件}
        {...rest}
        className="form-control"
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onSetData2(props.name)}
      />

      {/* 第一個props.error是為了第二個條件出現undefined[props.name] */}
      {/* 第二個props.error[props.name]讓個別的input顯示出紅框 */}
      {props.errors2 && props.errors2[props.name] && <div className="alert alert-danger">{props.errors2[props.name]}</div>}
    </div>
  )
};


export default Input;