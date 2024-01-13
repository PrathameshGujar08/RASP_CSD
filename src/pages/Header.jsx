import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function Header() {
    const[show, setShow]=React.useState(false);
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
        callAboutUser();
    }, []);

    return (
        <div className="navbar-container">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container >
                    <img className = "imgheader" src={process.env.PUBLIC_URL + '/images/IIT Bhilai - White Logo.png' } alt ="logo" />
                    <h1>IIT BHILAI</h1>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" style ={{height:50}}>
                        <Form className="d-flex input-group">
                            
                                {/* <span className="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span> */}
                                <FormControl 
                                    type="search" placeholder="Search" className="me-2" aria-label="Search" style ={{width:500}}
                                />
                        
                            <Button variant="outline-light"><i class="fa-solid fa-magnifying-glass"></i></Button>
                        </Form>
                        <Nav.Link className="navtext" href="#home">Home</Nav.Link>
                        {show ? 
                            <>
                                <NavDropdown title="Name" id="nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                            :
                            <>
                                <Nav.Link className="navtext" href="#link">Login</Nav.Link>
                                <Nav.Link className="navtext" href="#link">Register</Nav.Link>
                            </>
                        }
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
