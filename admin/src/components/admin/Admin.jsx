import { Routes, Route } from 'react-router-dom';

import './Admin.css';
import Sidebar from '../sidebar/Sidebar';
import AddProduct from '../add-product/AddProduct';
import ListProduct from '../list-product/ListProduct';
import NotFound from '../not-found/NotFound';

export default function Admin() {
    return (
        <div className="admin">
            <Sidebar />

            <Routes>
                <Route path='/add-product' element={<AddProduct />} />
                <Route path='/list-products' element={<ListProduct />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </div>
    );
}