import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Historique from './Historique';
import './Route';

function Plateau() {
    return (
        <div>
            <h1>Plateau 🧮</h1>
            <nav>
        <Link to="/historique">My Profile</Link>
      </nav>

        </div>
    )
}
export default Plateau