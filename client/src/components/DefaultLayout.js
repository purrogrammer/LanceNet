import React from "react"
import { Menu, Dropdown } from "antd"
import {useNavigate} from 'react-router-dom'

import "../resources/default-layout.css"
function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("lance-net-user"))
  const navigate = useNavigate()
  const menu = (
    <Menu
      items={[
        {
          label: (
            <li onClick={()=>{
              localStorage.removeItem('lance-net-user')
              navigate("/login");
            }}>Sign out</li>
          ),
        }
      ]}
    />
  );
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">LanceNET$</h1>
          <p className="subhead">Know Where It Goes.</p>
        </div>
        <div>
          <Dropdown overlay={menu} placement="bottomLeft">
            <button className='primary'>{user.name}</button>
          </Dropdown>
        </div>
      </div>

      <div className="content">{props.children}</div>

      <div className="footer d-flex justify-content-between align-items-center">
        <div className="footer-container row">
      
          <div className="footer-text col">&copy;Marguerite Kennedy/M++ Creative Lab, {new Date().getFullYear()} </div>
          
        </div>

      </div>
    </div>
  );
}

export default DefaultLayout;
