/*import Login from './Login'

function App() {
    return <Login />
}

export default App*/






//Decommenter cette partie pour le code fonctionnel

/*import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet
  } from 'react-router-dom';
import Login from './Login';
import Plateau from './Plateau';
import Historique from './Historique';
 
  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>          
          <Route path="/historique" element={<Historique />}/>
          <Route path="/plateau" element={<Plateau />}/>
          <Route path="/banner" element={<Banner />}/>

        </Routes>
      </BrowserRouter>
    );
  }
export default App*/




//Il y a un conflit entre le CSS Bootstrap et le routage en React
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Historique from './Historique';
import './Route';
import './App.css';

function App() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Game Risky</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <div class="collapse navbar-collapse" id="navbarColor02">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link active" href="/plateau">Plateau de jeu
              <span class="visually-hidden">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/historique">Historique</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">S'inscrire</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>)
}
export default App