import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';
import { Card, Input, Button } from '../components';

export default function Register() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', formData);
      setAuth(data.user, data.token);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50">
      <Card className="w-full max-w-md" padding="lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            required
            icon={<User className="w-5 h-5" />}
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
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
          <Input
            label="Phone (Optional)"
            type="tel"
            icon={<Phone className="w-5 h-5" />}
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <Button type="submit" fullWidth size="lg" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
        </p>
      </Card>
    </div>
  );
}
