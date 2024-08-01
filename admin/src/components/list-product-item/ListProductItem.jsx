import './ListProductItem.css';

export default function ListProductItem({
    name,
    image,
    category,
    newPrice,
    oldPrice,
}) {
    return (
        <div className="list-product-format-main list-product-format">
            <img src={image} alt="" className="list-product-product-icon" />
            <p>{name}</p>
            <p>${oldPrice}</p>
            <p>${newPrice}</p>
            <p>{category}</p>
            <button className="edit-btn">Edit</button>
            <button className="delete-btn">Remove</button>
        </div>
    );
}