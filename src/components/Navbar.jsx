import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImagePath } from '../utils/imagePath';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const currentLang = i18n.language;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Update language attribute only
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const [isChangingLang, setIsChangingLang] = useState(false);

  const changeLanguage = (lang) => {
    if (lang === currentLang) return;
    
    setIsChangingLang(true);
    setTimeout(() => {
      i18n.changeLanguage(lang);
      setIsMenuOpen(false);
      setTimeout(() => {
        setIsChangingLang(false);
      }, 300);
    }, 150);
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/production-gallery', label: t('nav.productionGallery') },
    { path: '/contact', label: t('nav.contact') },
    { path: '/quality', label: t('nav.quality') },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-primary shadow-2xl' 
          : 'bg-primary/95 backdrop-blur-sm'
      }`}
      style={{
        backgroundColor: isScrolled ? '#5f3a47' : 'rgba(95, 58, 71, 0.95)',
        backdropFilter: isScrolled ? 'blur(0px)' : 'blur(8px)',
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={getImagePath('/images/logo/Logo.png')} 
              alt="Rimeberry groupe" 
              className="h-14 md:h-16 lg:h-20 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="relative">
              <span className="text-lg md:text-xl lg:text-2xl font-heading font-light text-tertiary group-hover:text-white transition-colors duration-300 tracking-wider arabic-text">
                {currentLang === 'ar' ? 'مجموعة ريمبيري' : 'Rimeberry groupe'}
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tertiary group-hover:w-full transition-all duration-300" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-xs md:text-sm font-light transition-all duration-300 relative px-4 py-2 rounded-lg arabic-text ${
                  location.pathname === link.path
                    ? 'text-tertiary bg-tertiary/20'
                    : 'text-white/90 hover:text-tertiary hover:bg-white/10'
                } ${isChangingLang ? 'opacity-50' : 'opacity-100'}`}
              >
                <motion.span
                  key={`${link.path}-${currentLang}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block"
                >
                  {link.label}
                </motion.span>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-tertiary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center gap-2">
            {['fr', 'en', 'ar'].map((lang) => (
              <motion.button
                key={lang}
                onClick={() => changeLanguage(lang)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`px-3 py-1 rounded text-sm font-body transition-all duration-300 ${
                  currentLang === lang
                    ? 'bg-tertiary text-primary font-light'
                    : 'text-white hover:bg-tertiary/20'
                } ${isChangingLang ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <motion.span
                  key={`lang-${lang}-${currentLang}`}
                  initial={{ opacity: 0, rotateX: -90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {lang.toUpperCase()}
                </motion.span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-tertiary"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 border-t border-tertiary/20 overflow-hidden"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`font-body text-sm font-light transition-colors arabic-text ${
                        location.pathname === link.path
                          ? 'text-tertiary'
                          : 'text-white hover:text-tertiary'
                      } ${isChangingLang ? 'opacity-50' : ''}`}
                    >
                      <motion.span
                        key={`${link.path}-${currentLang}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
                <div className="flex items-center space-x-2 pt-4 border-t border-tertiary/20">
                  {['fr', 'en', 'ar'].map((lang, index) => (
                    <motion.button
                      key={lang}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      onClick={() => changeLanguage(lang)}
                      className={`px-3 py-1 rounded text-sm font-body transition-all duration-300 ${
                        currentLang === lang
                          ? 'bg-tertiary text-primary font-light'
                          : 'text-white hover:bg-tertiary/20'
                      } ${isChangingLang ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <motion.span
                        key={`lang-mobile-${lang}-${currentLang}`}
                        initial={{ opacity: 0, rotateX: -90 }}
                        animate={{ opacity: 1, rotateX: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {lang.toUpperCase()}
                      </motion.span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

