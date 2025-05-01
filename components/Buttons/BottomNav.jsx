import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaEnvelope, FaUsers, FaPen, FaUser } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import '../../cssPages/BottomNav.css';

const BottomNav = () => {
    const { theme } = useTheme();
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setHidden(true); // скролл вниз
            } else {
                setHidden(false); // скролл вверх
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <div className={`bottom-nav ${theme} ${hidden ? 'hidden' : ''}`}>
            <NavLink to="/messages" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
                <img src='foto/nav/card.png' className="icon" />
            </NavLink>
            <NavLink to="/followers" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
                <img src='foto/nav/user-group.png' className="icon" />
            </NavLink>
            <NavLink to="/posts" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
                <img src='foto/nav/pencil.png' className="icon" />
            </NavLink>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
                <img src='foto/nav/user-circle.png' className="icon" />
            </NavLink>
        </div>
    );
};

export default BottomNav;
