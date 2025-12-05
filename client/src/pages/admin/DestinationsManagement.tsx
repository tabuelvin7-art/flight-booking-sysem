import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../api/axios';
import { Button, Card, Modal, Input, EmptyState } from '../../components';

interface DestinationsManagementProps {
  onUpdate: () => void;
}

export default function DestinationsManagement({ onUpdate }: DestinationsManagementProps) {
  const [destinations, setDestinations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    description: '',
    image: '',
    rating: ''
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const { data } = await api.get('/destinations');
      setDestinations(data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingDestination) {
        await api.put(`/destinations/${editingDestination._id}`, formData);
        toast.success('Destination updated successfully!');
      } else {
        await api.post('/destinations', formData);
        toast.success('Destination created successfully!');
      }
      setIsModalOpen(false);
      resetForm();
      fetchDestinations();
      onUpdate();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (destination: any) => {
    setEditingDestination(destination);
    setFormData({
      name: destination.name,
      country: destination.country,
      description: destination.description,
      image: destination.image,
      rating: destination.rating.toString()
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    try {
      await api.delete(`/destinations/${id}`);
      toast.success('Destination deleted successfully!');
      fetchDestinations();
      onUpdate();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      country: '',
      description: '',
      image: '',
      rating: ''
    });
    setEditingDestination(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Manage Destinations</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Add Destination</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {destinations.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="No Destinations Yet"
          description="Start by adding your first destination"
          actionLabel="Add Destination"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {destinations.map((destination: any) => (
            <Card key={destination._id} padding="sm">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-lg mb-2">{destination.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{destination.country}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-yellow-500 font-semibold">★ {destination.rating}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(destination)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(destination._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingDestination ? 'Edit Destination' : 'Add New Destination'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Country"
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              required
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <Input
            label="Image URL"
            required
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          <Input
            label="Rating (1-5)"
            type="number"
            min="1"
            max="5"
            step="0.1"
            required
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          />
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleCloseModal} fullWidth>
              Cancel
            </Button>
            <Button type="submit" fullWidth>
              {editingDestination ? 'Update' : 'Create'} Destination
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
