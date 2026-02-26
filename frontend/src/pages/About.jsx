import { Button } from '../components/Buttons';
import Seo from '../components/Seo';
import { FaMosque, FaHeart } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="About Us"
        description="Learn about Babul Quran – online Quran academy. Qualified teachers, flexible schedule, Noorani Qaida, Tajweed, Hifz. Quality Islamic education for all ages."
        canonicalPath="/about"
      />
      <section className="py-16 md:py-20 max-w-container mx-auto px-5">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-left md:text-center animate-fade-in-up flex flex-row items-start justify-start md:justify-center gap-2 md:gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/15 text-primary shrink-0 mt-0.5">
            <FaMosque className="w-6 h-6 md:w-7 md:h-7" />
          </span>
          <span>About Babul Quran</span>
        </h1>
        <div className="max-w-3xl mx-auto space-y-6 text-gray-600 leading-relaxed animate-fade-in-up animate-delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
          <p>
            At Babul Quran, we provide convenient and flexible online Quran classes for
            learners of all ages and backgrounds. Whether you are a beginner taking your first
            steps in Quranic studies or an advanced learner seeking to enhance your recitation
            skills, our tailored programs cater to individual needs.
          </p>
          <p>
            We understand the importance of accessing quality Islamic education, regardless of your
            location. That's why we offer comprehensive online Quran courses tailored to meet the
            needs of learners in the USA and around the world.
          </p>
          <p>
            Our educational framework emphasizes the fundamental principles of Islamic teachings,
            ensuring that our classes adhere to a well-structured curriculum. We provide
            comprehensive training programs for teachers, equipping them with pre-designed lessons
            that enhance the online Quran learning experience.
          </p>
        </div>
        <div className="mt-14 max-w-2xl mx-auto animate-fade-in-up animate-delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-md p-6 flex flex-col sm:flex-row items-center gap-6">
            <img
              src={`/images/${encodeURIComponent('WhatsApp Image 2026-02-26 at 10.00.24 PM.jpeg')}`}
              alt="Qari Abid – Founder of Babul Quran"
              className="w-44 h-44 sm:w-52 sm:h-52 rounded-xl object-cover shrink-0"
            />
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-primary uppercase tracking-wide mb-1">Founder</p>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Qari Abid</h2>
              <p className="text-gray-600 mt-2">Founder of Babul Quran Academy</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-10 animate-fade-in-up animate-delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>
          <Button to="/contact" variant="primary" className="inline-flex items-center gap-2">
            <FaHeart className="w-4 h-4" /> Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
}
