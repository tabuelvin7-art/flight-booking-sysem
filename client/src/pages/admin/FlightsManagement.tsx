import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Plane } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import api from '../../api/axios';
import { Button, Card, Modal, Input, Badge, EmptyState } from '../../components';

interface FlightsManagementProps {
  onUpdate: () => void;
}

export default function FlightsManagement({ onUpdate }: FlightsManagementProps) {
  const [flights, setFlights] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFlight, setEditingFlight] = useState<any>(null);
  const [formData, setFormData] = useState({
    airline: '',
    flightNumber: '',
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    availableSeats: ''
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const { data } = await api.get('/flights');
      setFlights(data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFlight) {
        await api.put(`/flights/${editingFlight._id}`, formData);
        toast.success('Flight updated successfully!');
      } else {
        await api.post('/flights', formData);
        toast.success('Flight created successfully!');
      }
      setIsModalOpen(false);
      resetForm();
      fetchFlights();
      onUpdate();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (flight: any) => {
    setEditingFlight(flight);
    setFormData({
      airline: flight.airline,
      flightNumber: flight.flightNumber,
      origin: flight.origin,
      destination: flight.destination,
      departureTime: format(new Date(flight.departureTime), "yyyy-MM-dd'T'HH:mm"),
      arrivalTime: format(new Date(flight.arrivalTime), "yyyy-MM-dd'T'HH:mm"),
      price: flight.price.toString(),
      availableSeats: flight.availableSeats.toString()
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this flight?')) return;
    try {
      await api.delete(`/flights/${id}`);
      toast.success('Flight deleted successfully!');
      fetchFlights();
      onUpdate();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const resetForm = () => {
    setFormData({
      airline: '',
      flightNumber: '',
      origin: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      price: '',
      availableSeats: ''
    });
    setEditingFlight(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Manage Flights</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Add Flight</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {flights.length === 0 ? (
        <EmptyState
          icon={Plane}
          title="No Flights Yet"
          description="Start by adding your first flight"
          actionLabel="Add Flight"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="space-y-4">
          {flights.map((flight: any) => (
            <Card key={flight._id} padding="lg">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                    <h3 className="text-lg sm:text-xl font-bold">{flight.airline}</h3>
                    <Badge variant="info">{flight.flightNumber}</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div>
                      <p className="text-gray-600">Route</p>
                      <p className="font-semibold">{flight.origin} → {flight.destination}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Departure</p>
                      <p className="font-semibold break-words">{format(new Date(flight.departureTime), 'PPp')}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Price</p>
                      <p className="font-semibold text-blue-600">${flight.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Available Seats</p>
                      <p className="font-semibold">{flight.availableSeats}</p>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col gap-2 self-start">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(flight)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(flight._id)}>
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
        title={editingFlight ? 'Edit Flight' : 'Add New Flight'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Airline"
              required
              value={formData.airline}
              onChange={(e) => setFormData({ ...formData, airline: e.target.value })}
            />
            <Input
              label="Flight Number"
              required
              value={formData.flightNumber}
              onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Origin"
              required
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            />
            <Input
              label="Destination"
              required
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Departure Time"
              type="datetime-local"
              required
              value={formData.departureTime}
              onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
            />
            <Input
              label="Arrival Time"
              type="datetime-local"
              required
              value={formData.arrivalTime}
              onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Price ($)"
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <Input
              label="Available Seats"
              type="number"
              required
              value={formData.availableSeats}
              onChange={(e) => setFormData({ ...formData, availableSeats: e.target.value })}
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleCloseModal} fullWidth>
              Cancel
            </Button>
            <Button type="submit" fullWidth>
              {editingFlight ? 'Update' : 'Create'} Flight
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
