import './DescriptionBox.css';

export default function DescriptionBox() {
    return (
        <div className="description-box">
            <div className="description-box-navigator">
                <div className="description-box-nav-box">Description</div>
                <div className="description-box-nav-box fade">Reviews (122)</div>
            </div>
            <div className="description-box-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, ullam. Laboriosam esse fuga soluta quod molestias adipisci, necessitatibus magni ipsum eaque rem quisquam delectus? Nesciunt tenetur dolores nulla fugiat rem.</p>
            <p>Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
    );
}