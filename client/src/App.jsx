import { Routes, Route, useLocation } from 'react-router-dom';

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
    const location = useLocation();
    const isAboutPage = location.pathname.startsWith('/about');

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
                <Route path='/about' element={<About />} >
                    <Route path='company' element={<Cart /> } />
                    <Route path='products' element={<Cart /> } />
                    <Route path='offices' element={<Cart /> } />
                    <Route path='about-us' element={<Cart /> } />
                    <Route path='contact' element={<Cart /> } />
                </Route>
                <Route path='/login' element={<Registration /> } />
                <Route path='/cart' element={<Cart /> } />
                <Route path='/*' element={<NotFound />} />
            </Routes>

            {!isAboutPage && <Footer />}
        </>
    )
}

export default App
