import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import './Admin.css';
import Sidebar from '../sidebar/Sidebar';
import AddProduct from '../add-product/AddProduct';
import ListProduct from '../list-product/ListProduct';
import NotFound from '../not-found/NotFound';
import Home from '../home/Home';
import EditProduct from '../edit-product/EditProduct';
import DeleteProduct from '../delete-product/DeleteProduct';

export default function Admin() {

    function RedirectToAdmin() {
        const navigate = useNavigate();
    
        useEffect(() => {
            navigate('/admin');
        }, [navigate]);
    
        return null;
    }

    return (
        <div className="admin">
            <Sidebar />

            <Routes>
                <Route path='/' element={<RedirectToAdmin />}/>
                <Route path='/admin' element={<Home />}/>
                <Route path='/add-product' element={<AddProduct />} />
                <Route path='/list-products' element={<ListProduct />} />
                <Route path='/update-product/:productId' element={<EditProduct />} />
                <Route path='/remove-product/:productId' element={<DeleteProduct />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </div>
    );
}