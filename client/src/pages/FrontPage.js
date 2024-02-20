import React from 'react';
import './FrontPage.scss';
import { Link } from 'react-router-dom';

const FrontPage = () => {
    return (
        <div>
            <section className="hero">
                <div className="flex flex-row align-items-center justify-content-center w-100 pt-5">
                    <div className="hero__text-container pr-5">
                        <h1 className="hero__header">Riemuresepti</h1>
                        <p className="hero__brief">Kurniiko vatsasi, eikä perinteiset reseptit nappaa?<br />Riemureseptistä löydät sekä tekoälyn että käyttäjien lisäämiä suussa sulavia reseptejä!</p>
                    </div>
                    <Link to="/reseptit">
                        <div className="hero__img-container">
                            <img src="/img/bursa.png" alt="hero-image" className="hero__img" />
                            <div className="hero__img-content">
                                <p>Näytä herkulliset reseptit</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="custom-shape-divider-bottom-1708439220">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                    </svg>
                </div>
            </section>
        </div>
    );
};

export default FrontPage;