import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { jwtDecode } from 'jwt-decode'

function Header() {
    const[show, setShow]=React.useState(false);
    const navigate = useNavigate();
    const[token, setToken]=React.useState();
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
        if(localStorage.getItem("food-delivery-token"))
        {
            setToken(jwtDecode(JSON.parse(localStorage.getItem('food-delivery-token'))));
            setShow(true);
        }
    }, []);

    // Function to Handle Logout Click
    let handle_Logout_Click = () => {
        localStorage.removeItem("food-delivery-token")
        navigate("/login")
    }
    return (
        <div className="navbar-container">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container >
                    <img className = "imgheader" src={process.env.PUBLIC_URL + '/images/IIT Bhilai - White Logo.png' } alt ="logo" />
                    <h1>CAMPDEL</h1>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" style ={{height:50}}>
                        <Form className="d-flex" style={{marginRight:'8rem'}}>
                            <div className="input-group">
                                <FormControl 
                                    type="search" placeholder="Search" className="me-2" aria-label="Search" style ={{width:400}}
                                />
                            </div>
                            <Button variant="outline-light"><i class="fa-solid fa-magnifying-glass"></i></Button>
                        </Form>
                        <Nav.Link className="navtext" href="/">Home</Nav.Link>
                        {show ? 
                            <>
                                <NavDropdown title={token.userID} id="nav-dropdown">
                                    <NavDropdown.Item href="/profile_endpoint">Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="/cart">Cart</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handle_Logout_Click}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                            :
                            <>
                                <Nav.Link className="navtext" href="/login">Login</Nav.Link>
                                <Nav.Link className="navtext" href="/register">Register</Nav.Link>
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
