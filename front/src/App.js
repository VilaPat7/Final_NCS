import './App.css';
import { MainPage } from './pages/main/index';
import { LoginPage } from './pages/login/index';
import { CartPage } from './pages/cart/index';
import { SearchPage } from './pages/search/index';
import { CartProvider } from './components/provider/index';
import { SupportPage } from './pages/support/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
