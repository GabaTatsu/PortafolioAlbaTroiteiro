import './style.css';

const RotateText = ({ isRotated, setIsRotated }) => {
    const toggleRotation = () => {
        setIsRotated(true);
    };

    const paragraphClassName = `rotate-paragraph ${isRotated ? 'rotate' : ''}`;

    return (
        <div onClick={toggleRotation}>
            <p>SOBRE MI</p>
            <div className="contacto">
                <p>CON</p>
                <p className={paragraphClassName}>TACTO</p>
            </div>
        </div>
    );
};

export default RotateText;
