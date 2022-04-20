import React from "react";

function CategoryBar({
  items,
  textProperty,
  valueProperty,
  onItemSelect,
  selectedItem,
}) {
    return (
        <>
        <ul className="nav nav-tabs">
        <div className= "nav-item">種類篩選：</div>
           { items.map((item) => (
              <li
                key={item[textProperty]}
                onClick={() => onItemSelect(item)}
                className= "nav-item">
                <button
                    className={ item === selectedItem ? "nav-link active" : "nav-link"}
                >
                    {item[textProperty]}
                </button>
              </li> 
            ))}
        </ul>
    </>
  );
}

// 這裡用來處理母元件的props中data的屬性轉換
// 透過新增預設props來做decouple，進行格式轉化
CategoryBar.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default CategoryBar;
