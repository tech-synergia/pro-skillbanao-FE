import React from 'react'
import { NavLink } from 'react-router-dom'
import '../scss/Title.scss'

function Title({pageTitle}) {
  return (
    <div className="titleContent">
        <div className="chatHeading">
        <NavLink to={'/'}><i className="bi bi-house-door-fill text-dark"></i></NavLink>
        <p>{pageTitle}</p>
        </div>
    </div>
  )
}

export default Title
