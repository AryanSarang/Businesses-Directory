import { Route, Routes, BrowserRouter } from 'react-router-dom';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Header from './components/Header';
import Categories from './pages/Categories';
import Allbusiness from './pages/Allbusiness';
import Contact from './pages/Contact';

export default function App() {
  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/allbusiness" element={<Allbusiness />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </BrowserRouter>
}