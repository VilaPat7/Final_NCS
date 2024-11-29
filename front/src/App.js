import './App.css';
import { MainPage } from './pages/main/index';
import { LoginPage } from './pages/login/index';
import { CartPage } from './pages/cart/index';
import { SearchPage } from './pages/search/index';
import { CartProvider } from './components/provider/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/new" element={<LoginPage />} />
        <Route path="/new1" element={<CartPage />} />
        <Route path="/new2" element={<SearchPage />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
