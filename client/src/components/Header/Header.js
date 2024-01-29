import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="top-menu">
            <div className="menu-links">
                <Link to="/">Etusivu</Link>
                <Link to="/reseptit">Reseptit</Link>
                <Link to="/laheta-resepti">Lähetä resepti</Link>
            </div>
            <div className="credentials">
                <Link to="/kirjaudu">Kirjaudu</Link>
            </div>
        </nav>
    );
};

export default Header;