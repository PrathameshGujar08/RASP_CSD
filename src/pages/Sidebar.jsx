import React,{useState} from 'react'
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

export default function Sidebar() {
    const [isVisible, setIsVisible] = useState(true)
  return (
    <div >
    <SideNav id="sdb" expanded={isVisible}>
        <SideNav.Toggle
          onClick={() => {
            setIsVisible(!isVisible);
          }}
          id="sdtg"
        />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Home</NavText>
          </NavItem>
          <NavItem eventKey="placed orders">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>placed orders</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
      </div>
  )
}
