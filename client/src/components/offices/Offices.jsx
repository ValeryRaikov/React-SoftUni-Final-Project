import './Offices.css';

export default function Offices() {
    return (
        <div className="offices">
            <h2>Find Our Offices</h2>
            <div className="offices-container">
                <div className="offices-sofia">
                    <h3>Sofia</h3>
                    <div className="locations">
                        <ul>
                            <li><a href="#" target="_blank">Office 1</a></li>
                            <li><a href="#" target="_blank">Office 2</a></li>
                            <li><a href="#" target="_blank">Office 3</a></li>
                        </ul>
                    </div>
                </div>
                <div className="offices-plovdiv">
                    <h3>Plovdiv</h3>
                    <div className="locations">
                        <ul>
                            <li><a href="#" target="_blank">Office 1</a></li>
                            <li><a href="#" target="_blank">Office 2</a></li>
                        </ul>
                    </div>
                </div>
                <div className="offices-burgas">
                    <h3>Burgas</h3>
                    <div className="locations">
                        <ul>
                            <li><a href="#" target="_blank">Office 1</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}