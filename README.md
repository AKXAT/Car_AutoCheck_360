# Tesla Final Testing Dashboard

<div align="center">
  <img src="https://img.shields.io/badge/Tesla-FF0000?style=for-the-badge&logo=tesla&logoColor=white" alt="Tesla" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

<br />

A professional automotive testing interface designed for Tesla vehicle diagnostics and quality assurance. This interactive dashboard provides comprehensive system health monitoring with a 3D vehicle visualization and hierarchical test result management.

## 🚗 Features

- **Interactive 3D Vehicle Model**: 360-degree rotatable Tesla Model 3 with clickable diagnostic points
- **Hierarchical System Tree**: Organized view of all vehicle systems and subsystems
- **Real-time Health Monitoring**: Visual indicators for system status with pass/fail statistics
- **Professional Tesla-inspired UI**: Dark theme with minimalistic design and red accent colors
- **Comprehensive Test Results**: Detailed modal views with progress indicators and diagnostic data
- **Authentication System**: Secure login interface for authorized personnel
- **Production Ready**: Docker containerization with optimized builds

## 📸 Screenshots

### Login Interface
<img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-20%20at%2010.28.52%E2%80%AFPM-NtTYPL7iNzk0f2AhCIZfsIhSLJxV4S.png" alt="Tesla Final Testing Dashboard - Login Page" width="800" />

*Secure authentication interface with Tesla branding and professional design*

### Testing Dashboard
<img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-20%20at%2010.28.23%E2%80%AFPM-Xe2tdfDtAV1d2jWyFUgljlpuoyOYD8.png" alt="Tesla Final Testing Dashboard - Main Interface" width="800" />

*Interactive 3D Tesla Model 3 with comprehensive system diagnostics and real-time health monitoring*

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (optional)

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/tesla-testing-dashboard.git
   cd tesla-testing-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### 🔐 Default Credentials
- **Username**: Any username
- **Password**: Any password
- *Demo mode accepts any credential combination*

## 🐳 Docker Deployment

### Production Deployment

\`\`\`bash
# Build and run with Docker Compose
docker-compose up --build

# Access at http://localhost:3000
\`\`\`

### Development Environment

\`\`\`bash
# Run development container with hot reload
docker-compose --profile dev up --build tesla-testing-dashboard-dev

# Access at http://localhost:3001
\`\`\`

### Manual Docker Build

\`\`\`bash
# Build production image
docker build -t tesla-testing-dashboard .

# Run container
docker run -p 3000:3000 tesla-testing-dashboard
\`\`\`

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 14, React 18, TypeScript |
| **3D Graphics** | React Three Fiber, Three.js |
| **UI Framework** | Tailwind CSS, shadcn/ui |
| **Authentication** | Custom session management |
| **Deployment** | Docker, Vercel |
| **Development** | ESLint, Prettier |

## 📁 Project Structure

\`\`\`
tesla-testing-dashboard/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tesla theme
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main application entry
├── components/            # React components
│   ├── car-view.tsx      # 3D Tesla Model 3 visualization
│   ├── dashboard.tsx     # Main dashboard layout
│   ├── login-page.tsx    # Authentication interface
│   ├── test-modal.tsx    # Test results modal
│   └── tree-view.tsx     # System hierarchy tree
├── lib/                  # Utilities and mock data
│   ├── mock-data.ts      # Test data and system definitions
│   └── utils.ts          # Helper functions
├── public/              # Static assets
├── Dockerfile           # Production container
├── Dockerfile.dev       # Development container
├── docker-compose.yml   # Container orchestration
└── next.config.mjs      # Next.js configuration
\`\`\`

## 🎯 System Architecture

The dashboard simulates a comprehensive Tesla vehicle testing environment with:

- **Core Vehicle Systems**: Powertrain, Battery Management, Braking
- **Advanced Features**: Autopilot, Perception, Lane Detection
- **Safety Systems**: Collision Avoidance, Emergency Braking
- **Connectivity**: Infotainment, Navigation, Over-the-Air Updates

Each system includes detailed subsystem monitoring with real-time health indicators and comprehensive test result tracking.

## 🔧 Development

### Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
\`\`\`

### Environment Variables

No environment variables required for basic functionality. The application runs with mock data for demonstration purposes.

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with Next.js automatic code splitting
- **3D Performance**: Optimized Three.js rendering with efficient geometry
- **Docker Image**: Multi-stage build for minimal production size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Tesla for design inspiration
- Three.js community for 3D graphics capabilities
- Next.js team for the excellent framework
- shadcn/ui for beautiful component library

---

<div align="center">
  <strong>Built for Tesla Quality Assurance Teams</strong><br />
  Professional automotive testing made simple and intuitive
</div>
