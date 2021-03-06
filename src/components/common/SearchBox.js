import React from "react";

export default function SearchBox({ value, placeholder,onChange }) {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3" // y軸上下margin 3
        placeholder={placeholder}
      value={value} // 從Producrs state的searchQuery透過props，作為input的值
      onChange={(e) => onChange(e.target.value)} // 將輸入的值傳回Products state的searchQuery
    />
  );
}
