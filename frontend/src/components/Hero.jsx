import { useState, useEffect } from 'react';
import { Button } from './Buttons';

// Hero images from public/images (istockphoto)
const slides = [
  {
    image: '/images/istockphoto-1165713590-612x612.jpg',
    sub: 'Learn the Quran, your way',
    title: "Discover your Own Path to Peace & Knowledge",
    tag: "Quran Learning Classes: We're the World's Best!",
  },
  {
    image: '/images/istockphoto-1196261399-612x612.jpg',
    sub: 'The Quran: A Journey to the Heart of Islam',
    title: 'A Complete Online Quran Learning Experience',
    tag: 'Quran Learning Online: Classes for Everyone, Anywhere',
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
    <section className="relative h-[85vh] min-h-[420px] max-h-[700px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background image - clearer visibility */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.image})`,
              filter: 'contrast(1.08) brightness(1.06)',
            }}
          />
          {/* Gradient shade: upar halka, neeche thora dark – text readable, image bhi nazar aaye */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background: 'linear-gradient(to bottom, rgba(15, 118, 110, 0.25) 0%, rgba(15, 118, 110, 0.45) 50%, rgba(19, 78, 74, 0.7) 100%)',
            }}
          />
          {/* Content */}
          <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-5 text-center text-white">
            <p className="text-sm uppercase tracking-wider mb-3 opacity-95 animate-fade-in-up">
              {slide.sub}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight max-w-3xl animate-fade-in-up animate-delay-100" style={{ animationFillMode: 'forwards' }}>
              {slide.title}
            </h1>
            <p className="text-base md:text-lg mb-8 opacity-95 max-w-2xl animate-fade-in-up animate-delay-200" style={{ animationFillMode: 'forwards' }}>
              {slide.tag}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <Button to="/contact" variant="primary">
                Register Now
              </Button>
              <Button to="/contact" variant="outline" >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Slider dots - neeche */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
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
