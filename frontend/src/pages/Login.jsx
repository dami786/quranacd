import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // useLocation add kiya
import Seo from '../components/Seo';
import { HiLogin } from 'react-icons/hi';
import { Input } from '../components/Forms';
import { Button } from '../components/Buttons';
import { loginUser, getMyTrial } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation(); // Location ko access karne ke liye
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Ye check karega ke user kahan se aaya tha, warna default '/profile' par bhej dega

  // Sirf pathname ki bajaye mukammal path (query string ke sath) lein
const from = location.state?.from ? (location.state.from.pathname + location.state.from.search) : '/profile';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser({ email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isSuperAdmin', res.data.isSuperAdmin ? 'true' : 'false');
        window.dispatchEvent(new Event('auth-change'));
        return getMyTrial();
      })
      .then((res) => {
        localStorage.setItem('hasInquiry', res?.data ? 'true' : 'false');
        window.dispatchEvent(new Event('inquiry-change'));
        // Wapas usi page par bhejo jahan se user aaya tha
        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (err.response?.status === 404 && err.config?.url?.includes('trials/me')) {
          localStorage.setItem('hasInquiry', 'false');
          window.dispatchEvent(new Event('inquiry-change'));
          navigate(from, { replace: true }); // Catch block mein bhi redirect logic add kiya
          return;
        }
        setError(err.response?.data?.message || 'Login failed.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-bg-alt flex items-center justify-center py-12 px-4">
      <Seo title="Login" description="Login to your Babul Quran account. Access your profile and course information." />
      <div className="w-full max-w-md bg-white rounded-xl shadow-card border border-gray-200 p-8 animate-scale-in">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center flex items-center justify-center gap-2">
          <HiLogin className="w-7 h-7 text-primary" /> Login
        </h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Sign in to your Babul Quran account
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" name="email" type="email" required placeholder="your@email.com" />
          <Input label="Password" name="password" type="password" required placeholder="••••••••" />
          <p className="text-sm text-right">
            <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
          </p>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}