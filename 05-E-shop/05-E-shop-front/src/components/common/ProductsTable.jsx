import React, { Component } from "react";
import Table from "./Table";
import Like from "./Like";
import { Link } from "react-router-dom";
import auth from "../service/authService";

// step1:從func component改變成class component
// step2:將Movie母元件的handleSort移至自己元件本身內，另設方法
class ProductTable extends Component {
  // 只有admin才能進行刪除
  constructor() {
    super();
    const user = auth.getAuthUser();

    if (user && user.isAdmin) this.columns.push(this.deleteColumn());
  }
  
  columns = [
    {
      path: "title",
      label: "Title",
      content: (Product) => (
        <Link
          to={`/Products/${Product._id}`} // 作者要的
        >
          {Product.title}
        </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (
        Product // 屬性content函式化，參數Product，回傳react element<Like>
      ) => (
        <Like isLiked={Product.isLiked} onLike={() => this.props.onLike(Product)} />
      ),
    }, // const x = <h1></h1>，x就是原javascript物件，可用來當作參數傳遞
  ];

  deleteColumn() {
    return {
      key: "delete",
      content: (Product) => {
        return (
          <button
            type="submit"
            className="btn btn-danger btn-sm"
            onClick={() => this.props.onDelete(Product._id)}
          >
            Delete
          </button>
        );
      },
    };
  }

  render() {
    const { ProductsPaged, onSort, sortedColumn } = this.props;
    // 由於columns幾乎不會更改狀況，故不用放到state

    return (
      <Table
        items={ProductsPaged}
        columns={this.columns}
        sortedColumn={sortedColumn}
        onSort={onSort}
      />
    );
  }
}

export default ProductTable;
