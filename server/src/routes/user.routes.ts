import express from 'express';
import User from '../models/User';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const users = await User.find()
      .select('-password') // Exclude password field
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get users count
router.get('/count', authenticate, async (req: AuthRequest, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single user
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user
router.put('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { name, email, phone } = req.body;
    
    // Check if user is updating their own profile or is admin
    if (req.userId !== req.params.id) {
      const currentUser = await User.findById(req.userId);
      if (!currentUser?.isAdmin) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
