import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProductDetails, createProductReview} from '../actions/productActions'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'

function ProductScreen({match, history}) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
                rating,
                comment
            }
        ))
    }

    return (
        <div>
            <Link to='/' className='btn btn-dark my-3'>Назад</Link>
            {loading ?
                <Loader/>
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid className="mb-3"/>
                                </Col>

                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Rating value={product.rating} text={`${product.numReviews} reviews`}
                                                    color={'#f8e825'}/>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Стоимость: ${product.price}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Описание: {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>

                                <Col md={3}>
                                    <Card className="mb-3">
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Стоимость:</Col>
                                                    <Col>
                                                        <strong>${product.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Наличие:</Col>
                                                    <Col>
                                                        {product.countInStock > 0 ? 'В наличии' : 'Нет в наличии'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Кол-во</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {
                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}

                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addToCartHandler}
                                                    className='btn-block'
                                                    disabled={product.countInStock == 0}
                                                    type='button'>
                                                    Добавить в корзину
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <h4 className="mb-3">Отзывы</h4>
                                    {product.reviews.length === 0 && <Message variant='info'>Нет отзывов</Message>}

                                    <ListGroup variant='flush' className="mb-3">
                                        {product.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color='#f8e825'/>
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}

                                        <ListGroup.Item>
                                            <h4 className="mb-3">Напишите отзыв</h4>

                                            {loadingProductReview && <Loader/>}
                                            {successProductReview &&
                                                <Message variant='success'>Отзыв написан</Message>}
                                            {errorProductReview &&
                                                <Message variant='danger'>{errorProductReview}</Message>}

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label className="mb-3">Рейтинг</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            className="mb-3"
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Выберите...</option>
                                                            <option value='1'>1 - Плохо</option>
                                                            <option value='2'>2 - Нормально</option>
                                                            <option value='3'>3 - Хорошо</option>
                                                            <option value='4'>4 - Очень хорошо</option>
                                                            <option value='5'>5 - Великолепно</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment' className="mb-3">
                                                        <Form.Label className="mb-3">Отзыв</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        disabled={loadingProductReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Отправить
                                                    </Button>

                                                </Form>
                                            ) : (
                                                <Message variant='info'>Пожалуйста, <Link to='/login'>войдите</Link> и
                                                    напишите отзыв</Message>
                                            )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                    )
            }
        </div>
    )
}

export default ProductScreen