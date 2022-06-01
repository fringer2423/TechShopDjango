import React from 'react'
import {Navbar, Container, Nav, Row} from 'react-bootstrap'

function header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">Tech Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i> Корзина</Nav.Link>
                            <Nav.Link href="/login"><i className="fas fa-user"></i> Войти</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default header
