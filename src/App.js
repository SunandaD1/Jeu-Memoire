import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import MyNavbar from './include/Navbar';
import Wordgame from './pages/Game';


function App() {
  return (
    <Router>
      <MyNavbar/>
      <Wordgame/>
    </Router>
  );
}

export default App;
