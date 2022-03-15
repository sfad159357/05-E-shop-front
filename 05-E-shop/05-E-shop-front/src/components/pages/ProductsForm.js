import React from 'react'
import '../../App.css'
import ProductTable from '../common/ProductsTable'
import UpdateProducts from '../common/UpdateProducts'

function ProductsForm({user, originProducts, categories}) {
  return (
    <>
      <h1 className="ProductsForm">ProductsForm</h1>
      <UpdateProducts user={user} />
      <ProductTable user={user} originProducts={originProducts} categories={ categories}/>
    </>
  )
}

export default ProductsForm