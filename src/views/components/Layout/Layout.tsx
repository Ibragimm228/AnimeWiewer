"use client";
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Movie } from '@mui/icons-material';

export const Layout = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    if (showMenu) setShowMenu(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    hideMenu();
  }, [location]);

  const navItems = [
    { path: '/', label: 'Главная', icon: <Home className="w-5 h-5" /> },
    { path: '/anime', label: 'Аниме', icon: <Movie className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] rounded-full bg-primary-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[600px] h-[600px] rounded-full bg-primary-600/5 blur-[150px]" />
        <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-primary-400/5 blur-[100px]" />
      </div>

      <header 
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-dark-900/80 backdrop-blur-xl shadow-lg shadow-primary-500/5 py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-lg hover:bg-primary-500/10 
                         transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={showMenu ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"}
                  />
                </svg>
              </motion.button>
              <NavLink 
                to="/" 
                className="text-2xl font-bold text-gradient hover:scale-105 
                          transition-transform duration-300 flex items-center gap-2"
              >
                <span className="text-primary-500 text-3xl">✦</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
                  FrontendMania
                </span>
              </NavLink>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <NavLink 
                  key={item.path}
                  to={item.path} 
                  className={({ isActive }) => 
                    `text-base font-medium relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2
                    ${isActive 
                      ? 'text-white bg-primary-500/20 shadow-md shadow-primary-500/10' 
                      : 'text-dark-100 hover:text-primary-300 hover:bg-dark-800/50'
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {showMenu && (
          <motion.div 
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-y-0 left-0 z-40 w-[280px] bg-dark-900/95 backdrop-blur-xl shadow-2xl lg:hidden"
          >
            <div className="flex flex-col h-full pt-24 pb-6 px-4">
              <div className="flex-grow overflow-y-auto">
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <NavLink 
                      key={item.path}
                      to={item.path} 
                      className={({ isActive }) => 
                        `text-base font-medium relative px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3
                        ${isActive 
                          ? 'text-white bg-primary-500/20 shadow-md shadow-primary-500/10' 
                          : 'text-dark-100 hover:text-primary-300 hover:bg-dark-800/50'
                        }`
                      }
                    >
                      {item.icon}
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showMenu && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-900/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={hideMenu}
          />
        )}
      </AnimatePresence>
      <main className="container mx-auto px-4 pt-28 pb-12 flex-grow relative z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
