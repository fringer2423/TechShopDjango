import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card} from 'react-bootstrap'
import Rating from '../components/Rating'
import products from "../products"

function ProductScreen({match}) {
    const product = products.find((p) => p._id == match.params.id)
    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Главная</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} отзывов`} color={'#f8e825'}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Цена: {product.price}$
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Описание: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Цена:</Col>
                                    <Col><strong>{product.price}$</strong></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Статус:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'В наличии' : 'Нет в наличии'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button className='btn-block' disabled={product.countInStock == 0} type='button'>Добавить в корзину</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen
