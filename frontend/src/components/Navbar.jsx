import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiMail, HiPhone, HiMenu, HiX, HiChevronDown, HiHome, HiUser, HiAcademicCap } from 'react-icons/hi';
import { Button } from './Buttons';

const leftMenuLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  {
    label: 'Courses',
    children: [
      { to: '/#courses', label: 'Noorani Qaida' },
      { to: '/#courses', label: 'Recite Quran Online' },
      { to: '/#courses', label: 'Quran with Tajweed' },
      { to: '/#courses', label: 'Quran with Tafseer' },
      { to: '/#courses', label: 'Quran Memorization' },
      { to: '/#courses', label: 'Islamic Studies' },
    ],
  },
  { to: '/#teachers', label: 'Teachers' },
  { to: '/#fee', label: 'Fee Structure' },
  { to: '/#zakat-donation', label: 'Zakat & Donation' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const updateAuth = () => {
      setToken(localStorage.getItem('token'));
      setIsSuperAdmin(localStorage.getItem('isSuperAdmin') === 'true');
    };
    updateAuth();
    window.addEventListener('storage', updateAuth);
    window.addEventListener('auth-change', updateAuth);
    return () => {
      window.removeEventListener('storage', updateAuth);
      window.removeEventListener('auth-change', updateAuth);
    };
  }, []);

  // Google Translate - DOM ready ke baad script load, dropdown kaam kare
  useEffect(() => {
    let cancelled = false;
    function initTranslate() {
      if (cancelled) return;
      const target = document.getElementById('google_translate_element');
      if (!target) return;
      if (document.getElementById('google-translate-script')) {
        if (window.google?.translate && !target.querySelector('.goog-te-gadget')) {
          try {
            new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
          } catch (_) {}
        }
        return;
      }
      window.googleTranslateElementInit = function () {
        if (cancelled) return;
        const el = document.getElementById('google_translate_element');
        if (el && window.google?.translate) {
          try {
            new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
          } catch (e) {
            console.warn('Translate init:', e);
          }
        }
      };
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
    const t = setTimeout(initTranslate, 300);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  const closeLeftMenu = () => setLeftMenuOpen(false);

  const openTranslateDropdown = () => {
    const run = () => {
      const sel = [
        '#google_translate_element a.goog-te-menu-value',
        '#google_translate_element .goog-te-menu-value',
        '#google_translate_element .goog-te-gadget-simple',
        '#google_translate_element .goog-te-gadget a',
        '#google_translate_element a[href="#"]',
        '#google_translate_element a',
      ];
      const trigger = sel.map((s) => document.querySelector(s)).find(Boolean);
      if (trigger) {
        trigger.click();
      } else {
        const any = document.querySelector('#google_translate_element [role="button"], #google_translate_element .skiptranslate');
        if (any) any.click();
      }
    };
    run();
    setTimeout(run, 100);
  };

  return (
    <>
      {/* Top Bar - Translate box + email & phone */}
      <div className="bg-primary-dark text-white py-2 text-sm">
        <div className="max-w-container mx-auto px-5 flex flex-wrap items-center justify-between gap-4">
          {/* Translator - box ke andar; button click pe Google dropdown open */}
          <div className="translate-box">
            <span className="translate-box-label">Language</span>
            <button
              type="button"
              onClick={openTranslateDropdown}
              className="translate-trigger-btn"
              aria-label="Select language"
            >
              Select Language <HiChevronDown className="inline w-4 h-4 ml-0.5" />
            </button>
            <div id="google_translate_element" className="translate-box-widget translate-widget-overlay" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:pakquranteaching@gmail.com" className="flex items-center gap-1.5 hover:opacity-90 transition-opacity">
              <HiMail className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">pakquranteaching@gmail.com</span>
            </a>
            <a href="tel:+923124810000" className="flex items-center gap-1.5 hover:opacity-90 transition-opacity">
              <HiPhone className="w-4 h-4 flex-shrink-0" />
              +923124810000
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-container mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2.5 rounded-lg hover:bg-bg-alt border border-gray-200 transition-colors"
              onClick={() => setLeftMenuOpen(true)}
              aria-label="Open menu"
            >
              <HiMenu className="w-6 h-6 text-gray-700" />
            </button>
            <Link to="/" className="text-xl font-bold text-primary whitespace-nowrap hover:text-primary-dark transition-colors">
              Pak Quran Academy
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Link to="/" className="px-4 py-2.5 rounded-lg hover:bg-bg-alt hover:text-primary font-medium text-gray-800 transition-colors flex items-center gap-1.5">
              <HiHome className="w-4 h-4" /> Home
            </Link>
            <Link to="/about" className="px-4 py-2.5 rounded-lg hover:bg-bg-alt hover:text-primary font-medium text-gray-800 transition-colors">
              About Us
            </Link>
            <Link to="/#courses" className="px-4 py-2.5 rounded-lg hover:bg-bg-alt hover:text-primary font-medium text-gray-800 transition-colors flex items-center gap-1.5">
              <HiAcademicCap className="w-4 h-4" /> Courses
            </Link>
            {token ? (
              <>
                <Link to="/profile" className="px-4 py-2.5 rounded-lg hover:bg-bg-alt hover:text-primary font-medium text-gray-800 transition-colors flex items-center gap-1.5">
                  <HiUser className="w-4 h-4" /> Profile
                </Link>
                {isSuperAdmin && (
                  <Link to="/dashboard" className="px-4 py-2.5 rounded-lg hover:bg-bg-alt hover:text-primary font-medium text-gray-800 transition-colors">
                    Dashboard
                  </Link>
                )}
              </>
            ) : (
              <Link to="/login" className="px-4 py-2.5 rounded-lg hover:bg-bg-alt hover:text-primary font-medium text-gray-800 transition-colors">
                Login
              </Link>
            )}
          </nav>

          <div className="flex-shrink-0">
            <Button to="/contact" variant="free">
              FREE TRIAL
            </Button>
          </div>
        </div>
      </header>

      {/* Left Side Menu */}
      {leftMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" onClick={closeLeftMenu} aria-hidden="true" />
          <aside className="fixed top-0 left-0 w-80 max-w-[85vw] h-full bg-white shadow-xl z-50 overflow-y-auto animate-slide-in-left">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-semibold text-gray-800">Menu</span>
              <button type="button" className="p-2 rounded-lg hover:bg-bg-alt text-gray-600 transition-colors" onClick={closeLeftMenu} aria-label="Close menu">
                <HiX className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                {leftMenuLinks.map((item) =>
                  item.children ? (
                    <li key={item.label}>
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-bg-alt text-gray-800 font-medium text-left"
                        onClick={() => setCoursesOpen((o) => !o)}
                      >
                        {item.label}
                        <HiChevronDown className={`w-5 h-5 transition-transform ${coursesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <ul className={`pl-4 overflow-hidden transition-all duration-200 ${coursesOpen ? 'max-h-96' : 'max-h-0'}`}>
                        {item.children.map((c) => (
                          <li key={c.label}>
                            <Link to={c.to} className="block px-4 py-2.5 rounded-lg hover:bg-bg-alt text-gray-600 hover:text-primary" onClick={closeLeftMenu}>
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <Link to={item.to} className="block px-4 py-3 rounded-lg hover:bg-bg-alt text-gray-800 font-medium" onClick={closeLeftMenu}>
                        {item.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
              <div className="mt-4 pt-4 border-t space-y-2">
                {token ? (
                  <>
                    <Link to="/profile" className="block px-4 py-3 rounded-lg bg-bg-alt text-primary font-medium text-center" onClick={closeLeftMenu}>Profile</Link>
                    {isSuperAdmin && (
                      <Link to="/dashboard" className="block px-4 py-3 rounded-lg bg-primary text-white font-medium text-center" onClick={closeLeftMenu}>Dashboard</Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-3 rounded-lg bg-bg-alt text-primary font-medium text-center" onClick={closeLeftMenu}>Login</Link>
                    <Link to="/register" className="block px-4 py-3 rounded-lg bg-primary text-white font-medium text-center" onClick={closeLeftMenu}>Register</Link>
                  </>
                )}
              </div>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
