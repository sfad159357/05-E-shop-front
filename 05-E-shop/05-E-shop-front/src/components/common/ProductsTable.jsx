import React, { Component } from "react";
import Table from "./Table";
import Like from "./Like";
import { Link } from "react-router-dom";
import auth from "../service/authService";
import './ProductsTable.css'

// step1:從func component改變成class component
// step2:將Movie母元件的handleSort移至自己元件本身內，另設方法
class ProductTable extends Component {
  // 只有admin才能進行刪除
  constructor() {
    super();
    const user = auth.getAuthUser();

    if (user && user.isAdmin) this.columns.push(this.deleteColumn());
  }

  sortedColumn = { path: "title", order: "asc" }

  
  columns = [
    {
      path: "title",
      label: "商品名稱",
      content: (product) => (
        <Link
          to={`/products/${product._id}`} // 作者要的
        >
          {product.title}
        </Link>
      ),
    },
    { path: "src", label: "圖片", content: (product) => <img className='table-img' src={product.src} alt={product.title} /> },
    { path: "price", label: "價格" },
    { path: "onSale", label: "上下架", content: (product) => (product.onSale ? <span className="on-sale">上架中</span> : <span className="not-on-sale">未上架</span>)},
    { path: "category.name", label: "種類" },
    { path: "numberInStock", label: "庫存" ,content: (product) => (product.numberInStock ? <span className="on-sale">{product.numberInStock}</span> : <span className="no-stock">0</span>)},
    { path: "sales", label: "銷售量" },
    {
      key: "like",
      content: (product) => ( // 屬性content函式化，參數Product，回傳react element<Like>
        <Like isLiked={product.isLiked} onLike={() => this.props.onLike(product)} />
      ),
    }, // const x = <h1></h1>，x就是原javascript物件，可用來當作參數傳遞
  ];

  deleteColumn() {
    return {
      key: "delete",
      content: (product) => {
        return (
          <button
            type="submit"
            className="btn btn-danger btn-sm"
            onClick={() => this.props.onDelete(product._id)}
          >
            Delete
          </button>
        );
      },
    };
  }

  render() {
    const {  onSort, originProducts} = this.props;
    // 由於columns幾乎不會更改狀況，故不用放到state

    return (
      <Table
        items={originProducts}
        columns={this.columns}
        sortedColumn={this.sortedColumn}
        onSort={onSort}
      />
    );
  }
}

export default ProductTable;
