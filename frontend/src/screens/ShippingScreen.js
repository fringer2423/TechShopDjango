import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../actions/cartActions'

function ShippingScreen({history}) {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Доставка</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId='address'>
                    <Form.Label>Адрес</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Введите адрес'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId='city'>
                    <Form.Label>Город</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Введите город'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId='postalCode'>
                    <Form.Label>Индекс</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Введите индекс'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId='country'>
                    <Form.Label>Область</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Введите область'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Продолжить
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
