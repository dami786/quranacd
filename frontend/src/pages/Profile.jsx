import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiUser, HiLogout, HiAcademicCap, HiBookOpen } from 'react-icons/hi';
import { Button } from '../components/Buttons';
import { getProfile } from '../services/api';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
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
      })
      .catch(() => {
        setError('Failed to load profile.');
        localStorage.removeItem('token');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isSuperAdmin');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-alt flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-bg-alt flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Not authenticated.'}</p>
          <Button to="/login" variant="primary">Go to Login</Button>
        </div>
      </div>
    );
  }

  const isSuperAdmin = user.isSuperAdmin === true;

  return (
    <div className="min-h-screen bg-bg-alt py-14">
      <div className="max-w-container mx-auto px-5">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile card */}
          <div className="bg-white rounded-xl shadow-card border border-gray-200 p-8 animate-fade-in-up">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <HiUser className="w-7 h-7 text-primary" /> Profile
            </h1>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="text-gray-800 font-medium">{user.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="text-gray-800">{user.email}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {isSuperAdmin && (
                <Button to="/dashboard" variant="primary" className="inline-flex items-center gap-2">
                  <HiAcademicCap className="w-4 h-4" /> Dashboard
                </Button>
              )}
              <Button type="button" variant="outlinePrimary" onClick={handleLogout} className="inline-flex items-center gap-2">
                <HiLogout className="w-4 h-4" /> Logout
              </Button>
            </div>
          </div>

          {/* Current Plan */}
          <div className="bg-white rounded-xl shadow-card border border-gray-200 p-8 animate-fade-in-up animate-delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <HiBookOpen className="w-5 h-5 text-primary" /> Current Plan
            </h2>
            <p className="text-gray-600">
              No active plan yet. <Link to="/contact" className="text-primary font-medium hover:underline">Enroll now</Link> to get started with our courses.
            </p>
          </div>

          {/* Enrolled Courses */}
          <div className="bg-white rounded-xl shadow-card border border-gray-200 p-8 animate-fade-in-up animate-delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <HiAcademicCap className="w-5 h-5 text-primary" /> Enrolled Courses
            </h2>
            <p className="text-gray-600">
              No courses enrolled yet. Complete your enrollment to see your courses here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
