import { useState, useEffect, useRef } from 'react';
import { Button } from './Buttons';

// Count-up: 0 se target tak animate (duration ms), ease-out
function CountUp({ target, suffix = '', duration = 1800 }) {
  const [value, setValue] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    startRef.current = performance.now();
    const step = (now) => {
      const start = startRef.current ?? now;
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2); // ease-out quad
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);

  return <>{value}{suffix}</>;
}

// Hero images from public/images (use 1920px+ wide for sharp display)
const statsCounter = [
  { target: 500, suffix: '+', label: 'Students', description: 'Students taught online.' },
  { target: 15, suffix: '+', label: 'Expert Teachers', description: 'Qualified Quran instructors.' },
  { target: 8, suffix: '', label: 'Courses', description: 'From Noorani Qaida to Tafseer.' },
  { target: 98, suffix: '%', label: 'Satisfaction', description: 'Families satisfied with our classes.' },
];

const slides = [
  {
    image: '/images/hero%202.jpg',
    sub: 'Learn the Quran, your way',
    title: "Discover your Own Path to Peace & Knowledge",
    tag: "Quran Learning Classes: We're the World's Best!",
  },
  {
    image: '/images/hero%204.jpg',
    sub: 'A Journey to the Heart of Islam',
    title: 'Learn with Dedication & Serenity',
    tag: 'Online Quran classes for children and families – start your free trial.',
  },
  {
    image: '/images/teacher.jpg',
    sub: 'One-to-One Online Classes',
    title: 'Learn with Qualified Quran Teachers',
    tag: 'Male and female instructors. Noorani Qaida, Tajweed, Hifz & Tafseer – at your pace.',
  },
  {
    image: '/images/gh.jpg',
    sub: 'From Home, Anywhere',
    title: 'Flexible Schedule, Steady Progress',
    tag: 'Study from home at times that suit your family. Join our online Quran classes and start your free 3-day trial today.',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[420px] max-h-[700px] overflow-hidden mt-3 pt-0">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background image – GPU layer + crisp scaling to reduce pixelation */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.image})`,
              filter: 'contrast(1.08) brightness(1.06)',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              imageRendering: 'auto',
            }}
          />
          {/* Gradient shade: teal/blue overlay – zyada visible, text readable */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background: 'linear-gradient(to bottom, rgba(15, 118, 110, 0.42) 0%, rgba(15, 118, 110, 0.58) 50%, rgba(19, 78, 74, 0.82) 100%)',
            }}
          />
          {/* Content – sab 4 slides: same layout – left text + right 4 cards (2x2) */}
          <div className="absolute inset-0 z-[2] flex flex-col md:flex-row items-center justify-center md:justify-between px-5 md:px-8 lg:px-12 text-white">
            <div className="flex flex-col items-center md:items-start max-w-3xl md:max-w-xl lg:max-w-2xl md:text-left text-center">
              <p className="text-sm uppercase tracking-wider mb-3 opacity-95 animate-fade-in-up">{slide.sub}</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight animate-fade-in-up animate-delay-100" style={{ animationFillMode: 'forwards' }}>{slide.title}</h1>
              <p className="text-base md:text-lg mb-6 md:mb-8 opacity-95 max-w-2xl animate-fade-in-up animate-delay-200" style={{ animationFillMode: 'forwards' }}>{slide.tag}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up animate-delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>
                <Button to="/contact" variant="primary">Register Now</Button>
                <Button to="/contact" variant="outline" className="hover:text-primary">Start Free Trial</Button>
              </div>
            </div>
            {/* Mobile: 4 cards 2x2 neeche */}
            <div className="md:hidden grid grid-cols-2 gap-2 w-full max-w-xs mx-auto mt-4">
              {statsCounter.map((stat) => (
                <div key={stat.label} className="hero-stat-card bg-white/95 backdrop-blur rounded-xl p-3 text-center border border-white/30 shadow-lg">
                  <p className="text-lg font-bold text-primary">
                    <CountUp target={stat.target} suffix={stat.suffix} duration={1800} />
                  </p>
                  <p className="font-bold text-gray-800 text-xs">{stat.label}</p>
                  <p className="text-gray-500 text-[10px] mt-0.5">{stat.description}</p>
                </div>
              ))}
            </div>
            {/* Desktop: 4 cards 2x2 right side – pehle slide jaisa */}
            <div className="hidden md:grid grid-cols-2 gap-2 lg:gap-3 w-full max-w-[280px] lg:max-w-[320px] md:flex-shrink-0">
              {statsCounter.map((stat, idx) => (
                <div key={stat.label} className="hero-stat-card bg-white/95 backdrop-blur rounded-xl p-3 lg:p-4 text-center border border-white/30 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${200 + idx * 80}ms`, animationFillMode: 'forwards' }}>
                  <p className="text-xl lg:text-2xl font-bold text-primary">
                    <CountUp target={stat.target} suffix={stat.suffix} duration={1800} />
                  </p>
                  <p className="font-bold text-gray-800 text-xs lg:text-sm">{stat.label}</p>
                  <p className="text-gray-500 text-[10px] lg:text-xs mt-1">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Slider dots - neeche (thoda aur bottom ke kareeb) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white scale-125 shadow-lg' : 'bg-white/60 hover:bg-white/80 hover:scale-110'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
