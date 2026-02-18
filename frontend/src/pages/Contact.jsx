import { useState } from 'react';
import { FaPaperPlane, FaEnvelope } from 'react-icons/fa';
import { Input, Textarea, Select } from '../components/Forms';
import { Button } from '../components/Buttons';

const courseOptions = [
  'Select Course',
  'Noorani Qaida',
  'Recite Quran',
  'Quran with Tajweed',
  'Quran with Tafseer',
  'Quran Memorization',
  'Islamic Studies',
];

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);
    // In a full implementation, you would send to backend API
    setTimeout(() => {
      setMessage({ type: 'success', text: 'Thank you! Your inquiry has been received. We will contact you soon for your free trial.' });
      e.target.reset();
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-14 md:py-16 max-w-container mx-auto px-5">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 text-center animate-fade-in-up flex items-center justify-center gap-2">
          <FaEnvelope className="w-9 h-9 text-primary" /> Get in Touch
        </h1>
        <p className="text-gray-600 text-center max-w-xl mx-auto mb-10 animate-fade-in-up animate-delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
          Send Inquiry – Experience the convenience of learning Quran online. Complete the form and our team will assist you in scheduling your trial classes.
        </p>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Your Name" name="name" required placeholder="Your name" />
            <Input label="Your Email" name="email" type="email" required placeholder="your@email.com" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Phone / WhatsApp" name="phone" type="tel" placeholder="+92 312 4810000" />
            <Select
              label="Select Course"
              name="course"
              options={courseOptions}
            />
          </div>
          <Textarea label="Your Message" name="message" rows={4} placeholder="Your message..." />
          {message.text && (
            <p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
              {message.text}
            </p>
          )}
          <Button type="submit" variant="primary" className="w-full inline-flex items-center justify-center gap-2" disabled={loading}>
            <FaPaperPlane className="w-4 h-4" /> {loading ? 'Sending...' : 'Send Inquiry / Start Free Trial'}
          </Button>
        </form>
      </section>
    </div>
  );
}
