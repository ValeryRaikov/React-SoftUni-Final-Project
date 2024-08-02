import '../ProductDisplay.css';

export default function ListProductItem({
    id,
    name,
    image,
    category,
    newPrice,
    oldPrice,
    onEdit,
    onDelete,
}) {
    return (
        <div className="list-product-format-main list-product-format">
            <img src={image} alt="" className="list-product-product-icon" />
            <p>{name}</p>
            <p>${oldPrice}</p>
            <p>${newPrice}</p>
            <p>{category}</p>
            <button className="edit-btn" onClick={() => onEdit(id)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(id)}>Remove</button>
        </div>
    );
}