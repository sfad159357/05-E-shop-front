import React from 'react'

function SortedBar(props) {
  return (
<div>
         <ul className="nav nav-tabs">
            <li className= "nav-item">
            <button
                  onClick={() => props.onPriceOrder('desc')}
                  className={ props.orderState==="desc" ? "nav-link active" : "nav-link"}
            >
              大到小
                </button>
          </li>
          <li className= "nav-item">
            <button
                onClick={() => props.onPriceOrder('asc')}
                    className={ props.orderState==="asc" ? "nav-link active" : "nav-link"}
            >
              小到大
                </button>
            </li>
        </ul>
      </div>  )
}

export default SortedBar