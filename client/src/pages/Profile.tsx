import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';
import { Card, Input, Button, Tabs } from '../components';

export default function Profile() {
  const { user, setAuth } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put('/auth/profile', profileData);
      setAuth(data.user, localStorage.getItem('token') || '');
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.put('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      toast.success('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Password change failed');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      id: 'profile',
      label: 'Profile Information',
      content: (
        <Card padding="lg">
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <Input
              label="Full Name"
              icon={<User className="w-5 h-5" />}
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              icon={<Mail className="w-5 h-5" />}
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            />
            <Input
              label="Phone"
              type="tel"
              icon={<Phone className="w-5 h-5" />}
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            />
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Card>
      )
    },
    {
      id: 'security',
      label: 'Security',
      content: (
        <Card padding="lg">
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              icon={<Lock className="w-5 h-5" />}
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            />
            <Input
              label="New Password"
              type="password"
              icon={<Lock className="w-5 h-5" />}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            />
            <Input
              label="Confirm New Password"
              type="password"
              icon={<Lock className="w-5 h-5" />}
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            />
            <Button type="submit" disabled={loading}>
              <Lock className="w-4 h-4 mr-2" />
              {loading ? 'Changing...' : 'Change Password'}
            </Button>
          </form>
        </Card>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <Tabs tabs={tabs} />
    </div>
  );
}
