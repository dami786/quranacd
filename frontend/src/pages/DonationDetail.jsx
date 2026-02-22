import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Seo from '../components/Seo';
import { Input } from '../components/Forms';
import { Button } from '../components/Buttons';
import { FaChild, FaMosque, FaHandHoldingHeart } from 'react-icons/fa';
import { submitDonation } from '../services/api';

// Single-topic detail: 10–12 lines each. id must match URL :type (madrasa, mosque, fitrana).
const TOPICS = {
  madrasa: {
    title: 'Donate for Madrasa',
    Icon: FaChild,
    donateType: 'Donate for Madrasa',
    detail: [
      'Support Islamic education for children. Your donation helps run our madrasa and provides Quran and Islamic studies to students in a structured environment.',
      'Every contribution goes toward qualified teachers, books, and a safe learning space. We focus on Noorani Qaida, Nazra, Hifz, and basic Islamic knowledge so the next generation grows with the Quran.',
      'Running a madrasa requires consistent funds for utilities, materials, and teacher support. Your sadaqah and Zakat here are used only for this cause. We maintain transparency and will confirm receipt of your payment.',
      'May Allah reward you for supporting the Ummah’s future. Jazakallah khair.',
    ],
  },
  mosque: {
    title: 'Donate for Mosque',
    Icon: FaMosque,
    donateType: 'Donate for Mosque',
    detail: [
      'Contribute to mosque building and maintenance. Your sadaqah helps construct and upkeep places of worship where the community gathers for Salah and religious activities.',
      'Building a house of Allah is among the most rewarding deeds. Donations are used for construction, repairs, cleanliness, and facilities so that Muslims can pray in congregation and seek knowledge.',
      'We channel your contribution directly to masjid-related projects. You can specify whether you wish to support a particular project (e.g. building, maintenance, or general fund).',
      'May Allah accept your charity and grant you and your family barakah. Jazakallah khair.',
    ],
  },
  fitrana: {
    title: 'Fitrana & Sadaqa',
    Icon: FaHandHoldingHeart,
    donateType: 'Fitrana & Sadaqa',
    detail: [
      'Give Fitrana (Eid al-Fitr charity) and general Sadaqa. Fitrana is due before Eid prayer so that the needy can celebrate Eid with dignity. The amount is typically the value of one sa’a of staple food per person.',
      'You can also give voluntary sadaqah anytime—for the poor, students, masjid, or general relief. We distribute your charity to those in need with transparency and in line with Islamic guidelines.',
      'We accept Fitrana before Eid and use it to provide food or equivalent support to deserving families. General sadaqa is used for ongoing relief, education support, and community welfare.',
      'May Allah accept your intention and reward you in this life and the next. Jazakallah khair.',
    ],
  },
};

export default function DonationDetail() {
  const { type } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [donateType, setDonateType] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const topic = type ? TOPICS[type] : null;
  if (!topic) {
    return <Navigate to="/#zakat-donation" replace />;
  }
  const Icon = topic.Icon;

  const openForm = () => {
    setDonateType(DONATE_TYPE_OPTIONS[0]);
    setMessage({ type: '', text: '' });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name?.value?.trim();
    const phone = form.phone?.value?.trim();
    const amount = form.amount?.value?.trim();
    const selectedType = donateType || DONATE_TYPE_OPTIONS[0];
    if (!name || !phone || !amount) return;
    setMessage({ type: '', text: '' });
    setLoading(true);
    const receiptInput = form.receipt;
    const receiptFile = receiptInput?.files?.[0];
    const payload = new FormData();
    payload.append('name', name);
    payload.append('phone', phone);
    payload.append('amount', amount);
    payload.append('donateType', selectedType);
    if (receiptFile) payload.append('receipt', receiptFile);
    submitDonation(payload)
      .then(() => {
        setMessage({ type: 'success', text: 'Jazakallah! Your donation details have been received. Please send PKR ' + amount + ' to the EasyPaisa number below. We will confirm once received.' });
        form.reset();
        setDonateType(DONATE_TYPE_OPTIONS[0]);
        setTimeout(() => {
          setShowForm(false);
          setMessage({ type: '', text: '' });
        }, 2000);
      })
      .catch((err) => setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to submit. Please try again.' }))
      .finally(() => setLoading(false));
  };

  const DONATE_TYPE_OPTIONS = [
  'Donate in mosque/madrasah construction',
  'Donate for needy children',
  'Donate for another charity',
];
const refLabel = donateType || DONATE_TYPE_OPTIONS[0];

  return (
    <div className="min-h-screen bg-bg-alt">
      <Seo
        title={`${topic.title} | Zakat & Donation`}
        description={topic.detail[0]}
        canonicalPath={type ? `/donate/${type}` : undefined}
      />
      <section className="py-14 md:py-16 max-w-container mx-auto px-5">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Icon className="w-7 h-7" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{topic.title}</h1>
            </div>
            <div className="text-gray-600 leading-relaxed space-y-4">
              {topic.detail.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <Button
              type="button"
              variant="primary"
              className="mt-8 w-full sm:w-auto"
              onClick={openForm}
            >
              Donate Now
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Contact us to specify your intention (Zakat / Sadaqah) and we will guide you through a secure process.
          </p>
        </div>
      </section>

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in"
          onClick={() => { setShowForm(false); setMessage({ type: '', text: '' }); }}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Donation Form</h3>
              <button
                type="button"
                onClick={() => { setShowForm(false); setMessage({ type: '', text: '' }); }}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input label="Name" name="name" required placeholder="Your name" />
              <Input label="Phone Number" name="phone" type="tel" required placeholder="03XX XXXXXXX" />
              <Input label="Amount (PKR)" name="amount" type="number" min="1" required placeholder="e.g. 1000" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Donate for</label>
                <select
                  name="donateType"
                  value={donateType}
                  onChange={(e) => setDonateType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                >
                  {DONATE_TYPE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-gray-700">
                <p className="font-medium text-amber-800 mb-0.5">Payment receipt</p>
                <p>Make sure to attach or send the payment receipt here or to admin WhatsApp so we can confirm your donation.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attach receipt (optional)</label>
                <input
                  type="file"
                  name="receipt"
                  accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,image/*,application/pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium"
                />
              </div>
              <div className="rounded-lg bg-primary/10 border border-primary/30 p-4">
                <p className="text-sm font-medium text-gray-700 mb-1">EasyPaisa number:</p>
                <p className="text-xl font-bold text-primary">0312 4810000</p>
                <p className="text-xs text-gray-500 mt-1">
                  Send your amount to this number and mention &quot;{refLabel}&quot; in the reference.
                </p>
              </div>
              {message.text && (
                <p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</p>
              )}
              <div className="flex gap-2">
                <Button type="submit" variant="primary" className="flex-1 py-3" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
                <Button
                  type="button"
                  variant="light"
                  className="px-4 py-3 border border-gray-300"
                  onClick={() => { setShowForm(false); setMessage({ type: '', text: '' }); }}
                >
                  Close
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
