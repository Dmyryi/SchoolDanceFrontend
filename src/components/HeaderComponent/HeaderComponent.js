import "./HeaderComponent.css"

export const HeaderComponent=()=>{
    return(
        <div class="header">
    <nav className="nav-container">
        <ul className="nav-list">
            <li className="nav-item active"><p>Головна</p></li>
            <li className="nav-item"><p>Галерея</p></li>
            <li className="nav-item"><p>Контакти</p></li>
        </ul>
    </nav>
</div>
    )
}