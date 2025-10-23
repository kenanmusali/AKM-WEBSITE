import React, { useEffect, useState } from 'react';
import LogoMark from '../../elements/logo';
import ContactItem from '../../elements/sections/contact';
import CareersItem from '../../elements/sections/careers';
import ActivitiesItem from '../../elements/sections/activities';
import AboutItem from '../../elements/about';
import LMS from '../../elements/sections/lms';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper to scroll to section by ID, centered
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center', // Aligns to center instead of top
            });
        }
    };

    return (
        <div>
            <div className="Navbar-Group">
                <div className={`Primary-Navbar ${scrolled ? 'Scrolled' : ''}`}>
                    <div className="Nav-Primary-First-Section">
                        <LogoMark />
                    </div>
                    <span className='Nav-End'>
                        <div className='Nav-End-items' onClick={() => scrollToSection('about')}>
                            <AboutItem />
                        </div>
                        <div className='Nav-End-items' onClick={() => scrollToSection('careers')}>
                            <CareersItem />
                        </div>
                        <div className='Nav-End-items' onClick={() => scrollToSection('activities')}>
                            <ActivitiesItem />
                        </div>
                        <div className='Nav-End-items'>
                            <LMS />
                        </div>
                        <ContactItem />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
