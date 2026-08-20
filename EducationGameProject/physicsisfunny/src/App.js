import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import  "./App.css";
import Home from './Components/Home/Home'
import Forum from './Components/Forum/Forum'
import PhysicsGame from './Components/Physics/PhysicsGame'
import ChemistryGame from './Components/Chemistry/ChemistryGame'
import SubscriptionPage from './Components/Subscription/SubscriptionPage'
import Profile from './Components/Profile/Profile'
import Contact from './Components/Contact/Contact'
import LoginModal from './Components/Login/LoginModal'
import { Provider } from 'react-redux'
import { store } from '../src/Components/Chemistry/store'
import Admin from './Components/Admin/Admin'
import { useUser } from './context/UserContext'; // Add this import
import Swal from 'sweetalert2';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('isAdmin') === 'true';
  });
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const { userName } = useUser(); // Get username from context

  const handleSubscribe = (subscriptionData) => {
    console.log('Subscription data:', subscriptionData);
    setIsSubscriptionModalOpen(false);
  };

  // This function will be called by LoginModal with true (success) or false (fail)
  const handleLoginResult = (response) => {
    const authenticated = response?.user.userName !== null && response?.token !== null;
    setIsAuthenticated(authenticated);
    setIsAdmin(response?.isAdmin);
    if (authenticated) {
      setIsLoginModalOpen(false);
      sessionStorage.setItem('JWT', response.token);
      sessionStorage.setItem('isAuthenticated', true);
      sessionStorage.setItem('isAdmin', response.isAdmin);
    }
  };

  const Navbar = () => {
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigateTo = (page) => {
      setCurrentPage(page);
      setMobileMenuOpen(false);
    };

    const avatarUrl = isAuthenticated
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || 'User')}`
      : `https://ui-avatars.com/api/?name=Guest`;

    // Dynamic combobox items based on authentication state
    const menuItems = isAuthenticated
      ? [
          { key: 'profile', label: 'Profile', action: () => navigateTo('profile') },
          { key: 'subscription', label: 'Subscription', action: () => navigateTo('subscription') },
          { key: 'logout', label: 'Logout', action: () => {
              setIsAuthenticated(false);
              setIsAdmin(false);
              sessionStorage.removeItem('JWT');
              sessionStorage.removeItem('isAuthenticated');
              sessionStorage.removeItem('isAdmin');
              sessionStorage.removeItem('userName');
              navigateTo('home');
            }
          }
        ]
      : [
          { key: 'login', label: 'Login', action: () => setIsLoginModalOpen(true) },
          { key: 'subscription', label: 'Subscription', action: () => navigateTo('subscription') }
        ];

    return (
      <nav className="nav-container">
        <button
          type="button"
          className="nav-menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileMenuOpen(open => !open)}
        >
          <span></span><span></span><span></span>
        </button>
        <div
          id="primary-navigation"
          className={`nav-links-container ${mobileMenuOpen ? 'is-open' : ''}`}
        >
          <NavLink 
            href="#" 
            text="Home" 
            onClick={() => navigateTo('home')} 
            requiresAuth={false}
            onAuthRequired={() => setMobileMenuOpen(false)}
          />
          <NavLink 
            href="#" 
            text="Physics" 
            onClick={() => navigateTo('physics')} 
            onAuthRequired={() => setMobileMenuOpen(false)}
          />
          <NavLink 
            href="#" 
            text="Chemistry" 
            onClick={() => navigateTo('chemistry')} 
            onAuthRequired={() => setMobileMenuOpen(false)}
          />
          <NavLink 
            href="#" 
            text="Forum" 
            onClick={() => navigateTo('forum')} 
            onAuthRequired={() => setMobileMenuOpen(false)}
          />
          <NavLink 
            href="#" 
            text="Contact" 
             requiresAuth={false}
            onClick={() => navigateTo('contact')} 
            onAuthRequired={() => setMobileMenuOpen(false)}
          />
          {isAdmin && <NavLink 
            href="#"
            text="Admin"
            onClick={() => navigateTo('admin')}           
            onAuthRequired={() => setMobileMenuOpen(false)}
          />}
        </div>
        <div className="nav-avatar-container">
          {/* Avatar Combobox */}
          <div
            className="avatar-wrapper"
            onClick={() => setAvatarMenuOpen(open => !open)}
            tabIndex={0}
            role="button"
            aria-haspopup="menu"
            aria-expanded={avatarMenuOpen}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setAvatarMenuOpen(open => !open);
              }
            }}
          >
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border"
            />
            <span className="text-white">
              {isAuthenticated ? `Welcome ${sessionStorage.getItem('userName')}` : 'Guest'}
            </span>
            <span className="material-icons">
              arrow_drop_down
            </span>
          </div>
          {avatarMenuOpen && (
            <div className="nav-dropdown" role="menu">
              {menuItems.map(item => (
                <button
                  key={item.key}
                  type="button"
                  className="nav-dropdown-item"
                  onClick={() => {
                    setAvatarMenuOpen(false);
                    item.action();
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    );
  };

  const NavLink = ({ href, text, onClick, requiresAuth = true, onAuthRequired }) => {
    const handleClick = async (e) => {
      if (requiresAuth && !isAuthenticated) {
        e.preventDefault();
        onAuthRequired?.();
        setIsLoginModalOpen(true);
        return;
      }
      // Intercept leaving physics or chemistry page
      const isLeavingPhysics = currentPage === 'physics' && text.toLowerCase() !== 'physics';
      const isLeavingChemistry = currentPage === 'chemistry' && text.toLowerCase() !== 'chemistry';
      if (isLeavingPhysics || isLeavingChemistry) {
        e.preventDefault();
        const result = await Swal.fire({
          title: `Would you really like to leave the ${isLeavingPhysics ? 'Physics' : 'Chemistry'} game?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          reverseButtons: true,
          customClass: {
            popup: 'quit-game-popup'
          }
        });
        if (result.isConfirmed) {
          if (onClick) onClick();
        }
        // If "No", do nothing (stay in game)
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
          <span>&copy; 2023 PhysicsIsFunny</span>
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
      case 'profile':
        return <Profile />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <Router>
      <div className="app-shell flex flex-col min-h-screen">
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
            onNavigateToSubscription={() => {
              setCurrentPage('subscription');
              setIsLoginModalOpen(false);
            }}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
