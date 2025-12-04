import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';
import { Card, Input, Button } from '../components';

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', formData);
      setAuth(data.user, data.token);
      toast.success('Login successful!');
      
      // Redirect admin users to admin panel
      if (data.user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50">
      <Card className="w-full max-w-md" padding="lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            required
            icon={<Mail className="w-5 h-5" />}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <Input
            label="Password"
            type="password"
            required
            icon={<Lock className="w-5 h-5" />}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <Button type="submit" fullWidth size="lg" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline font-medium">Sign up</Link>
        </p>
      </Card>
    </div>
  );
}
