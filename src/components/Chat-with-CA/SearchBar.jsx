
import React from 'react';
import { Button, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import './SearchBar.scss';

function SearchBar() {
  return (
    <div className="searchContent">
      <div className="chatHeading">
        <NavLink to={'/'}><i className="bi bi-house-door-fill text-dark"></i></NavLink>
        <p>Chat with Professionals</p>
      </div>

      <div className="balance">
        <p>Available Balance: <i class="bi bi-currency-rupee"></i><span>0</span></p>
      </div>
      <div className="searchOptions">
        <div>
          <Button className='recharge'><span>Recharge</span></Button>
        </div>
        <div className="filterAndSort">
          
          <Button className="filter"><i className="bi bi-funnel"></i><span className="mobileHidden">Filter</span></Button>
          <Button className="sort"><i class="bi bi-sort-down"></i> <span className="mobileHidden">Sort by</span></Button>
          <span>
            <Input type="search" name="search" id="search" placeholder='Search name..' className="mobileHidden"/>
            {/* <SearchOutlined className="searchIcon" /> */}
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
