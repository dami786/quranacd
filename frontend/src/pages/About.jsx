import { Button } from '../components/Buttons';
import { FaMosque, FaHeart } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 md:py-20 max-w-container mx-auto px-5">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center animate-fade-in-up flex items-center justify-center gap-3">
          <FaMosque className="w-10 h-10 text-primary" /> About Babul Quran
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
        <div className="text-center mt-10 animate-fade-in-up animate-delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
          <Button to="/contact" variant="primary" className="inline-flex items-center gap-2">
            <FaHeart className="w-4 h-4" /> Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
}
