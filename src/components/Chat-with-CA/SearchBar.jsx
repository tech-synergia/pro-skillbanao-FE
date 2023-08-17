// import React from 'react'
// import './SearchBar.scss'

// function SearchBar() {
//   return (
//     <div className="searchContent">
//         <div className="chatHeading">
//             <i className="bi bi-house-fill"></i>
//             <p>Chat with Professionals</p>
//         </div>

//         <div className="balance">
//             <p>Available Balance: <i class="bi bi-currency-rupee"></i>0</p>
//         </div>

//         <div className="filterAndSort">
//             <button className='recharge'>Recharge</button>
//             <button className='filter'><i class="bi bi-funnel-fill"></i> Filter</button>
//             <button className='sort'><i class="bi bi-sort-down"></i> Sort by</button>
//             <span><input type="search" name="search" id="search" placeholder='Search name..'  /><i className="bi bi-search"></i></span>
//         </div>
//     </div>
//   )
// }

// export default SearchBar
import React from 'react';
import { Button, Input } from 'antd';
import {
  HomeFilled,
  DollarCircleFilled,
  FilterOutlined,
  DownOutlined,
  SearchOutlined
} from '@ant-design/icons';
import './SearchBar.scss';

function SearchBar() {
  return (
    <div className="searchContent">
      <div className="chatHeading">
        <HomeFilled className="chatIcon" />
        <p>Chat with Professionals</p>
      </div>

      <div className="balance">
        <p>Available Balance: <DollarCircleFilled className="currencyIcon" style={{fontSize: "20px", margin: "5px"}}/><span>0</span></p>
      </div>

      <div className="filterAndSort">
        <Button className="recharge"><span>Recharge</span></Button>
        <Button className="filter "><FilterOutlined className="filterIcon mobileButton" /> <span className="mobileHidden">Filter</span></Button>
        <Button className="sort "><DownOutlined className="sortIcon mobileButton" /> <span className="mobileHidden">Sort by</span></Button>
        <span>
          <Input type="search" name="search" id="search" placeholder='Search name..' className="mobileHidden"/>
          <SearchOutlined className="searchIcon" />
        </span>
      </div>
    </div>
  );
}

export default SearchBar;
