import './WarningModal.css';

export default function WarningModal({ 
    isVisible, 
    title, 
    children,
}) {
    return (
        <>
            {!isVisible 
                ? null 
                : (<div className="modal-overlay">
                <div className="modal-content">
                    <h2>{title}</h2>
                    <div>{children}</div>
                </div>
            </div>
            )}
        </>
    );
}