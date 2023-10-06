import React, { useEffect, useRef } from 'react';
import AboutMe from '../AboutMe';
import logoTroiteiro from '../../assets/icons/logotroiteiro.jpg';
import './style.css';

const AboutMeList = ({ aboutMes, deleteAboutMe }) => {
    const imageRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (imageRef.current) {
                const scrollY = window.scrollY;
                const rotation = scrollY * 5;
                imageRef.current.style.transform = `rotate(${rotation}deg)`;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <ul className="aboutme">
            <img
                src={logoTroiteiro}
                alt="Casa Troiteiro"
                className="rotate-image"
                ref={imageRef}
            ></img>
            {aboutMes.map((aboutMe) => {
                return (
                    <li key={aboutMe.id}>
                        <AboutMe
                            aboutMe={aboutMe}
                            deleteAboutMe={deleteAboutMe}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default AboutMeList;
