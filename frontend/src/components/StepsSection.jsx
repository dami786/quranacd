import { Link } from 'react-router-dom';
import { FaFileAlt, FaLaptop, FaMosque } from 'react-icons/fa';

const steps = [
  {
    step: 'Step 1',
    title: 'Send Inquiry',
    description:
      'Experience the Convenience of Learning Quran Online with our Exceptional Quran Teachers! Simply complete the form, and let our dedicated team assist you in scheduling your trial classes.',
    cta: 'Send Inquiry',
    Icon: FaFileAlt,
  },
  {
    step: 'Step 2',
    title: 'Free Trial Online',
    description:
      'Check Your Schedule Upon Enrolling and Join Engaging Free Online Quran Classes for Three Days, No Payment or Credit Card Required!',
    cta: 'Start Trial',
    Icon: FaLaptop,
  },
  {
    step: 'Step 3',
    title: 'Get Quick Admission',
    description:
      'Satisfied with our free trial classes? If yes, then Secure your spot for our permanent classes by choosing a convenient monthly plan that suits you best.',
    cta: 'Quick Admission',
    Icon: FaMosque,
  },
];

export default function StepsSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-container mx-auto px-5">
        {/* Heading - Learn Quran Online & Babul Quran (website green) */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6 text-gray-800 animate-fade-in-up">
          <span className="text-primary">Learn Quran Online</span>
          {' with '}
          <span className="text-primary">Babul Quran</span>
          {' in the USA'}
        </h2>
        {/* Paragraph - centered, justified */}
        <p className="max-w-3xl mx-auto text-center text-gray-600 text-base md:text-lg leading-relaxed mb-12 text-justify animate-fade-in-up animate-delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
          Are you looking for a convenient and effective way to <strong className="text-gray-800">Learn Quran Online</strong>? Babul Quran is here to provide you with an exceptional online Quran learning experience. We understand the importance of accessing quality Islamic education, regardless of your location. That's why we offer comprehensive online Quran courses tailored to meet the needs of learners in the USA.
        </p>
        {/* 3 Step Cards – same hover as Why Choose Babul Quran: accent line, shadow, icon gradient, title color */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map(({ step, title, description, cta, Icon }, idx) => (
            <div
              key={step}
              className="group bg-white rounded-2xl p-6 md:p-8 flex flex-col items-center text-center shadow-sm border border-gray-100 opacity-0 animate-fade-in-up relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1"
              style={{ animationDelay: `${100 + idx * 120}ms`, animationFillMode: 'forwards' }}
            >
              {/* Top accent line on hover – same as Why Choose section */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-primary bg-gradient-to-br from-primary/15 to-primary-dark/15 group-hover:from-primary group-hover:to-primary-dark group-hover:text-white transition-all duration-300">
                <Icon className="w-7 h-7" />
              </div>
              <span className="text-gray-800 font-bold text-sm uppercase tracking-wide mb-2">{step}</span>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{description}</p>
              <Link
                to={cta === 'Quick Admission' ? '/contact?source=enrollment' : '/contact'}
                className="inline-block w-full max-w-[200px] py-3 px-5 rounded-lg font-semibold text-white text-center bg-primary-dark hover:bg-primary transition-colors duration-300"
              >
                {cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
