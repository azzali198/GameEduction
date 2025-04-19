import React, {useState} from 'react';
import  "./App.css";
import banner from './images/banner.png'
import Home from './Components/Home/Home'
import Forum from './Components/Forum/Forum'
import PhysicsGame from './Components/Physics/PhysicsGame'
import ChemistryGame from './Components/Chemistry/ChemistryGame'
import { Provider } from 'react-redux'
import { store } from '../src/Components/Chemistry/store'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const NAV_LINKS = [
    { text: 'Home', url: '#' },
    { text: 'Physics', url: '#' },
    { text: 'Chemistry', url: '#' },
    { text: 'Forum', url: '#' },
];

const HEADER_IMAGE_SRC = {banner};
const PRIMARY_BG_COLOR = 'bg-primary';
const NAV_BG_COLOR = 'bg-blue-500';
const TEXT_COLOR = 'text-white';
const HOVER_UNDERLINE = 'hover:underline';
const PADDING = 'p-4';
const MARGIN_X = 'mx-2';
const FLEX_CENTER = 'flex justify-between items-center p-4';
const FLEX_COL = 'flex flex-col';
const FLEX_1 = 'flex-1';
const TEXT_CENTER = 'text-center';
const NAV_CLASS = 'flex items-center justify-between bg-blue-500 p-4'
const LINK_CLASS = 'text-white hover:text-white/80'


const Navbar = () => {
  return (
    <nav className={NAV_CLASS}>
      <div className="flex items-center space-x-4">
        <NavLink href="#" text="Home" onClick={() => setCurrentPage('home')}/>
        <NavLink href="#" text="Physics" onClick={() => setCurrentPage('physics')} />
        <NavLink href="#" text="Chemistry" onClick={() => setCurrentPage('chemistry')} />
        <NavLink href="#" text="Forum" onClick={() => setCurrentPage('forum')} />
      </div>
      <div className="flex items-center space-x-4">
        <NavLink href="#" text="Login" />
        <NavLink href="#" text="Subscribe" />
      </div>
    </nav>
  )
}

const NavLink = ({ href, text, onClick }) => {
  return (
    <a href={href} className={LINK_CLASS} onClick ={onClick}>
      {text}
    </a>
  )
}
const Header = () => (
    <div className={PRIMARY_BG_COLOR}>
        <img src={banner} alt="Banner Image" className="w-full" style ={{height:'80px'}} />
    </div>
);

const Footer = () => (
    <footer className={`${NAV_BG_COLOR} ${TEXT_COLOR} ${PADDING} ${TEXT_CENTER}`}>
        &copy; 2023 Your Website Name
    </footer>
);
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'chemistry':
        return       <Provider store={store}>  <ChemistryGame /></Provider>;
      case 'physics':
        return <PhysicsGame />;
      case 'forum':
        return <Forum />;
      default:
        return <Home />;
    }
  };
  return (
    <div className={FLEX_COL + ' min-h-screen'}>
        <Header />
        <Navbar />
        <main className={FLEX_1}>
            {
            /* Main content goes here */
            renderPage()
            }
        </main>
        <Footer />
    </div>
)};

export default App;
