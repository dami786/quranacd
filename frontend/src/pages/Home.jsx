import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaMoneyBillWave, FaTag, FaChalkboardTeacher, FaBook, FaAward, FaWhatsapp, FaQuestionCircle, FaHandHoldingHeart, FaMosque, FaChild, FaComments } from 'react-icons/fa';
import Hero from '../components/Hero';
import StepsSection from '../components/StepsSection';
import Cards from '../components/Cards';
import { Button } from '../components/Buttons';
import { getItems } from '../services/api';

const featureIcons = [
  { Icon: FaClock, iconLabel: 'Schedule' },
  { Icon: FaMoneyBillWave, iconLabel: 'Money back' },
  { Icon: FaTag, iconLabel: 'Affordable' },
  { Icon: FaChalkboardTeacher, iconLabel: 'Teachers' },
  { Icon: FaBook, iconLabel: 'Curriculum' },
  { Icon: FaAward, iconLabel: 'Certificate' },
];

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const faqAnswers = {
    'courses': 'We offer Noorani Qaida, Quran recitation, Tajweed, Tafseer, Memorization and Islamic Studies. All details and trial form are on the Courses and Contact pages.',
    'trial': 'You get 3 days of free one-to-one online Quran classes. Just fill the Contact form or WhatsApp us and we will schedule your trial.',
    'fee': 'Our standard fee is USD $30 per month for one-to-one classes (30 minutes, four classes per month).',
    'contact': 'You can contact us via the Contact page form, email pakquranteaching@gmail.com or WhatsApp +92 312 4810000.',
  };

  const askBot = (type) => {
    const questionMap = {
      courses: 'What courses do you offer?',
      trial: 'How does the free trial work?',
      fee: 'What is the monthly fee?',
      contact: 'How can I contact you?',
    };
    const key = type;
    const q = questionMap[key];
    const a = faqAnswers[key];
    if (!q || !a) return;
    setChatMessages((prev) => [
      ...prev,
      { from: 'user', text: q },
      { from: 'bot', text: a },
    ]);
  };

  useEffect(() => {
    let cancelled = false;
    getItems()
      .then((res) => {
        if (!cancelled) setItems(res.data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.response?.data?.message || 'Failed to load courses.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <Hero />
      {/* Learn Quran Online - 3 Steps (same as reference) */}
      <StepsSection />
      {/* CTA Banner (Islamic pattern bg + left image from Pexels) */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-12 md:py-16 overflow-hidden">
        {/* Islamic-style pattern: diagonal stripes + subtle geometric grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                135deg,
                rgba(255,255,255,0.08) 0px,
                rgba(255,255,255,0.08) 12px,
                transparent 12px,
                transparent 24px
              )
            `,
            backgroundSize: '24px 24px',
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='0.3' stroke-width='1'%3E%3Cpath d='M20 2l8 8-8 8-8-8zM0 20l8 8-8 8-8-8zM40 20l8 8-8 8-8-8z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-container mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            {/* Left - Quran image (Pexels free) */}
            <div className="flex justify-center md:justify-start">
              <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl border border-white/20 ring-2 ring-white/10">
                <img
                  src="https://images.pexels.com/photos/16150270/pexels-photo-16150270.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Child reading Quran"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            </div>
            {/* Right text */}
            <div className="text-center md:text-left">
              <h2 className="text-lg md:text-xl font-semibold mb-3">
                EXPERIENCE COMPLIMENTARY ONLINE QURAN CLASSES AT NO COST
              </h2>
              <p className="max-w-xl md:max-w-none mb-2 opacity-95">
                Avail our Complimentary Trial Classes by Completing the Form to Learn Quran Online.
                Experience the Three-Day Free Trial Offer from <strong>Pak Quran Academy</strong>. Enroll Now!
              </p>
              <p className="font-semibold mb-5">3 Days Free Trial</p>
              <Button to="/contact" variant="light">
                Book Free Trial Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose Pak Quran Academy - redesigned */}
      <section id="about" className="py-16 md:py-20 bg-bg-alt overflow-hidden">
        <div className="max-w-container mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3 animate-fade-in-up">Why Choose Us</span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up animate-delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
              Why Choose Pak Quran Academy?
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-4 animate-fade-in-up animate-delay-200 opacity-0" style={{ animationFillMode: 'forwards' }} />
            <p className="text-gray-600 text-base md:text-lg animate-fade-in-up animate-delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>
              Our Competitive Features
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: 'Flexible Schedule 24/7', text: 'Our dedicated team ensures 24/7 availability of our online Quran teachers. Engage in online Quran classes conveniently, regardless of your location.' },
              { title: 'Money Back Guarantee', text: 'If you are dissatisfied with our instructors during your one-month online Quran classes, we offer a refund option to return your payment.' },
              { title: 'Affordable Tuition Fee', text: 'Our range of services is designed to be highly competitive. We offer special discounts on family packages and reduced rates for those in need.' },
              { title: 'Qualified Quran Teachers', text: 'Our team of male and female teachers are highly skilled experts who have undergone rigorous training and certification.' },
              { title: 'Authentic & Suitable Curriculum', text: 'Our educational framework emphasizes the fundamental principles of Islamic teachings with a well-structured curriculum.' },
              { title: 'Certificate of Appraisal', text: 'We grant a certificate of achievement to all students upon the successful culmination of their course.' },
            ].map(({ title, text }, idx) => {
              const { Icon } = featureIcons[idx] || featureIcons[0];
              return (
                <div
                  key={title}
                  className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 opacity-0 animate-fade-in-up relative overflow-hidden"
                  style={{ animationDelay: `${150 + idx * 80}ms`, animationFillMode: 'forwards' }}
                >
                  {/* Top accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary-dark/15 text-primary flex items-center justify-center group-hover:from-primary group-hover:to-primary-dark group-hover:text-white transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">{text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Courses from API */}
      <section id="courses" className="py-14 md:py-16 bg-white">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-3 animate-fade-in-up">
            We Offer Various Courses to Learn Quran Online
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
            Our mission is to provide convenient Quranic education to individuals from all walks of life.
          </p>
          <Cards items={items} loading={loading} error={error} />
        </div>
      </section>
      {/* Reasons to Hire Us - image + text (jaise screenshot) */}
      <section className="py-16 bg-white">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 animate-fade-in-up">
            Reasons to <span className="text-primary">Hire Us?</span>
          </h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            {/* Left: Quran-related image (local) */}
            <div className="opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
              <div className="rounded-3xl overflow-hidden shadow-card border border-gray-200">
                <img
                  src="/images/image.png"
                  alt="Quran learning illustration"
                  className="w-full h-full max-h-[340px] object-cover"
                />
              </div>
            </div>
            {/* Right: content (sirf pehla paragraph image ke saath row mein) - bara paragraph */}
            <div className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed opacity-0 animate-fade-in-up animate-delay-150" style={{ animationFillMode: 'forwards' }}>
              <p>
                At Pak Quran Academy, we take pride in our team of highly qualified and experienced teachers. They are
                dedicated to providing you with personalized guidance and support on your Quranic journey. We understand
                that everyone has different commitments. That&apos;s why we offer flexible learning options for the
                students. Whether you&apos;re a working professional, a student, or a busy parent, you can choose the time
                that suits you best. Our <strong>online Quran classes</strong> are available seven days a week, allowing you
                to learn at your convenience.
              </p>
            </div>
          </div>
          {/* Neeche image ke baad content - image ki alignment (max-w-5xl) se, thora gap */}
          <div className="mt-8 max-w-5xl mx-auto space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
            <p>
              We emphasize the importance of Tajweed in our online Quran classes. Our expert teachers will guide you step
              by step, helping you master the rules of Tajweed and enhance your recitation skills. At the heart of our
              mission is safeguarding our students&apos; well-being and ensuring their privacy. Our online Quran classes are
              conducted in a secure and private setting. We offer competitive and affordable pricing plans without
              compromising on the quality of teaching. Invest in your spiritual growth without breaking the bank.
            </p>
            <p>
              All our classes are <strong>one-to-one</strong>, so you get the full attention of your teacher. We also offer
              a <strong>3-day free trial</strong> with no payment or credit card required—you can experience our teaching
              style and schedule before committing. For families, we have special discounts on multiple enrollments. Our
              curriculum is structured for beginners to advanced learners, including Noorani Qaida, Quran recitation,
              Tajweed, Tafseer, and memorization. Upon completion, students receive a <strong>certificate of achievement</strong> from
              Pak Quran Academy.
            </p>
            <p>
              We serve students across the USA and worldwide. Our teachers are available in flexible time slots to match
              your time zone. If you are not satisfied within the first month, we offer a <strong>money-back guarantee</strong>.
              Join thousands of learners who have chosen Pak Quran Academy for their Quranic education—start your journey
              today with a free trial.
            </p>
          </div>
        </div>
      </section>
      {/* Teachers - bg image + overlay */}
      <section id="teachers" className="py-14 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/image.png)' }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-bg-alt/85" aria-hidden />
        <div className="relative z-10 max-w-container mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 animate-fade-in-up flex items-center justify-center gap-2">
            <FaChalkboardTeacher className="w-8 h-8 text-primary" /> Meet Our Inspiring Online Quran Teacher Experts
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-4">
            Discover a profound connection with the Quran through our dedicated Online Quran Teacher experts.
            Our instructors are committed to nurturing your spiritual growth.
          </p>
          <p className="max-w-2xl mx-auto text-gray-600 mb-6 bg-white p-4 rounded-lg border-l-4 border-primary">
            <strong>Four Classes per Month – Steady Progress, Lasting Impact</strong>
            <br />
            Consistency is the key to success. With four classes scheduled per month, you'll experience steady advancement.
          </p>
          <Button to="/contact" variant="primary">
            Join Us Today
          </Button>
        </div>
      </section>
      {/* Price */}
      <section id="fee" className="py-12 bg-white text-center">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
            USD $30.00 Only/Month – Affordability without Compromise
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            We offer this exclusive learning opportunity at an <strong>unbelievably affordable rate</strong> of
            USD $30.00 per month. One-to-one learning with 30-minute classes, four times a month.
          </p>
        </div>
      </section>
      {/* Zakat & Donation - Madrasa bachon / Mosque building */}
      <section id="zakat-donation" className="py-14 md:py-16 bg-bg-alt">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2 animate-fade-in-up flex items-center justify-center gap-2 flex-wrap">
            <FaHandHoldingHeart className="w-8 h-8 text-primary" /> Zakat & Donation
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
            Fulfill your Zakat and Sadaqah by supporting Islamic education and masjid development. Your contribution helps madrasa children and mosque building.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            <div
              className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 opacity-0 animate-fade-in-up flex flex-col items-center text-center"
              style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <FaChild className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Madrasa Children</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Support underprivileged children in madrasas with books, food, and quality Quranic education. Your Zakat and donations help them learn and grow.
              </p>
              <Button to="/contact" variant="primary" className="inline-flex items-center gap-2 w-full max-w-[200px] justify-center">
                Donate for Madrasa
              </Button>
            </div>
            <div
              className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 opacity-0 animate-fade-in-up flex flex-col items-center text-center"
              style={{ animationDelay: '280ms', animationFillMode: 'forwards' }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <FaMosque className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Mosque Building</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Contribute towards mosque construction, renovation, or maintenance. Your Sadaqah Jariyah helps build and sustain houses of Allah.
              </p>
              <Button to="/contact" variant="primary" className="inline-flex items-center gap-2 w-full max-w-[200px] justify-center">
                Donate for Mosque
              </Button>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6 animate-fade-in-up animate-delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>
            Contact us to specify your intention (Zakat / Sadaqah) and we will guide you through a secure process.
          </p>
        </div>
      </section>
      {/* CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-12 text-center">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-lg md:text-xl font-semibold mb-3 animate-fade-in-up flex items-center justify-center gap-2">
            <FaAward className="w-6 h-6" /> Claim Your FREE Online Quran Class Trial Today
          </h2>
          <p className="max-w-2xl mx-auto mb-6 opacity-95">
            We are offering a free online Quran class. Delve into a personalized one-to-one, 30-minute class,
            tailored to your level and goals, all at absolutely no cost!
          </p>
          <Button to="/contact" variant="light">
            Quick Admission
          </Button>
        </div>
      </section>
      {/* FAQ */}
      <section className="py-14 bg-bg-alt">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10 animate-fade-in-up flex items-center justify-center gap-2">
            <FaQuestionCircle className="w-8 h-8 text-primary" /> Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {[
              { q: 'Who can enroll in "Learn Quran Online" courses?', a: 'Everyone can enroll in our courses, from kids to adults who are willing to learn Quran online.' },
              { q: 'Is there a trial period available?', a: 'Yes, we offer a trial period for interested students. It\'s an excellent opportunity to experience our online Quran classes and interact with our teachers.' },
              { q: 'Can I schedule classes according to my kid\'s availability?', a: 'Absolutely! We offer flexible online Quran classes for kids to accommodate your child\'s schedule and routines.' },
              { q: 'What is the duration of each class?', a: 'Generally, classes are scheduled for 30-minute or 60-minute sessions to accommodate various learning needs.' },
            ].map(({ q, a }, idx) => (
              <div key={q} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-300 opacity-0 animate-fade-in-up" style={{ animationDelay: `${100 + idx * 100}ms`, animationFillMode: 'forwards' }}>
                <h3 className="font-semibold text-gray-800 px-5 py-4 flex items-center gap-2">
                  <FaQuestionCircle className="w-4 h-4 text-primary flex-shrink-0" /> {q}
                </h3>
                <p className="text-gray-600 text-sm px-5 pb-4 pt-0 pl-11">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Chatbot widget - bottom right */}
      {chatOpen && (
        <div className="fixed bottom-20 right-6 w-80 max-w-[90vw] bg-white rounded-2xl shadow-card border border-gray-200 z-40 flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-primary text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaComments className="w-4 h-4" />
              <span className="font-semibold text-sm">Quran Academy Chatbot</span>
            </div>
            <button
              type="button"
              onClick={() => setChatOpen(false)}
              className="text-white/80 hover:text-white text-sm"
            >
              ✕
            </button>
          </div>
          <div className="px-4 py-3 space-y-2 text-xs text-gray-700 max-h-64 overflow-y-auto">
            {chatMessages.length === 0 && (
              <p className="text-gray-600">
                Ask anything about our academy, courses, fee or free trial. Select a quick question below to begin.
              </p>
            )}
            {chatMessages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-3 py-2 rounded-xl max-w-[80%] ${
                    m.from === 'user'
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 pb-3 pt-2 border-t border-gray-100">
            <p className="text-[11px] text-gray-500 mb-1">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => askBot('courses')}
                className="px-2 py-1 rounded-full bg-bg-alt text-xs text-gray-800 hover:bg-primary hover:text-white transition-colors"
              >
                Courses
              </button>
              <button
                type="button"
                onClick={() => askBot('trial')}
                className="px-2 py-1 rounded-full bg-bg-alt text-xs text-gray-800 hover:bg-primary hover:text-white transition-colors"
              >
                Free Trial
              </button>
              <button
                type="button"
                onClick={() => askBot('fee')}
                className="px-2 py-1 rounded-full bg-bg-alt text-xs text-gray-800 hover:bg-primary hover:text-white transition-colors"
              >
                Fee
              </button>
              <button
                type="button"
                onClick={() => askBot('contact')}
                className="px-2 py-1 rounded-full bg-bg-alt text-xs text-gray-800 hover:bg-primary hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      )}
      {/* WhatsApp float - left bottom */}
      <a
        href="https://wa.me/923124810000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-card flex items-center gap-2 font-semibold z-40 transition-all hover:scale-105 hover:shadow-card-hover"
        aria-label="WhatsApp"
      >
        <FaWhatsapp className="w-5 h-5" /> WhatsApp us
      </a>
      {/* Chatbot toggle button - bottom right */}
      <button
        type="button"
        onClick={() => setChatOpen((o) => !o)}
        className="fixed bottom-6 right-6 bg-primary text-white px-4 py-3 rounded-full shadow-card flex items-center gap-2 font-semibold z-40 transition-all hover:bg-primary-dark hover:scale-105 hover:shadow-card-hover"
        aria-label="Open chatbot"
      >
        <FaComments className="w-5 h-5" /> Chat with us
      </button>
    </>
  );
}
