import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Details from './pages/Details';
import DonationDetail from './pages/DonationDetail';

// Scroll to top on route change (e.g. footer link click)
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0 -mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate/:type" element={<DonationDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;