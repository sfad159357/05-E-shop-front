import React from "react";

// ...rest : value, type, onChanged，可以這樣用操作子，概念等同destruction，<Input value={value} ...>，props和值的名稱一樣就能這樣使用
export default function Select({ name, label, options, error, ...rest }) {
  return (
    <>
      {/* <label htmlFor={name}>{label}</label> */}
      <select
        name={name}
        id={name}
        label={label}
        {...rest}
      >
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
        ;
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </>
  );
}
