# ✈️ Skyline Travels - Flight Booking System

<div align="center">

![Skyline Travels](https://img.shields.io/badge/Skyline-Travels-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6-47A248?style=for-the-badge&logo=mongodb)

A modern, full-stack flight booking application with admin panel, built with React, Node.js, MongoDB, and TypeScript.

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Admin Panel](#-admin-panel)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎫 User Features
- ✅ **User Authentication** - Secure registration and login with JWT
- ✅ **Flight Search** - Search flights by origin, destination, and date
- ✅ **Flight Booking** - Book flights with multiple passengers
- ✅ **Booking Management** - View and manage all bookings
- ✅ **User Dashboard** - Personal dashboard with statistics
- ✅ **Profile Management** - Update profile and change password
- ✅ **Destinations** - Browse popular travel destinations
- ✅ **Responsive Design** - Fully responsive for mobile, tablet, and desktop

### 🔧 Admin Features
- ✅ **Admin Dashboard** - Overview with statistics
- ✅ **Flight Management** - Full CRUD operations for flights
- ✅ **Destination Management** - Manage travel destinations
- ✅ **Booking Overview** - View all customer bookings
- ✅ **User Management** - View all registered users
- ✅ **Admin Profile** - Dedicated admin settings page
- ✅ **Role-Based Access** - Automatic admin detection and routing

### 🎨 UI/UX Features
- ✅ **25+ Reusable Components** - Complete component library
- ✅ **Modern Design** - Clean, professional interface
- ✅ **Loading States** - Skeleton loaders and spinners
- ✅ **Empty States** - Helpful placeholders
- ✅ **Toast Notifications** - Real-time feedback
- ✅ **Modal Dialogs** - Smooth form interactions
- ✅ **Mobile Menu** - Hamburger navigation for mobile
- ✅ **Dark Mode Ready** - Prepared for theme switching

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Zustand** - State management
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icon library
- **date-fns** - Date formatting

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support
- **dotenv** - Environment variables

## 📸 Screenshots

### Home Page
Beautiful landing page with hero section, search bar, and popular destinations.

### Flight Search
Advanced search with filters, sorting, and real-time results.

### Admin Dashboard
Comprehensive admin panel with statistics, flight management, and user overview.

### Mobile Responsive
Fully optimized for mobile devices with hamburger menu and touch-friendly interface.

## 🚀 Installation

### Prerequisites
- **Node.js** v18 or higher
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/tabuelvin7-art/skyline-travels.git
cd skyline-travels
```

2. **Install dependencies**
```bash
# Install all dependencies (client + server)
npm install

# Or install separately
cd client && npm install
cd ../server && npm install
```

3. **Configure environment variables**
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flight-booking
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=development
```

4. **Seed the database** (Optional but recommended)
```bash
cd server
npm run seed
```

5. **Create admin user**
```bash
cd server
npm run create-admin
```
Default credentials:
- Email: `admin@skylinetravels.com`
- Password: `admin123`

6. **Start the application**

**Development mode:**
```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm run dev
```

**Production mode:**
```bash
# Build frontend
cd client
npm run build

# Start backend
cd server
npm run build
npm start
```

7. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:5173/admin

## ⚙️ Configuration

### Environment Variables

**Server (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flight-booking
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Database Seeding

The seed script populates the database with:
- 10 sample flights
- 10 popular destinations

```bash
cd server
npm run seed
```

### Admin Creation

Create admin users with the script:
```bash
# Default admin
npm run create-admin

# Custom admin
npm run create-admin admin@example.com password123 "Admin Name"

# Promote existing user
npm run create-admin existing@user.com
```

## 📖 Usage

### For Users

1. **Register/Login**
   - Navigate to `/register` or `/login`
   - Create an account or sign in

2. **Search Flights**
   - Use the search bar on home page
   - Filter by origin, destination, date, passengers

3. **Book a Flight**
   - Select a flight
   - Add passenger details
   - Confirm booking

4. **Manage Bookings**
   - View all bookings at `/my-bookings`
   - Check booking status and details

### For Admins

1. **Login as Admin**
   - Use admin credentials
   - Automatically redirected to `/admin`

2. **Manage Flights**
   - Add new flights
   - Edit existing flights
   - Delete flights

3. **Manage Destinations**
   - Add destinations with images
   - Update destination details
   - Remove destinations

4. **View Analytics**
   - Dashboard statistics
   - Booking overview
   - User management

## 🔐 Admin Panel

### Access
- URL: `/admin`
- Requires admin privileges (`isAdmin: true` in database)

### Features

#### Overview Tab
- Total flights count
- Total destinations
- Total bookings
- Total users

#### Flights Management
- Create flights with full details
- Edit flight information
- Delete flights
- View all flights

#### Destinations Management
- Add destinations with images
- Edit destination details
- Delete destinations
- Grid view with ratings

#### Bookings Management
- View all customer bookings
- See booking details
- Customer information

#### Users Management
- View all registered users
- User details and join dates
- Admin badge indicators

#### Admin Profile
- Update admin information
- Change password
- View account details
- Admin privileges list

## 📡 API Documentation

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpass",
  "newPassword": "newpass"
}
```

### Flights

#### Get All Flights
```http
GET /api/flights?origin=Dubai&destination=NewYork&date=2024-12-15
```

#### Get Single Flight
```http
GET /api/flights/:id
```

#### Create Flight (Admin)
```http
POST /api/flights
Authorization: Bearer <token>
Content-Type: application/json

{
  "airline": "Emirates",
  "flightNumber": "EK123",
  "origin": "Dubai",
  "destination": "New York",
  "departureTime": "2024-12-15T14:30:00",
  "arrivalTime": "2024-12-15T20:45:00",
  "price": 850,
  "availableSeats": 180,
  "totalSeats": 200,
  "class": "economy",
  "status": "scheduled"
}
```

#### Update Flight (Admin)
```http
PUT /api/flights/:id
Authorization: Bearer <token>
```

#### Delete Flight (Admin)
```http
DELETE /api/flights/:id
Authorization: Bearer <token>
```

### Destinations

#### Get All Destinations
```http
GET /api/destinations
```

#### Create Destination (Admin)
```http
POST /api/destinations
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Paris",
  "country": "France",
  "description": "City of Light",
  "image": "https://example.com/paris.jpg",
  "rating": 4.8
}
```

#### Update Destination (Admin)
```http
PUT /api/destinations/:id
Authorization: Bearer <token>
```

#### Delete Destination (Admin)
```http
DELETE /api/destinations/:id
Authorization: Bearer <token>
```

### Bookings

#### Create Booking
```http
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "flightId": "flight_id",
  "passengers": [
    {
      "name": "John Doe",
      "age": "30",
      "gender": "male"
    }
  ]
}
```

#### Get User Bookings
```http
GET /api/bookings/my-bookings
Authorization: Bearer <token>
```

#### Get All Bookings (Admin)
```http
GET /api/bookings
Authorization: Bearer <token>
```

### Users

#### Get All Users (Admin)
```http
GET /api/users
Authorization: Bearer <token>
```

#### Get Users Count (Admin)
```http
GET /api/users/count
Authorization: Bearer <token>
```

#### Update User
```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

