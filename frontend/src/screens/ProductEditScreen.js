import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {listProductDetails, updateProduct} from '../actions/productActions'
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants'


function ProductEditScreen({match, history}) {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = productUpdate


    useEffect(() => {

        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)

            }
        }


    }, [dispatch, product, productId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/products/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/productlist'>
                Назад
            </Link>

            <FormContainer>
                <h1>Изменить товар</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Название</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Введите название'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>Стоимость</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Введите стоимость'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='image'>
                                <Form.Label>Изображение</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Выберите изображение'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.File
                                    id='image-file'
                                    label='Выберите файл'
                                    custom
                                    onChange={uploadFileHandler}
                                >

                                </Form.File>
                                {uploading && <Loader/>}

                            </Form.Group>


                            <Form.Group controlId='brand'>
                                <Form.Label>Бренд</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Введите бренд'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countinstock'>
                                <Form.Label>Остаток</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Введите остаток'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>Категория</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Введите категорию'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Описание</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Введите описание'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Button type='submit' variant='primary'>
                                Обновить
                            </Button>

                        </Form>
                    )}

            </FormContainer>
        </div>

    )
}

export default ProductEditScreen