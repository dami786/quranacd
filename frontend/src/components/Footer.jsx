import { Link } from 'react-router-dom';
import { FaPhone, FaWhatsapp, FaEnvelope, FaBookOpen, FaMap } from 'react-icons/fa';
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

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-gray-300 pt-12 pb-20 md:pb-6 rounded-t-2xl">
      <div className="max-w-container mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="opacity-0 animate-fade-in-up animate-delay-100" style={{ animationFillMode: 'forwards' }}>
            <h4 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
              <FaBookOpen className="text-primary-light" /> About
            </h4>
            <p className="text-sm leading-relaxed opacity-90">
              At Babul Quran, we provide convenient and flexible online Quran classes for
              learners of all ages and backgrounds. Our tailored programs cater to individual needs.
            </p>
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
            <h4 className="text-white font-semibold text-lg mb-3">Useful Links</h4>
            <ul className="space-y-2">
              {usefulLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-primary-light transition-colors inline-flex items-center gap-2">
                    <FaMap className="w-3.5 h-3.5 text-primary-light/80" /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="opacity-0 animate-fade-in-up animate-delay-400" style={{ animationFillMode: 'forwards' }}>
            <h4 className="text-white font-semibold text-lg mb-3">Get in touch</h4>
            <p className="flex items-center gap-2 mb-2">
              <FaPhone className="w-4 h-4 text-primary-light flex-shrink-0" /> +923124810000
            </p>
            <p className="flex items-center gap-2 mb-2">
              <FaWhatsapp className="w-4 h-4 text-green-400 flex-shrink-0" /> +923124810000 (WhatsApp)
            </p>
            <a
              href="mailto:pakquranteaching@gmail.com"
              className="flex items-center gap-2 hover:text-primary-light transition-colors"
            >
              <FaEnvelope className="w-4 h-4 text-primary-light flex-shrink-0" /> pakquranteaching@gmail.com
            </a>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 text-center text-sm opacity-80">
          Copyright © {new Date().getFullYear()} - with Babul Quran.
        </div>
      </div>
    </footer>
  );
}
