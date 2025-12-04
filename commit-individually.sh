#!/bin/bash

# Skyline Travels - Individual Commit Script
# This script commits files individually with proper messages

echo "🚀 Starting individual commits for Skyline Travels..."
echo ""

# Initial Setup & Configuration
echo "📦 Committing initial setup..."
git add package.json package-lock.json
git commit -m "chore: initialize monorepo with client and server workspaces"

git add .gitignore
git commit -m "chore: add gitignore for node_modules, env files, and build artifacts"

# Backend - Initial Setup
echo "🔧 Committing backend setup..."
git add server/package.json server/package-lock.json server/tsconfig.json
git commit -m "feat(server): initialize Express TypeScript server with dependencies"

git add server/.env.example
git commit -m "chore(server): add environment variables template"

git add server/src/config/database.ts
git commit -m "feat(server): add MongoDB connection configuration"

# Backend - Models
echo "📊 Committing backend models..."
git add server/src/models/User.ts
git commit -m "feat(server): create User model with authentication and admin support"

git add server/src/models/Flight.ts
git commit -m "feat(server): create Flight model with comprehensive details"

git add server/src/models/Destination.ts
git commit -m "feat(server): create Destination model"

git add server/src/models/Booking.ts
git commit -m "feat(server): create Booking model with passenger details"

# Backend - Middleware
echo "🔐 Committing middleware..."
git add server/src/middleware/auth.ts
git commit -m "feat(server): add JWT authentication middleware"

# Backend - Routes
echo "🛣️  Committing backend routes..."
git add server/src/routes/auth.routes.ts
git commit -m "feat(server): implement authentication routes with JWT"

git add server/src/routes/flight.routes.ts
git commit -m "feat(server): implement flight CRUD routes"

git add server/src/routes/destination.routes.ts
git commit -m "feat(server): implement destination CRUD routes"

git add server/src/routes/booking.routes.ts
git commit -m "feat(server): implement booking routes with seat management"

git add server/src/routes/user.routes.ts
git commit -m "feat(server): implement user management routes"

# Backend - Scripts
echo "📝 Committing backend scripts..."
git add server/src/seed.ts
git commit -m "feat(server): add database seeding script with sample data"

git add server/src/scripts/createAdmin.ts
git commit -m "feat(server): add admin user creation script"

git add server/src/index.ts
git commit -m "feat(server): setup Express server with all routes"

# Frontend - Initial Setup
echo "⚛️  Committing frontend setup..."
git add client/package.json client/package-lock.json
git commit -m "feat(client): initialize React TypeScript app with Vite"

git add client/tsconfig.json client/tsconfig.node.json client/vite.config.ts
git commit -m "chore(client): configure TypeScript and Vite"

git add client/tailwind.config.js client/postcss.config.js
git commit -m "style(client): configure Tailwind CSS"

git add client/index.html
git commit -m "feat(client): add HTML entry point"

git add client/src/index.css
git commit -m "style(client): add global styles and Tailwind imports"

# Frontend - API & State
echo "🔄 Committing API and state management..."
git add client/src/api/axios.ts
git commit -m "feat(client): configure Axios instance with interceptors"

git add client/src/store/authStore.ts
git commit -m "feat(client): create authentication store with Zustand"

# Frontend - Core Components
echo "🎨 Committing core components..."
git add client/src/components/Button.tsx
git commit -m "feat(client): create reusable Button component"

git add client/src/components/Input.tsx
git commit -m "feat(client): create Input component with icon support"

git add client/src/components/Card.tsx
git commit -m "feat(client): create Card container component"

git add client/src/components/Badge.tsx
git commit -m "feat(client): create Badge component"

git add client/src/components/Modal.tsx
git commit -m "feat(client): create Modal dialog component"

git add client/src/components/Spinner.tsx
git commit -m "feat(client): create loading Spinner component"

git add client/src/components/Alert.tsx
git commit -m "feat(client): create Alert notification component"

git add client/src/components/Avatar.tsx
git commit -m "feat(client): create Avatar component"

git add client/src/components/Tooltip.tsx
git commit -m "feat(client): create Tooltip component"

git add client/src/components/Divider.tsx
git commit -m "feat(client): create Divider component"

git add client/src/components/ProgressBar.tsx
git commit -m "feat(client): create ProgressBar component"

# Frontend - Navigation Components
echo "🧭 Committing navigation components..."
git add client/src/components/Header.tsx
git commit -m "feat(client): create responsive Header with mobile menu"

