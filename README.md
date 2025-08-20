# Tesla Final Testing Dashboard

<div align="center">
  <img src="https://img.shields.io/badge/Tesla-FF0000?style=for-the-badge&logo=tesla&logoColor=white" alt="Tesla" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
</div>

Professional automotive testing interface for Tesla vehicle diagnostics with interactive 3D visualization and comprehensive system health monitoring.

## Screenshots

### Login Interface
<img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-20%20at%2010.28.52%E2%80%AFPM-NtTYPL7iNzk0f2AhCIZfsIhSLJxV4S.png" alt="Login Page" width="600" />

### Testing Dashboard  
<img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-20%20at%2010.28.23%E2%80%AFPM-Xe2tdfDtAV1d2jWyFUgljlpuoyOYD8.png" alt="Main Dashboard" width="600" />

## Quick Start

\`\`\`bash
# Clone repository
git clone https://github.com/AKXAT/Car_AutoCheck_360.git
cd Car_AutoCheck_360

# Setup and run (using Makefile)
make setup
make dev
\`\`\`

**Login**: Use any username/password combination

## Available Commands

\`\`\`bash
make help        # Show all commands
make install     # Install dependencies  
make dev         # Start development server
make build       # Build for production
make docker-prod # Run with Docker
make clean       # Clean build files
\`\`\`

## Features

- **Interactive 3D Tesla Model 3** with 360° rotation
- **System Health Monitoring** with real-time diagnostics
- **Hierarchical Test Results** for all vehicle systems
- **Professional Tesla-inspired UI** with dark theme
- **Docker Ready** for easy deployment

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **3D Graphics**: React Three Fiber, Three.js  
- **UI**: Tailwind CSS, shadcn/ui
- **Deployment**: Docker, Vercel

## Docker Deployment

\`\`\`bash
# Production
docker-compose up --build

# Development with hot reload
make docker-dev
\`\`\`

## Project Structure

\`\`\`
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── car-view.tsx    # 3D Tesla visualization
│   ├── dashboard.tsx   # Main dashboard
│   └── tree-view.tsx   # System hierarchy
├── lib/                # Utilities and mock data
├── Dockerfile          # Production container
└── Makefile           # Development commands
\`\`\`

## License

MIT License - Built for Tesla Quality Assurance Teams
