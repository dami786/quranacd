import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiMail, HiPhone, HiMenu, HiX, HiChevronDown, HiHome, HiUser, HiAcademicCap, HiInformationCircle } from 'react-icons/hi';
import { Button } from './Buttons';
import { manualCourses } from '../data/courses';

const courseMenuItems = manualCourses.map((course, index) => ({
  to: `/details/${index}`,
  label: course.titleEn,
}));

const leftMenuLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  {
    label: 'Courses',
    children: courseMenuItems,
  },
  { to: '/#zakat-donation', label: 'Zakat & Donation' },
  { to: '/contact', label: 'Contact' },
];

// Mobile bottom nav: only Home, About Us, Courses + Profile (when logged in)
const mobileBottomNavItems = [
  { to: '/', label: 'Home', Icon: HiHome },
  { to: '/about', label: 'About Us', Icon: HiInformationCircle },
  { to: '/#courses', label: 'Courses', Icon: HiAcademicCap },
];

// Google Translate – saari supported languages (alphabetical by label)
const translateLanguages = [
  { code: 'en', label: 'English' },
  { code: 'af', label: 'Afrikaans' },
  { code: 'sq', label: 'Albanian' },
  { code: 'am', label: 'Amharic' },
  { code: 'ar', label: 'Arabic' },
  { code: 'hy', label: 'Armenian' },
  { code: 'az', label: 'Azerbaijani' },
  { code: 'eu', label: 'Basque' },
  { code: 'be', label: 'Belarusian' },
  { code: 'bn', label: 'Bengali' },
  { code: 'bs', label: 'Bosnian' },
  { code: 'bg', label: 'Bulgarian' },
  { code: 'ca', label: 'Catalan' },
  { code: 'zh', label: 'Chinese' },
  { code: 'zh-CN', label: 'Chinese (Simplified)' },
  { code: 'zh-TW', label: 'Chinese (Traditional)' },
  { code: 'co', label: 'Corsican' },
  { code: 'hr', label: 'Croatian' },
  { code: 'cs', label: 'Czech' },
  { code: 'da', label: 'Danish' },
  { code: 'nl', label: 'Dutch' },
  { code: 'eo', label: 'Esperanto' },
  { code: 'et', label: 'Estonian' },
  { code: 'fi', label: 'Finnish' },
  { code: 'fr', label: 'French' },
  { code: 'fy', label: 'Frisian' },
  { code: 'gl', label: 'Galician' },
  { code: 'ka', label: 'Georgian' },
  { code: 'de', label: 'German' },
  { code: 'el', label: 'Greek' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'ht', label: 'Haitian Creole' },
  { code: 'ha', label: 'Hausa' },
  { code: 'haw', label: 'Hawaiian' },
  { code: 'he', label: 'Hebrew' },
  { code: 'hi', label: 'Hindi' },
  { code: 'hmn', label: 'Hmong' },
  { code: 'hu', label: 'Hungarian' },
  { code: 'is', label: 'Icelandic' },
  { code: 'ig', label: 'Igbo' },
  { code: 'id', label: 'Indonesian' },
  { code: 'ga', label: 'Irish' },
  { code: 'it', label: 'Italian' },
  { code: 'ja', label: 'Japanese' },
  { code: 'jv', label: 'Javanese' },
  { code: 'kn', label: 'Kannada' },
  { code: 'kk', label: 'Kazakh' },
  { code: 'km', label: 'Khmer' },
  { code: 'rw', label: 'Kinyarwanda' },
  { code: 'ko', label: 'Korean' },
  { code: 'ku', label: 'Kurdish' },
  { code: 'ky', label: 'Kyrgyz' },
  { code: 'lo', label: 'Lao' },
  { code: 'la', label: 'Latin' },
  { code: 'lv', label: 'Latvian' },
  { code: 'lt', label: 'Lithuanian' },
  { code: 'lb', label: 'Luxembourgish' },
  { code: 'mk', label: 'Macedonian' },
  { code: 'mg', label: 'Malagasy' },
  { code: 'ms', label: 'Malay' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'mt', label: 'Maltese' },
  { code: 'mi', label: 'Maori' },
  { code: 'mr', label: 'Marathi' },
  { code: 'mn', label: 'Mongolian' },
  { code: 'my', label: 'Myanmar (Burmese)' },
  { code: 'ne', label: 'Nepali' },
  { code: 'no', label: 'Norwegian' },
  { code: 'ny', label: 'Nyanja (Chichewa)' },
  { code: 'or', label: 'Odia' },
  { code: 'ps', label: 'Pashto' },
  { code: 'fa', label: 'Persian' },
  { code: 'pl', label: 'Polish' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'pa', label: 'Punjabi' },
  { code: 'ro', label: 'Romanian' },
  { code: 'ru', label: 'Russian' },
  { code: 'sm', label: 'Samoan' },
  { code: 'gd', label: 'Scots Gaelic' },
  { code: 'sr', label: 'Serbian' },
  { code: 'st', label: 'Sesotho' },
  { code: 'sn', label: 'Shona' },
  { code: 'sd', label: 'Sindhi' },
  { code: 'si', label: 'Sinhala' },
  { code: 'sk', label: 'Slovak' },
  { code: 'sl', label: 'Slovenian' },
  { code: 'so', label: 'Somali' },
  { code: 'es', label: 'Spanish' },
  { code: 'su', label: 'Sundanese' },
  { code: 'sw', label: 'Swahili' },
  { code: 'sv', label: 'Swedish' },
  { code: 'tl', label: 'Tagalog' },
  { code: 'tg', label: 'Tajik' },
  { code: 'ta', label: 'Tamil' },
  { code: 'tt', label: 'Tatar' },
  { code: 'te', label: 'Telugu' },
  { code: 'th', label: 'Thai' },
  { code: 'tr', label: 'Turkish' },
  { code: 'tk', label: 'Turkmen' },
  { code: 'uk', label: 'Ukrainian' },
  { code: 'ur', label: 'Urdu' },
  { code: 'ug', label: 'Uyghur' },
  { code: 'uz', label: 'Uzbek' },
  { code: 'vi', label: 'Vietnamese' },
  { code: 'cy', label: 'Welsh' },
  { code: 'xh', label: 'Xhosa' },
  { code: 'yi', label: 'Yiddish' },
  { code: 'yo', label: 'Yoruba' },
  { code: 'zu', label: 'Zulu' },
];

