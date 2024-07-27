import './NewCollections.css';
import new_collections from '../assets/new_collections';
import Item from '../item/Item';

export default function NewCollections() {
    return (
        <div className="new-collections">
            <h1>New collections</h1>
            <hr />
            <div className="collections">
                {new_collections.map(item => <Item key={item.id} {...item} />)}
            </div>
        </div>
    );
}