git add client/src/components/Footer.tsx
git commit -m "feat(client): create Footer with links"

git add client/src/components/Tabs.tsx
git commit -m "feat(client): create Tabs component"

git add client/src/components/Dropdown.tsx
git commit -m "feat(client): create Dropdown menu component"

git add client/src/components/Breadcrumb.tsx
git commit -m "feat(client): create Breadcrumb navigation"

git add client/src/components/Pagination.tsx
git commit -m "feat(client): create Pagination component"

# Frontend - Data Display Components
echo "📋 Committing data display components..."
git add client/src/components/FlightCard.tsx
git commit -m "feat(client): create FlightCard component"

git add client/src/components/BookingCard.tsx
git commit -m "feat(client): create BookingCard component"

git add client/src/components/DestinationCard.tsx
git commit -m "feat(client): create DestinationCard component"

git add client/src/components/StatsCard.tsx
git commit -m "feat(client): create StatsCard component"

git add client/src/components/SearchBar.tsx
git commit -m "feat(client): create SearchBar component"

git add client/src/components/FilterBar.tsx
git commit -m "feat(client): create FilterBar component"

# Frontend - Loading & Empty States
echo "⏳ Committing loading components..."
git add client/src/components/LoadingScreen.tsx
git commit -m "feat(client): create LoadingScreen component"

git add client/src/components/EmptyState.tsx
git commit -m "feat(client): create EmptyState component"

git add client/src/components/SkeletonLoader.tsx
git commit -m "feat(client): create Skeleton loading components"

git add client/src/components/index.ts
git commit -m "feat(client): create component barrel export"

# Frontend - Public Pages
echo "📄 Committing public pages..."
git add client/src/pages/Home.tsx
git commit -m "feat(client): create Home landing page"

git add client/src/pages/Login.tsx
git commit -m "feat(client): create Login page with admin redirect"

git add client/src/pages/Register.tsx
git commit -m "feat(client): create Registration page"

git add client/src/pages/Flights.tsx
git commit -m "feat(client): create Flights listing page with filters"

git add client/src/pages/FlightDetails.tsx
git commit -m "feat(client): create Flight details page"

git add client/src/pages/Booking.tsx
git commit -m "feat(client): create Booking page"

git add client/src/pages/MyBookings.tsx
git commit -m "feat(client): create My Bookings page"

# Frontend - User Dashboard
echo "👤 Committing user dashboard..."
git add client/src/pages/Dashboard.tsx
git commit -m "feat(client): create user Dashboard page"

git add client/src/pages/Profile.tsx
git commit -m "feat(client): create Profile settings page"

# Frontend - Admin Panel
echo "🔧 Committing admin panel..."
git add client/src/pages/admin/AdminDashboard.tsx
git commit -m "feat(client): create Admin Dashboard"

git add client/src/pages/admin/FlightsManagement.tsx
git commit -m "feat(client): create Flights Management page"

git add client/src/pages/admin/DestinationsManagement.tsx
git commit -m "feat(client): create Destinations Management page"

git add client/src/pages/admin/BookingsManagement.tsx
git commit -m "feat(client): create Bookings Management page"

git add client/src/pages/admin/UsersManagement.tsx
git commit -m "feat(client): create Users Management page"

git add client/src/pages/admin/AdminProfile.tsx
git commit -m "feat(client): create Admin Profile settings page"

# Frontend - Main App
echo "🚀 Committing main app..."
git add client/src/App.tsx
git commit -m "feat(client): setup React Router with all routes"

git add client/src/main.tsx
git commit -m "feat(client): setup React app entry point"

# Documentation
echo "📚 Committing documentation..."
git add README.md
git commit -m "docs: create comprehensive README"

git add ADMIN_GUIDE.md
git commit -m "docs: create admin panel user guide"

git add ADMIN_FUNCTIONALITY_STATUS.md
git commit -m "docs: document admin functionality status"

git add COMPONENTS.md
git commit -m "docs: create component library documentation"

git add RESPONSIVE_DESIGN.md
git commit -m "docs: document responsive design"

git add COMMIT_MESSAGES.md
git commit -m "docs: add commit message guide"

git add commit-individually.sh
git commit -m "chore: add individual commit script"

echo ""
echo "✅ All files committed individually!"
echo "🎉 Skyline Travels v1.0.0 is ready!"
echo ""
echo "Next steps:"
echo "1. git push origin main"
echo "2. Create a release tag: git tag -a v1.0.0 -m 'Release v1.0.0'"
echo "3. Push tags: git push origin --tags"
