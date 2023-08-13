import React from 'react'
import './SearchBar.scss'

function SearchBar() {
  return (
    <div className="searchContent">
        <div className="chatHeading">
            <i className="bi bi-house-fill"></i>
            <p>Chat with CA</p>
        </div>

        <div className="balance">
            <p>Available Balance: <i class="bi bi-currency-rupee"></i>0</p>
        </div>

        <div className="filterAndSort">
            <button className='recharge'>Recharge</button>
            <button className='filter'><i class="bi bi-funnel-fill"></i> Filter</button>
            <button className='sort'><i class="bi bi-sort-down"></i> Sort by</button>
            <span><input type="search" name="search" id="search" placeholder='Search name..'  /><i className="bi bi-search"></i></span>
        </div>
    </div>
  )
}

export default SearchBar
