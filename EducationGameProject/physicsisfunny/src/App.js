import React, {useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import  "./App.css";
import banner from './images/banner.png'
import Home from './Components/Home/Home'
import Forum from './Components/Forum/Forum'
import PhysicsGame from './Components/Physics/PhysicsGame'
import ChemistryGame from './Components/Chemistry/ChemistryGame'
import SubscriptionPage from './Components/Subscription/SubscriptionPage'
import LoginModal from './Components/Login/LoginModal'
import { Provider } from 'react-redux'
import { store } from '../src/Components/Chemistry/store'
import Admin from './Components/Admin/Admin'


const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Assuming you have a way to determine if the user is an admin
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  const handleSubscribe = (subscriptionData) => {
    console.log('Subscription data:', subscriptionData);
    setIsSubscriptionModalOpen(false);
  };

  // This function will be called by LoginModal with true (success) or false (fail)
  const handleLoginResult = (response) => {
    setIsAuthenticated(response?.user !== null);
    if (response?.user !== null) 
      {
        setIsLoginModalOpen(false);
        alert(JSON.stringify(response));
        sessionStorage.setItem('JWT', response.token);
        setIsAdmin(response.isAdmin);
      }
  };

  const Navbar = () => {
    return (
      <nav className="nav-container flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <NavLink 
            href="#" 
            text="Home" 
            onClick={() => setCurrentPage('home')} 
            requiresAuth={false}
          />
          <NavLink 
            href="#" 
            text="Physics" 
            onClick={() => setCurrentPage('physics')} 
          />
          <NavLink 
            href="#" 
            text="Chemistry" 
            onClick={() => setCurrentPage('chemistry')} 
          />
          <NavLink 
            href="#" 
            text="Forum" 
            onClick={() => setCurrentPage('forum')} 
          />
          {isAdmin && <NavLink 
            href="#"
            text="Admin"
            onClick={() => setCurrentPage('admin')}           
          />}
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <NavLink 
              href="#" 
              text="Logout" 
              requiresAuth={false}
              onClick={() => {
                setIsAuthenticated(false);
                setCurrentPage('home'); // Redirect to Home on logout
              }} 
            />
          ) : (
            <NavLink 
              href="#" 
              text="Login" 
              requiresAuth={false}
              onClick={() => setIsLoginModalOpen(true)} 
            />
          )}
          <NavLink 
            href="#" 
            text="Subscribe" 
            requiresAuth={false}
            onClick={() => setCurrentPage('subscription')}
          />
        </div>
      </nav>
    );
  };

  const NavLink = ({ href, text, onClick, requiresAuth = true }) => {
    const handleClick = (e) => {
      if (requiresAuth && !isAuthenticated) {
        e.preventDefault();
        setIsLoginModalOpen(true);
        return;
      }
      if (onClick) onClick();
    };

    return (
      <a 
        href={href} 
        className={`text-white hover:text-white/80 ${requiresAuth && !isAuthenticated ? 'opacity-50' : ''}`} 
        onClick={handleClick}
      >
        {text}
        {requiresAuth && !isAuthenticated && (
          <span className="ml-1 text-xs">🔒</span>
        )}
      </a>
    );
  };

  const Header = () => (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">
          <span>P</span>
          <span>H</span>
          <span>Y</span>
          <span>S</span>
          <span>I</span>
          <span>C</span>
          <span>S</span>
          <span> </span>
          <span>I</span>
          <span>S</span>
          <span> </span>
          <span>F</span>
          <span>U</span>
          <span>N</span>
          <span>N</span>
          <span>Y</span>
        </h1>
      </div>
    </header>
  );

  const Footer = () => (
      <footer className="footer">
          <span>&copy; 2023 Your Website Name</span>
      </footer>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'chemistry':
        return <Provider store={store}><ChemistryGame /></Provider>;
      case 'physics':
        return <PhysicsGame />;
      case 'forum':
        return <Forum />;
      case 'subscription':
        return <SubscriptionPage />;
      case 'admin':
        return <Admin />;
      default:
        return <Home />;
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Navbar />
        <main className="main-content flex-1">
            {renderPage()}
        </main>
        <Footer />

        {isLoginModalOpen && (
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onLogin={handleLoginResult}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
