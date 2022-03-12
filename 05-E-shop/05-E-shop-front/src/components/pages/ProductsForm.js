import React from 'react'
import '../../App.css'
import ProductTable from '../common/ProductsTable'
import UpdateProducts from '../common/UpdateProducts'

function ProductsForm() {
  return (
    <>
      <h1 className="ProductsForm">ProductsForm</h1>
      <UpdateProducts />
      <ProductTable />
    </>
  )
}

export default ProductsForm