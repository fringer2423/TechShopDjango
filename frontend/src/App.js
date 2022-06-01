import {Container} from 'react-bootstrap'

import Header from './components/header'
import Footer from './components/footer'

function App() {
    return (
        <div>
            <Header/>
            <main className="py-3">
                <Container>
                    <h1>Welcome</h1>
                </Container>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
