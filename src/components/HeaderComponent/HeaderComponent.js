import "./HeaderComponent.css"
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from "../../hooks/useAuth";
import { logOut } from "../../redux/auth/operations";
import './HeaderComponent.css';
export const HeaderComponent = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useAuth();

    return (
        <header className="header">
            <nav className="nav-container">
                <ul className="nav-list">
                    <li className="nav-item active"><NavLink to="/"><p>Головна</p></NavLink></li>
                    <li className="nav-item"><p>Галерея</p></li>
                    <li className="nav-item"><p>Контакти</p></li>
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