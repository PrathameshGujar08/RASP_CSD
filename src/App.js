import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Restaurant from './pages/Restaurant';
import Vendor_page from './pages/Vendor_admin'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/restaurant" element={<Restaurant/>}></Route>
        <Route path="/vendor_admin" element={<Vendor_page />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
