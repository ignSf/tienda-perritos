/**
 * Main App component
 */

import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Cart from './pages/Cart/Cart';
import Community from './pages/Community/Community';
import AnimeBlog from './pages/Community/AnimeBlog';
import EsportsBlog from './pages/Community/EsportsBlog';
import TechSupport from './pages/TechSupport/TechSupport';
import Profile from './pages/Profile/Profile';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import type { Page } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={(page) => setCurrentPage(page as Page)} />;
      case 'products':
        return <Products />;
      case 'register':
        return <Register />;
      case 'login':
        return <Login onNavigate={(page) => setCurrentPage(page as Page)} />;
      case 'cart':
        return <Cart />;
      case 'tech-support':
        return <TechSupport />;
      case 'community':
        return <Community onNavigate={(page) => setCurrentPage(page as Page)} />;
      case 'anime-blog':
        return <AnimeBlog />;
      case 'esports-blog':
        return <EsportsBlog />;
      case 'profile':
        return <Profile />;
      default:
        return <Home onNavigate={(page) => setCurrentPage(page as Page)} />;
    }
  };

  return (
    <UserProvider>
      <CartProvider>
        <div className="app">
          <Header setCurrentPage={setCurrentPage} />
          <main className="container">
            {renderPage()}
          </main>
          <Footer />
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
