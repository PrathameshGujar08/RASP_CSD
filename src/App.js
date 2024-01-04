import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/Login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
