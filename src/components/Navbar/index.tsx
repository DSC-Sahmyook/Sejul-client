import React from 'react'
import './navbar.scss';
import { Logo, CircularImage } from '../';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className="__navbar-container">
            <div className="__navbar-content-container">
                <div className='__navbar-content-wrapper    '>
                    <Link className="__navbar-logo-container" to="/">
                        <Logo className="__navbar-logo" />
                    </Link>
                    <ul className="__navbar-links">
                        <li className="__navbar-link-item">
                            <Link to="/search">탐색</Link>
                        </li>
                        <li className="__navbar-link-item">
                            <Link to="/summary">요약</Link>
                        </li>
                        <li className="__navbar-link-item">
                            <Link to="/signin">로그인</Link>
                        </li>
                    </ul>
                    <Link to="/user" className="__navbar-user-info">
                        <CircularImage url={'data:image/jpeg;base64,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'} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
