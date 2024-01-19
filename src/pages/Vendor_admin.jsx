import React from 'react'
import { Navbar, Nav } from "react-bootstrap";
import Sidebar from './Sidebar';
export default function vendor_admin() {
  return (
    <div > 
        <div className="topnav">
            <Navbar
            fixed="top"
            expand="lg"
            >
            
            </Navbar>    
        </div>
        <Sidebar/>
        
      </div>
      
  )
}
