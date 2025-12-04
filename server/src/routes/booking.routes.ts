import express from 'express';
import Booking from '../models/Booking';
import Flight from '../models/Flight';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { flightId, passengers } = req.body;
    
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    if (flight.availableSeats < passengers.length) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const totalPrice = flight.price * passengers.length;
    
    const booking = new Booking({
      user: req.userId,
      flight: flightId,
      passengers,
      totalPrice,
      status: 'confirmed',
      paymentStatus: 'completed'
    });

    await booking.save();
    
    flight.availableSeats -= passengers.length;
    await flight.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/my-bookings', authenticate, async (req: AuthRequest, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId })
      .populate('flight')
      .sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('flight');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin route to get all bookings
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const bookings = await Booking.find()
      .populate('flight')
      .populate('user', 'name email')
      .sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
