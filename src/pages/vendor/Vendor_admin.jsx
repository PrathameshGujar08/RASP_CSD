import React, { useState } from "react";
import {ProSidebar,Menu,MenuItem,SidebarContent,} from "react-pro-sidebar";
import { FaList} from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { FiHome } from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";

import Vendor_Header from "./Vendor_Header";
import Dashboard from "./Dashboard";
import FMenu from "./FMenu";
import Orders from "./Orders";
const Vendor= () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("home");

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  return (
  <>
    <Vendor_Header/>
    <div style={{display:'flex',  height: '100%' }}>
      <div id="header">
        <ProSidebar>
          <SidebarContent>
            <Menu iconShape="square">
                <MenuItem 
                  active={selectedMenuItem === "home"}
                  onClick={() => handleMenuItemClick("home")} 
                  icon={<FiHome />}>
                  Home
                </MenuItem>
                <MenuItem
                  active={selectedMenuItem === "menu"}
                  onClick={() => handleMenuItemClick("menu")}
                  icon={<MdFastfood />}
                >
                  Menu
                </MenuItem>
                <MenuItem
                  active={selectedMenuItem === "orders"}
                  onClick={() => handleMenuItemClick("orders")}
                  icon={<FaList />}
                >
                  Orders
                </MenuItem>
                <MenuItem
                  active={selectedMenuItem === "settings"}
                  onClick={() => handleMenuItemClick("settings")}
                  icon={<BiCog />}
                >
                  Settings
                </MenuItem>
              </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
      <div className="vendorRightDiv">
          {/* Render content based on the selected menu item */}
          {selectedMenuItem === "home" && <Dashboard/>}
          {selectedMenuItem === "menu" && <FMenu/>}
          {selectedMenuItem === "orders" && <Orders/>}
          {selectedMenuItem === "settings" && <div>Settings Content</div>}
      </div>
      

    </div>
    
  </>
  );
}
export default Vendor;