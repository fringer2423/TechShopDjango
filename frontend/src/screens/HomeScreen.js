import React from 'react'
import {Row, Col} from 'react-bootstrap'

import products from '../products'
import Product from '../components/product'

function HomeScreen() {
    return (
        <div>
            <h1> Новые товары </h1>
            <Row>
                {products.map(product => (
                    <Col key={products._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen
