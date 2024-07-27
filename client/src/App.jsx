import { Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Shop from './components/shop/Shop';
import Category from './components/category/Category';
import Product from './components/product/Product';
import About from './components/about/About';
import Registration from './components/registration/Registration';
import Cart from './components/cart/Cart';

function App() {
     return (
        <>
            <Navbar />

            <Routes>
                <Route path='/' element={<Shop /> } />
                <Route path='/men' element={<Category category='men' /> } />
                <Route path='/women' element={<Category category='women' /> } />
                <Route path='/kids' element={<Category category='kids' /> } />
                <Route path='/product' element={<Product />}>
                    <Route path=':productId' element={<Product />} />
                </Route>
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<Registration /> } />
                <Route path='/cart' element={<Cart /> } />
            </Routes>
        </>
    )
}

export default App
