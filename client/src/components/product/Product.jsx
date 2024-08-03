import { useContext } from "react";
import { useParams } from 'react-router-dom';

import { ShopContext } from "../../context/ShopContext";
import Breadcrum from "../breadcrum/Breadcrum";
import ProductDisplay from "../product-display/ProductDisplay";
import DescriptionBox from "../description-box/DescriptionBox";

export default function Product() {
    const {allProducts} = useContext(ShopContext);
    const { productId } = useParams();
    const product = allProducts.find((p) => p.id === Number(productId));

    return (
        <div>
            <Breadcrum {...product} />
            <ProductDisplay {...product} />
            <DescriptionBox {...product} />
        </div>
    );
}