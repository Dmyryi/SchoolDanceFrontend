import { useEffect, useState } from "react";
import "./HeaderComponent.css";
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from "../../hooks/useAuth";
import { logOut } from "../../redux/auth/operations";

export const HeaderComponent = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <nav className="nav-container">
                <ul className="nav-list">
                    <li className="nav-item"><NavLink to="/"><p>Головна</p></NavLink></li>
                    <li className="nav-item"><NavLink to="/#gallery"><p>Галерея</p></NavLink></li>
                    <li className="nav-item"><NavLink to="/#contacts"><p>Контакти</p></NavLink></li>
                </ul>
            </nav>

            <div className="auth-controls">

                <NavLink to="/profile" className="profile-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </NavLink>

        
                {isLoggedIn && (
                    <button 
                        className="logout-btn" 
                        onClick={() => dispatch(logOut())}
                    >
                        Вихід
                    </button>
                )}
            </div>
        </header>
    )
}