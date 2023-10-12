import './style.css';
import casaTroiteiro from '../../assets/icons/logotroiteirosinletras.jpg';

const ImageOverNavBar = ({ isImageRotated }) => {
    const imageClassName = `cabeceo ${isImageRotated ? 'cabeceo-rotado' : ''}`;

    return (
        <img
            src={casaTroiteiro}
            alt="Alba Troiteiro"
            className={imageClassName}
        ></img>
    );
};

export default ImageOverNavBar;
