import React, { Component } from "react";


export class TableHeader extends Component {
  // 處理path和order的邏輯在TableHeader元件本身額外宣告的方法處理就好
  raiseSort = (path) => {
    const sortedColumn = { ...this.props.sortedColumn };
    if (sortedColumn.path === path)
      sortedColumn.order = sortedColumn.order === "asc" ? "desc" : "asc";
    else {
      // 如果沒有連續點
      sortedColumn.path = path;
      sortedColumn.order = "asc";
    }
    this.props.onSort(sortedColumn); // 處理好path和order，再傳送sortColumn完整的物件回去給母元件Movie做setState
  };

  renderIcon = (col) => {
    const { sortedColumn } = this.props;
    if (col.path !== sortedColumn.path) return null;
    return sortedColumn.order === "asc" ? (
      <i className="fa fa-sort-asc"></i>
    ) : (
      <i className="fa fa-sort-desc"></i>
    );
  };

  render() {
    const {isLarge, isSimpleHeader,columns,ptableClass } = this.props;
    
    if (isSimpleHeader) return (
      <thead>
        <tr >
       {columns.map((col) => (
            <th key={col.label || col.key} className={col.path}>
              {col.label} 
            </th>
          ))}
        </tr>
      </thead>
    )

    if (!isLarge) return <></>
    
    return (
      <thead>
        <tr >
          {columns.map((col) => (
            <th
              key={col.label || col.key}
              className={col.path}
              onClick={() => this.raiseSort(col.path)}
              // className="clickable"
            >
              {col.label} {this.renderIcon(col)}
            </th>
          ))}
        </tr>
        </thead>
    );
  }
}



export default TableHeader;
