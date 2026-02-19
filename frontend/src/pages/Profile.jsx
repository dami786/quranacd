import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiLogout, HiAcademicCap, HiBookOpen, HiMail } from 'react-icons/hi';
import { Button } from '../components/Buttons';
import Seo from '../components/Seo';
import { getProfile, getMyTrial } from '../services/api';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    getProfile()
      .then((res) => {
        setUser(res.data);
        localStorage.setItem('isSuperAdmin', res.data.isSuperAdmin ? 'true' : 'false');
        window.dispatchEvent(new Event('auth-change'));
        return getMyTrial();
      })
      .then((res) => {
        if (res?.data) {
          setInquiry(res.data);
          localStorage.setItem('hasInquiry', 'true');
        } else {
          localStorage.setItem('hasInquiry', 'false');
        }
        window.dispatchEvent(new Event('inquiry-change'));
      })
      .catch((err) => {
        if (err.response?.status === 404 && err.config?.url?.includes('trials/me')) {
          setInquiry(null);
          localStorage.setItem('hasInquiry', 'false');
          window.dispatchEvent(new Event('inquiry-change'));
          return;
        }
        setError(err.response?.status === 401 ? 'Not authenticated.' : 'Failed to load profile.');
        if (err.response?.status === 401) localStorage.removeItem('token');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isSuperAdmin');
    localStorage.removeItem('hasInquiry');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-alt flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-bg-alt flex items-center justify-center px-5">
        <div className="text-center max-w-md bg-white rounded-2xl shadow-card border border-gray-200 p-8">
          <p className="text-red-500 mb-4">{error || 'Not authenticated.'}</p>
          <Button to="/login" variant="primary">Go to Login</Button>
        </div>
      </div>
    );
  }

  const isSuperAdmin = user.isSuperAdmin === true;
  const initial = (user.name || user.email || 'U').charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-bg-alt pb-14">
      <Seo title="My Profile" description="Your Babul Quran profile. View your account and enrollment status." />
      {/* Profile header – avatar + name */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white py-12 md:py-16">
        <div className="max-w-container mx-auto px-5">
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-bold border-4 border-white/40 shadow-lg mb-4">
              {initial}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{user.name}</h1>
            <p className="text-white/90 flex items-center gap-2">
              <HiMail className="w-4 h-4" /> {user.email}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-5 -mt-6 relative z-10">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Quick actions card */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-6 animate-fade-in-up">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Account</h2>
            <div className="flex flex-wrap gap-3">
              {isSuperAdmin && (
                <Button to="/dashboard" variant="primary" className="inline-flex items-center gap-2">
                  <HiAcademicCap className="w-4 h-4" /> Dashboard
                </Button>
              )}
              <Button type="button" variant="danger" onClick={handleLogout} className="inline-flex items-center gap-2">
                <HiLogout className="w-4 h-4" /> Logout
              </Button>
            </div>
          </div>

          {/* Your Inquiry + Status */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-6 md:p-8 animate-fade-in-up opacity-0" style={{ animationDelay: '80ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <HiBookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Your Inquiry & Status</h2>
            </div>
            {inquiry ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-gray-600 text-sm font-medium">Status:</span>
                  <span className={`inline-block px-3 py-1.5 rounded-lg text-sm font-semibold ${
                    inquiry.status === 'pro' ? 'bg-green-100 text-green-800' :
                    inquiry.status === 'free_trial' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {inquiry.status === 'pro' ? 'Pro Plan' : inquiry.status === 'free_trial' ? 'Free Trial' : 'Pending'}
                  </span>
                </div>
                <dl className="grid gap-2 text-sm border-t border-gray-100 pt-4">
                  {inquiry.name && (
                    <div>
                      <dt className="text-gray-500 font-medium">Name (in inquiry)</dt>
                      <dd className="text-gray-800">{inquiry.name}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-gray-500 font-medium">Course</dt>
                    <dd className="text-gray-800">{inquiry.course || '–'}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 font-medium">Phone / WhatsApp</dt>
                    <dd className="text-gray-800">{inquiry.phone || '–'}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 font-medium">Message</dt>
                    <dd className="text-gray-800 whitespace-pre-wrap">{inquiry.message || '–'}</dd>
                  </div>
                  {inquiry.createdAt && (
                    <div>
                      <dt className="text-gray-500 font-medium">Submitted on</dt>
                      <dd className="text-gray-800">{new Date(inquiry.createdAt).toLocaleString()}</dd>
                    </div>
                  )}
                </dl>
                <p className="text-gray-600 text-sm pt-1">
                  {inquiry.status === 'pro' && 'You are on a Pro plan. Enjoy full access to courses.'}
                  {inquiry.status === 'free_trial' && (
                    <span className="inline-block mt-1 px-4 py-2.5 rounded-lg bg-primary/25 backdrop-blur-md border border-primary/40 text-primary-dark font-medium shadow-sm">
                      Your free trial is active. We will contact you for classes.
                    </span>
                  )}
                  {inquiry.status === 'pending' && 'Your inquiry is under review. We will get in touch soon.'}
                </p>
              </div>
            ) : (
              <p className="text-gray-600">
                No inquiry found for this account. Send an inquiry from the <Link to="/contact" className="text-primary font-semibold hover:underline">Contact page</Link> using the <strong>same email</strong> as this login ({user.email}) to see it here.
              </p>
            )}
          </div>

          {/* Enrolled Courses */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-6 md:p-8 animate-fade-in-up opacity-0" style={{ animationDelay: '160ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <HiAcademicCap className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Enrolled Courses</h2>
            </div>
            <p className="text-gray-600">
              No courses enrolled yet. Complete your enrollment to see your courses here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
