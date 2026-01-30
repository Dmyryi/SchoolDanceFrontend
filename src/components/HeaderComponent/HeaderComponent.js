import "./HeaderComponent.css"
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
export const HeaderComponent=()=>{

    const { isLoggedIn } = useAuth();
    return(
        <>
        <div className="header">
            <nav className="nav-container">
                <ul className="nav-list">
                    <li className="nav-item active"><p>Головна</p></li>
                    <li className="nav-item"><p>Галерея</p></li>
                    <li className="nav-item"><p>Контакти</p></li>
                </ul>
            </nav>
        </div>
        <NavLink to="/profile" className="profile-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </NavLink>

        </>
    )
}