import React from 'react'
import {Container, Col, Row} from 'react-bootstrap'

function footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; Tech Shop
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default footer
