import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import './Admin.css';

import Login from '../login/Login';
import Sidebar from '../sidebar/Sidebar';
import NotFound from '../not-found/NotFound';
import Home from '../home/Home';
import AddProduct from '../services/add-product/AddProduct';
import ListProduct from '../services/list-product/ListProduct';
import EditProduct from '../services/edit-product/EditProduct';
import DeleteProduct from '../services/delete-product/DeleteProduct';
import ProtectedRoutes from '../common/ProtectedRoutes';

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
                <Route path='/admin-login' element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path='/add-product' element={<AddProduct />} />
                    <Route path='/list-products' element={<ListProduct />} />
                    <Route path='/update-product/:productId' element={<EditProduct />} />
                    <Route path='/remove-product/:productId' element={<DeleteProduct />} />
                </Route>
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </div>
    );
}