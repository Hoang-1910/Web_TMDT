import { Link } from 'react-router-dom'
import '../css/Header.css';

function Header(){
    return (
        <header className = "header">
             <nav>
                <Link to="/login">Login</Link> | 
                <Link to="/register">Register</Link> | 
                <Link to="/home">Home</Link>
            </nav>
        </header>
    )
}

export default Header;