function getCurrentTranslateLabel() {
  if (typeof document === 'undefined') return 'Language';
  const match = document.cookie.match(/googtrans=([^;]+)/);
  const value = match ? match[1] : '';
  const target = value.split('/').pop();
  if (!target || target === 'en') return 'English';
  const found = translateLanguages.find((l) => l.code === target);
  return found ? found.label : 'Language';
}

export default function Navbar() {
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [translateOpen, setTranslateOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(() => getCurrentTranslateLabel());
  const [token, setToken] = useState(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || 'user');
  const [hasInquiry, setHasInquiry] = useState(() => localStorage.getItem('hasInquiry') === 'true');
  const [headerTop, setHeaderTop] = useState(40); // pehli paint pe top bar ke neeche; effect se update
  const [spacerHeight, setSpacerHeight] = useState(74); // top bar + header approx, content navbar ke saath
  const showDashboard = isSuperAdmin || userRole === 'admin';

  useEffect(() => setCurrentLang(getCurrentTranslateLabel()), []);

  // White navbar fixed: upar wala top bar scroll ke sath chale, navbar fixed rahey (scroll pe top 0)
  useEffect(() => {
    const topEl = document.getElementById('navbar-top-bar');
    const headerEl = document.getElementById('navbar-header');
    if (!topEl || !headerEl) return;
    const update = () => {
      const topH = topEl.offsetHeight;
      const headerH = headerEl.offsetHeight;
      setHeaderTop(Math.min(topH, Math.max(0, topH - window.scrollY)));
      /* Content navbar ke bilkul saath – extra gap hatao */
      setSpacerHeight(Math.max(0, topH + headerH - 22));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(topEl);
    ro.observe(headerEl);
    return () => {
      window.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const updateAuth = () => {
      setToken(localStorage.getItem('token'));
      setIsSuperAdmin(localStorage.getItem('isSuperAdmin') === 'true');
      setUserRole(localStorage.getItem('userRole') || 'user');
      setHasInquiry(localStorage.getItem('hasInquiry') === 'true');
    };
    updateAuth();
    window.addEventListener('storage', updateAuth);
    window.addEventListener('auth-change', updateAuth);
    window.addEventListener('inquiry-change', updateAuth);
    return () => {
      window.removeEventListener('storage', updateAuth);
      window.removeEventListener('auth-change', updateAuth);
      window.removeEventListener('inquiry-change', updateAuth);
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

  const selectLanguage = (code) => {
    setTranslateOpen(false);
    if (code === 'en') {
      document.cookie = 'googtrans=; path=/; max-age=0';
    } else {
      document.cookie = `googtrans=/en/${code}; path=/`;
    }
    window.location.reload();
  };

  return (
    <>
      {/* Top Bar - scroll ke sath chalta hai; iske neeche wala white navbar fixed rehta hai */}
      <div id="navbar-top-bar" className="bg-primary-dark text-white py-1.5 text-sm">
        <div className="max-w-container mx-auto px-5 flex flex-wrap items-center justify-center md:justify-between gap-4">
          {/* Translator - box ke andar; button click pe Google dropdown open */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setTranslateOpen((o) => !o)}
              className="translate-box translate-trigger-btn flex items-center gap-2"
              aria-label="Select language"
              aria-expanded={translateOpen}
            >
              <span>{currentLang}</span>
              <HiChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${translateOpen ? 'rotate-180' : ''}`} />
            </button>
            <div id="google_translate_element" className="hidden" aria-hidden="true" />
            {translateOpen && (
              <>
                <div className="fixed inset-0 z-[9998]" aria-hidden="true" onClick={() => setTranslateOpen(false)} />
                <div className="absolute top-full left-0 mt-1 z-[9999] min-w-[180px] bg-white rounded-lg border border-gray-200 shadow-lg py-1 language-dropdown-scroll">
                  {translateLanguages.map(({ code, label }) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => selectLanguage(code)}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors ${currentLang === label ? 'bg-primary/10 text-primary font-medium' : 'text-gray-800'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="mailto:babulquranacademy1@gmail.com" className="flex items-center gap-1.5 hover:opacity-90 transition-opacity">
              <HiMail className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">babulquranacademy1@gmail.com</span>
            </a>
            <a href="tel:+923124810000" className="flex items-center gap-1.5 hover:opacity-90 transition-opacity">
              <HiPhone className="w-4 h-4 flex-shrink-0" />
              +923124810000
            </a>
          </div>
        </div>
      </div>

      {/* Header - fixed; scroll nahi hota, sirf top bar scroll hota hai */}
      <header id="navbar-header" className="bg-white shadow-md fixed left-0 right-0 z-50 transition-[top] duration-150" style={{ top: headerTop }}>
        <div className="max-w-container mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
            <button
              type="button"
              className="p-2.5 rounded-lg hover:bg-bg-alt border border-gray-200 transition-colors flex-shrink-0"
              onClick={() => setLeftMenuOpen(true)}
              aria-label="Open menu"
            >
              <HiMenu className="w-6 h-6 text-gray-700" />
            </button>
            <Link to="/" className="hidden md:inline-block text-xl font-bold text-primary whitespace-nowrap hover:text-primary-dark transition-colors">
              Babul Quran
            </Link>
          </div>

          <nav className="hidden md:flex flex-1 items-center justify-center gap-1 min-w-0">
            <Link to="/" className="px-4 py-2.5 rounded-lg hover:bg-bg-alt hover:text-primary font-medium text-gray-800 transition-colors flex items-center gap-1.5">
              <HiHome className="w-4 h-4" /> Home
            </Link>
            <Link to="/about" className="px-4 py-2.5 rounded-lg hover:bg-bg-alt hover:text-primary font-medium text-gray-800 transition-colors">
              About Us
            </Link>
            <Link to="/#courses" className="px-4 py-2.5 rounded-lg hover:bg-bg-alt hover:text-primary font-medium text-gray-800 transition-colors flex items-center gap-1.5">
              <HiAcademicCap className="w-4 h-4" /> Courses
            </Link>
            {token && showDashboard && (
              <Link to="/dashboard" className="px-4 py-2.5 rounded-lg hover:bg-bg-alt hover:text-primary font-medium text-gray-800 transition-colors">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Mobile: logo in flex middle so it doesn't overlap the button */}
          <div className="flex-1 min-w-0 flex justify-center md:hidden overflow-hidden">
            <Link to="/" className="text-base font-bold text-primary whitespace-nowrap hover:text-primary-dark transition-colors truncate">
              Babul Quran
            </Link>
          </div>

          <div className="flex items-center gap-2 min-w-0 flex-shrink-0">
            {token ? (
              <>
                <Link to="/profile" className="hidden md:flex p-2.5 rounded-full hover:bg-bg-alt hover:text-primary text-gray-700 transition-colors border border-gray-200" aria-label="Profile">
                  <HiUser className="w-5 h-5" />
                </Link>
                <Button to={hasInquiry ? '/contact?source=enrollment' : '/contact?source=free_trial'} variant="free" className="inline-flex text-xs px-3 py-1.5 md:text-sm md:px-5 md:py-2.5">
                  {hasInquiry ? 'Get Admission' : 'Free Trial'}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1.5 text-sm rounded-lg hover:bg-bg-alt hover:text-primary font-medium text-gray-800 transition-colors border border-gray-200 md:px-4 md:py-2.5">
                  Login
                </Link>
                <Button to="/contact?source=free_trial" variant="free" className="hidden md:inline-flex md:text-sm md:px-5 md:py-2.5">
                  FREE TRIAL
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Spacer: fixed header flow mein space nahi leta, isliye content neeche rahey */}
      <div aria-hidden="true" style={{ height: spacerHeight }} />

      {/* Mobile: fixed bottom nav – Home, About Us, Courses + Profile (when logged in) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around h-14 px-1">
          {mobileBottomNavItems.map(({ to, label, Icon }) => (
            <Link
              key={label}
              to={to}
              className="flex flex-col items-center justify-center flex-1 min-w-0 py-2 text-gray-500 hover:text-primary active:text-primary transition-colors"
              title={label}
              aria-label={label}
            >
              <Icon className="w-6 h-6 flex-shrink-0" />
            </Link>
          ))}
          {token && (
            <Link
              to="/profile"
              className="flex flex-col items-center justify-center flex-1 min-w-0 py-2 text-gray-500 hover:text-primary active:text-primary transition-colors"
              title="Profile"
              aria-label="Profile"
            >
              <HiUser className="w-6 h-6 flex-shrink-0" />
            </Link>
          )}
        </div>
      </nav>

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
                    {showDashboard && (
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
