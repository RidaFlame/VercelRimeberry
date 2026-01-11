import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Catalogue from './pages/Catalogue';
import ProductDetails from './pages/ProductDetails';
import ProductionGallery from './pages/ProductionGallery';
import Quality from './pages/Quality';
import Contact from './pages/Contact';
import './i18n/config';

function App() {
  console.log('🔄 App component rendering...');
  
  let i18n, t;
  try {
    const translation = useTranslation();
    i18n = translation.i18n;
    t = translation.t;
    console.log('✅ useTranslation working, language:', i18n.language);
  } catch (e) {
    console.error('❌ useTranslation error:', e);
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
        <h1 style={{ color: 'red' }}>i18n Error</h1>
        <p>{e.message}</p>
        <pre style={{ background: '#f5f5f5', padding: '10px', textAlign: 'left' }}>
          {e.stack}
        </pre>
      </div>
    );
  }

  const [isLangChanging, setIsLangChanging] = useState(false);

  useEffect(() => {
    try {
      const currentLang = i18n.language || 'fr';
      document.documentElement.lang = currentLang;
      
      if (currentLang === 'ar') {
        document.documentElement.classList.add('arabic-mode');
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        document.documentElement.classList.remove('arabic-mode');
        document.documentElement.setAttribute('dir', 'ltr');
      }
      console.log('✅ Language set to:', currentLang);
    } catch (e) {
      console.error('❌ Language setup error:', e);
    }
  }, [i18n.language]);

  useEffect(() => {
    try {
      const handleLanguageChanged = () => {
        setIsLangChanging(true);
        setTimeout(() => setIsLangChanging(false), 500);
      };
      
      i18n.on('languageChanged', handleLanguageChanged);
      return () => i18n.off('languageChanged', handleLanguageChanged);
    } catch (e) {
      console.error('❌ Language listener error:', e);
    }
  }, [i18n]);

  console.log('✅ About to render Router...');

  try {
    return (
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/production-gallery" element={<ProductionGallery />} />
              <Route path="/quality" element={<Quality />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    );
  } catch (e) {
    console.error('❌ Render error:', e);
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
        <h1 style={{ color: 'red' }}>Render Error</h1>
        <p>{e.message}</p>
        <pre style={{ background: '#f5f5f5', padding: '10px', textAlign: 'left' }}>
          {e.stack}
        </pre>
      </div>
    );
  }
}

export default App;
