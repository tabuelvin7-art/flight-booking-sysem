import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Save, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../api/axios';
import { useAuthStore } from '../../store/authStore';
import { Card, Input, Button, Tabs, Badge, Avatar } from '../../components';

export default function AdminProfile() {
  const { user, setAuth } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!user.isAdmin) {
      navigate('/');
      return;
    }
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get(`/users/${user?.id}`);
      setProfileData({
        name: data.name,
        email: data.email,
        phone: data.phone || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put(`/users/${user?.id}`, profileData);
      setAuth({ ...user!, name: data.name, email: data.email }, localStorage.getItem('token') || '');
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
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
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
          <div className="flex items-center gap-4 mb-8 pb-6 border-b">
            <Avatar 
              fallback={user?.name.charAt(0).toUpperCase() || 'A'} 
              size="xl"
            />
            <div>
              <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
              <div className="flex items-center gap-2">
                <Badge variant="info">
                  <Shield className="w-3 h-3 inline mr-1" />
                  Administrator
                </Badge>
              </div>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <Input
              label="Full Name"
              icon={<User className="w-5 h-5" />}
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              type="email"
              icon={<Mail className="w-5 h-5" />}
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              icon={<Phone className="w-5 h-5" />}
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              placeholder="Optional"
            />
            <Button type="submit" disabled={loading} size="lg">
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
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Change Password</h3>
            <p className="text-gray-600 text-sm">
              Ensure your account is using a strong password to stay secure
            </p>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              icon={<Lock className="w-5 h-5" />}
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              required
            />
            <Input
              label="New Password"
              type="password"
              icon={<Lock className="w-5 h-5" />}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              icon={<Lock className="w-5 h-5" />}
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              required
            />
            <Button type="submit" disabled={loading} size="lg">
              <Lock className="w-4 h-4 mr-2" />
              {loading ? 'Changing...' : 'Change Password'}
            </Button>
          </form>
        </Card>
      )
    },
    {
      id: 'account',
      label: 'Account Info',
      content: (
        <Card padding="lg">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Account Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Account Type</span>
                  <Badge variant="info">Administrator</Badge>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">User ID</span>
                  <span className="font-mono text-sm">{user?.id}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Email</span>
                  <span>{user?.email}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Admin Status</span>
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h4 className="font-bold mb-2">Admin Privileges</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Manage all flights
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Manage destinations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  View all bookings
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  View all users
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Access admin dashboard
                </li>
              </ul>
            </div>
          </div>
        </Card>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Profile Settings</h1>
        <p className="text-gray-600">Manage your admin account settings and preferences</p>
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
}
