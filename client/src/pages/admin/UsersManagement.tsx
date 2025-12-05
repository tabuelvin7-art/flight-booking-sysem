import { useState, useEffect } from 'react';
import { Users as UsersIcon, Shield, Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import api from '../../api/axios';
import { Card, Badge, EmptyState, LoadingScreen, Avatar } from '../../components';

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen message="Loading users..." />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Manage Users</h2>
        <Badge variant="info">{users.length} Total Users</Badge>
      </div>

      {users.length === 0 ? (
        <EmptyState
          icon={UsersIcon}
          title="No Users Yet"
          description="Users will appear here once they register"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {users.map((user: any) => (
            <Card key={user._id} padding="lg" hover>
              <div className="flex items-start gap-4">
                <Avatar 
                  fallback={user.name.charAt(0).toUpperCase()} 
                  size="lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg truncate">{user.name}</h3>
                    {user.isAdmin && (
                      <Badge variant="info" size="sm">
                        <Shield className="w-3 h-3 inline mr-1" />
                        Admin
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    
                    {user.phone && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">📱</span>
                        <span>{user.phone}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-xs">
                        Joined {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
