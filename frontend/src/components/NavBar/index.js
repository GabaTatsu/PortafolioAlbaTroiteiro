import { useEffect, useState } from 'react';
import instagramIcon from '../../assets/icons/icoinstagram.png';
import casaTroiteiro from '../../assets/icons/logotroiteirosinletras.jpg';
import arrowIcon from '../../assets/icons/down-arrow.png';
import { Link, useLocation } from 'react-router-dom';
import RotateText from '../RotateText';

const NavBar = () => {
    const location = useLocation();
    const [redirect, setRedirect] = useState('/');
    const [isRotated, setIsRotated] = useState(false);

    const toggleRotation = () => {
        setIsRotated(false);
    };

    useEffect(() => {
        if (
            location.pathname === '/Portraits' ||
            location.pathname === '/AboutMe' ||
            location.pathname === '/Drawings' ||
            location.pathname === '/Edit'
        ) {
            setRedirect(location.pathname);
        } else {
            setRedirect('/');
        }
    }, [location.pathname]);

    return (
        <>
            <aside>
                <Link to="/" onClick={toggleRotation}>
                    <img src={casaTroiteiro} alt="Alba Troiteiro"></img>
                </Link>

                <div>
                    {redirect === '/' && (
                        <img src={arrowIcon} alt="TRABAJOS"></img>
                    )}
                    <Link to="/" onClick={toggleRotation}>
                        TRABAJOS
                    </Link>
                </div>
                <div>
                    {redirect === '/Portraits' && (
                        <img src={arrowIcon} alt="RETRATOS"></img>
                    )}

                    <Link to="/Portraits" onClick={toggleRotation}>
                        RETRATOS
                    </Link>
                </div>
                <div>
                    {redirect === '/Drawings' && (
                        <img src={arrowIcon} alt="DIBUJOS"></img>
                    )}

                    <Link to="/Drawings" onClick={toggleRotation}>
                        DIBUJOS
                    </Link>
                </div>
                <div>
                    {redirect === '/AboutMe' && (
                        <img src={arrowIcon} alt="SOBRE MI"></img>
                    )}

                    <Link to="/AboutMe">
                        <RotateText
                            isRotated={isRotated}
                            setIsRotated={setIsRotated}
                        />
                    </Link>
                </div>
                <div>
                    <a
                        href="https://www.instagram.com/alba_troiteiro/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={instagramIcon} alt="INSTAGRAM"></img>
                    </a>
                </div>
            </aside>
        </>
    );
};
export default NavBar;
