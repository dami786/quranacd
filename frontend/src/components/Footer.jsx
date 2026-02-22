import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaWhatsapp, FaEnvelope, FaBookOpen, FaMap, FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import { manualCourses } from '../data/courses';

const courseLinks = manualCourses.map((course, index) => ({
  to: `/details/${index}`,
  label: course.titleEn,
}));

const usefulLinks = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/', label: 'Sitemap' },
];

const otherLinks = [
  { to: '/contact?source=enrollment', label: 'Free Trial' },
  { to: '/donate/madrasa', label: 'Donate – Madrasa' },
  { to: '/donate/mosque', label: 'Donate – Mosque' },
  { to: '/donate/fitrana', label: 'Fitrana & Sadaqa' },
];

// Har 2 sec baad switch hone wale patterns (SVG data URLs)
const footerPatterns = [
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cpath fill='none' stroke='%2314b8a6' stroke-opacity='0.12' stroke-width='0.6' d='M0 32h64M32 0v64M4 4l56 56M60 4L4 60'/%3E%3Cpath fill='%230d9488' fill-opacity='0.06' d='M32 2l4 12 12 4-12 4-4 12-4-12-12-4 12-4z'/%3E%3C/svg%3E\")",
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='2' fill='%2314b8a6' fill-opacity='0.15'/%3E%3Ccircle cx='8' cy='8' r='1.5' fill='%230d9488' fill-opacity='0.12'/%3E%3Ccircle cx='56' cy='8' r='1.5' fill='%230d9488' fill-opacity='0.12'/%3E%3Ccircle cx='8' cy='56' r='1.5' fill='%230d9488' fill-opacity='0.12'/%3E%3Ccircle cx='56' cy='56' r='1.5' fill='%230d9488' fill-opacity='0.12'/%3E%3Cpath fill='none' stroke='%2314b8a6' stroke-opacity='0.08' d='M16 16l32 32M48 16L16 48'/%3E%3C/svg%3E\")",
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cpath fill='%2314b8a6' fill-opacity='0.06' d='M0 0l32 32L0 64h32L64 32 32 0H0z'/%3E%3Cpath fill='none' stroke='%230d9488' stroke-opacity='0.1' stroke-width='0.5' d='M32 0v64M0 32h64'/%3E%3C/svg%3E\")",
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cpath fill='none' stroke='%2314b8a6' stroke-opacity='0.1' stroke-width='0.8' d='M0 16h64M0 32h64M0 48h64M16 0v64M32 0v64M48 0v64'/%3E%3Cpath fill='%230d9488' fill-opacity='0.05' d='M8 8h16v16H8zM40 8h16v16H40zM8 40h16v16H8zM40 40h16v16H40z'/%3E%3C/svg%3E\")",
];

export default function Footer() {
  const [patternIndex, setPatternIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => {
      setPatternIndex((i) => (i + 1) % footerPatterns.length);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="footer-pattern relative bg-bg-dark text-gray-300 pt-12 pb-20 md:pb-6 rounded-t-2xl overflow-hidden">
      {/* Pattern layer – har 2 sec change */}
      <div
        className="absolute inset-0 pointer-events-none z-0 rounded-t-2xl transition-[background-image] duration-700"
        style={{
          backgroundImage: footerPatterns[patternIndex],
          backgroundSize: '64px 64px',
          animation: 'footer-pattern-move 25s linear infinite',
        }}
        aria-hidden
      />
      {/* Lightning-style glow overlay */}
      <div className="footer-glow absolute inset-0 pointer-events-none z-[0.5] rounded-t-2xl" aria-hidden />
      <div className="max-w-container mx-auto px-5 relative z-10">
        {/* Top row: About, Courses, Get in touch – 3 columns, space filled */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div className="opacity-0 animate-fade-in-up animate-delay-100" style={{ animationFillMode: 'forwards' }}>
            <h4 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
              <FaBookOpen className="text-primary-light" /> About
            </h4>
            <p className="text-sm leading-relaxed opacity-90 mb-4">
              At Babul Quran, we provide convenient and flexible online Quran classes for
              learners of all ages and backgrounds. Our tailored programs cater to individual needs.
            </p>
            <p className="text-white font-medium text-sm mb-3">Explore our social media accounts</p>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Facebook">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="YouTube">
                <FaYoutube className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Twitter">
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="opacity-0 animate-fade-in-up animate-delay-200" style={{ animationFillMode: 'forwards' }}>
            <h4 className="text-white font-semibold text-lg mb-3">Courses</h4>
            <ul className="space-y-2">
              {courseLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-primary-light transition-colors inline-flex items-center gap-2">
                    <span className="text-primary-light/70">→</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="opacity-0 animate-fade-in-up animate-delay-300" style={{ animationFillMode: 'forwards' }}>
            <h4 className="text-white font-semibold text-lg mb-3">Get in touch</h4>
            <p className="flex items-center gap-2 mb-2">
              <FaPhone className="w-4 h-4 text-primary-light flex-shrink-0" /> +923124810000
            </p>
            <p className="flex items-center gap-2 mb-2">
              <FaWhatsapp className="w-4 h-4 text-green-400 flex-shrink-0" /> +923124810000 (WhatsApp)
            </p>
            <a
              href="mailto:babulquranacademy1@gmail.com"
              className="flex items-center gap-2 hover:text-primary-light transition-colors"
            >
              <FaEnvelope className="w-4 h-4 text-primary-light flex-shrink-0" /> babulquranacademy1@gmail.com
            </a>
          </div>
        </div>
        {/* Useful Links & Other Links – niche, space fill */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-t border-white/10">
          <div>
            <h4 className="text-white font-semibold text-base mb-2">Useful Links</h4>
            <ul className="space-y-1.5">
              {usefulLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-gray-300 hover:text-primary-light transition-colors inline-flex items-center gap-2 text-sm">
                    <FaMap className="w-3 h-3 text-primary-light/80 flex-shrink-0" /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <h4 className="text-white font-semibold text-base mb-2">Other Links</h4>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
              {otherLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-gray-300 hover:text-primary-light transition-colors inline-flex items-center gap-2 text-sm">
                    <span className="text-primary-light/70">→</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 text-center text-sm opacity-80">
          Copyright © {new Date().getFullYear()} - with Babul Quran.
        </div>
        <p className="text-center text-xs opacity-70 mt-2 pb-2">Designed by AlphaDev</p>
      </div>
    </footer>
  );
}
