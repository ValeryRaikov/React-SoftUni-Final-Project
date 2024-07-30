import { Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Shop from './components/shop/Shop';
import Category from './components/category/Category';
import Product from './components/product/Product';
import About from './components/about/About';
import Registration from './components/registration/Registration';
import Cart from './components/cart/Cart';
import Footer from './components/footer/Footer';
import men_banner from './components/assets/banner_men.png';
import women_banner from './components/assets/banner_women.png';
import kids_banner from './components/assets/banner_kids.png';
import NotFound from './components/not-found/NotFound';

function App() {
     return (
        <>
            <Navbar />

            <Routes>
                <Route path='/' element={<Shop /> } />
                <Route path='/men' element={<Category banner={men_banner} category='men' /> } />
                <Route path='/women' element={<Category banner={women_banner} category='women' /> } />
                <Route path='/kids' element={<Category banner={kids_banner} category='kid' /> } />
                <Route path='/product' element={<Product />}>
                    <Route path=':productId' element={<Product />} />
                </Route>
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<Registration /> } />
                <Route path='/cart' element={<Cart /> } />
                <Route path='/*' element={<NotFound />}  />
            </Routes>

            <Footer />
        </>
    )
}

export default App