### 🎨 Component Library

The application includes 25+ reusable components:

### Layout Components
- Header, Footer, Card, Modal

### Form Components
- Input, Button, SearchBar, FilterBar

### Display Components
- Badge, Alert, Avatar, Tooltip, Divider, ProgressBar

### Data Components
- FlightCard, BookingCard, DestinationCard, StatsCard, EmptyState

### Navigation Components
- Tabs, Breadcrumb, Pagination, Dropdown

### Loading Components
- Spinner, LoadingScreen, Skeleton loaders

See [COMPONENTS.md](./COMPONENTS.md) for detailed documentation.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile phones (320px - 767px)
- 📱 Tablets (768px - 1023px)
- 💻 Laptops (1024px - 1279px)
- 🖥️ Desktops (1280px+)

Features:
- Mobile hamburger menu
- Touch-optimized buttons (≥44x44px)
- Responsive grids and layouts
- Adaptive typography
- Mobile-first approach

See [RESPONSIVE_DESIGN.md](./RESPONSIVE_DESIGN.md) for details.

## 🔒 Security Features

- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ Role-based access control
- ✅ Input validation
- ✅ CORS configuration
- ✅ Environment variables for secrets

## 🧪 Testing

```bash
# Run frontend tests
cd client
npm test

# Run backend tests
cd server
npm test

# Run all tests
npm test
```

## 🚢 Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend:
```bash
cd client
npm run build
```

2. Deploy the `dist` folder to your hosting service

### Backend (Heroku/Railway/Render)

1. Set environment variables on your hosting platform
2. Deploy the `server` directory
3. Ensure MongoDB connection string is configured

### Environment Variables for Production

```env
# Backend
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-production-secret-key
NODE_ENV=production

# Frontend (if needed)
VITE_API_URL=https://your-backend-url.com/api
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

## 🐛 Known Issues

- None currently reported

## 📝 Changelog

### Version 1.0.0 (2024-12-04)
- ✅ Initial release
- ✅ User authentication and authorization
- ✅ Flight search and booking
- ✅ Admin panel with full CRUD
- ✅ Responsive design
- ✅ 25+ reusable components
- ✅ Database seeding scripts
- ✅ Admin creation utility

## 🗺️ Roadmap

- [ ] Payment integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Booking cancellation
- [ ] Flight reviews and ratings
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Advanced analytics dashboard
- [ ] Export bookings to PDF
- [ ] Real-time flight status updates
- [ ] Social media authentication

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/tabuelvin7-art)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the database
- All open-source contributors

## 📞 Support

For support, email support@skylinetravels.com or open an issue on GitHub.

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

<div align="center">

Made with ❤️ by [Your Name](https://github.com/tabuelvin7-art)

[⬆ Back to Top](#-skyline-travels---flight-booking-system)

</div>
