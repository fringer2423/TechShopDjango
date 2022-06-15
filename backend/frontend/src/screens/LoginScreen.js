import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {login} from '../actions/userActions'

function LoginScreen({location, history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Авторизация</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}

            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId='password'>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Пароль'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Запомнить меня"/>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Войти
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Вы тут новенький? <Link
                    to={redirect ? `/register?redirect=${redirect}` : '/register'}>Регистрация</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
