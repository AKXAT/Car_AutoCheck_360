# Tesla Final Testing Dashboard

A professional automotive testing interface designed for Tesla vehicle diagnostics and quality assurance. This interactive dashboard provides comprehensive system health monitoring with a 3D vehicle visualization and hierarchical test result management.

## Features

- **Interactive 3D Vehicle Model**: 360-degree rotatable Tesla Model 3 with clickable diagnostic points
- **Hierarchical System Tree**: Organized view of all vehicle systems and subsystems
- **Real-time Health Monitoring**: Visual indicators for system status with pass/fail statistics
- **Professional Tesla-inspired UI**: Dark theme with minimalistic design and red accent colors
- **Comprehensive Test Results**: Detailed modal views with progress indicators and diagnostic data
- **Authentication System**: Secure login interface for authorized personnel

## Screenshots

### Login Page
![Login Page](https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Tesla+Login+Interface)

### Testing Dashboard
![Testing Dashboard](https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Tesla+Testing+Dashboard)

## Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd tesla-testing-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Default Login Credentials
- **Username**: `admin`
- **Password**: `tesla123`

## Docker Deployment

### Production Deployment

1. **Build and run with Docker Compose**
   \`\`\`bash
   docker-compose up --build
   \`\`\`

2. **Access the application**
   Open [http://localhost:3000](http://localhost:3000)

### Development with Docker

1. **Run development environment**
   \`\`\`bash
   docker-compose --profile dev up --build tesla-testing-dashboard-dev
   \`\`\`

2. **Access development server**
   Open [http://localhost:3001](http://localhost:3001)

### Manual Docker Build

\`\`\`bash
# Build production image
docker build -t tesla-testing-dashboard .

# Run container
docker run -p 3000:3000 tesla-testing-dashboard
\`\`\`

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **3D Graphics**: React Three Fiber, Three.js
- **UI Components**: shadcn/ui, Tailwind CSS
- **Authentication**: Custom session management
- **Deployment**: Docker, Vercel

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── car-view.tsx      # 3D vehicle visualization
│   ├── dashboard.tsx     # Main dashboard layout
│   ├── login-page.tsx    # Authentication interface
│   ├── test-modal.tsx    # Test results modal
│   └── tree-view.tsx     # System hierarchy tree
├── lib/                  # Utility functions and data
├── public/              # Static assets
├── Dockerfile           # Production container
├── Dockerfile.dev       # Development container
└── docker-compose.yml   # Container orchestration
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
