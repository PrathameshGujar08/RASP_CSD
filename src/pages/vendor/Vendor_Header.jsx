import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Vendor_Header() {
    const navigate = useNavigate();
    const callAboutUser = async () => {
        try {
            // const res = await fetch(process.env.REACT_APP_BACKEND_URL+"api/users/aboutuser", {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     credentials: "include",
            // });
            // const data = await res.json();
            // console.log("header",data);
            // setShow(true);

            // if (!res.status === 200) {
            //     throw new Error(res.error);
            // }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if(localStorage.getItem("current-food-delivery-vendor"))
        {
        }
    }, []);

    // Function to Handle Logout Click
    let handle_Logout_Click = () => {
        localStorage.removeItem("current-food-delivery-vendor")
        navigate("/login")
    }
    return (
        <div className="navbar-container">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container >
                    <div style={{display:'flex'}}>
                        <img className = "imgheader" src={process.env.PUBLIC_URL + '/images/IIT Bhilai - White Logo.png' } alt ="logo" />
                        <h1 style={{marginTop:'1rem'}}>CAMPDEL</h1>
                    </div>
                    
                    <Nav className="me-auto" style ={{height:50}}>
                        <Nav.Link className="navtext" onClick={handle_Logout_Click}>Logout</Nav.Link>
                        
                        
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Vendor_Header;
