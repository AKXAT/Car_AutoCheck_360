# Tesla Final Testing Dashboard - Makefile
# Simple commands for local development and deployment

.PHONY: help install dev build start clean docker-dev docker-prod

# Default target
help:
	@echo "Tesla Final Testing Dashboard - Available Commands:"
	@echo ""
	@echo "  make install     - Install dependencies"
	@echo "  make dev         - Start development server"
	@echo "  make build       - Build for production"
	@echo "  make start       - Start production server"
	@echo "  make docker-dev  - Run development with Docker"
	@echo "  make docker-prod - Run production with Docker"
	@echo "  make clean       - Clean build files"
	@echo ""

# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install

# Start development server
dev:
	@echo "Starting development server..."
	npm run dev

# Build for production
build:
	@echo "Building for production..."
	npm run build

# Start production server
start: build
	@echo "Starting production server..."
	npm run start

# Docker development
docker-dev:
	@echo "Starting Docker development environment..."
	docker-compose --profile dev up --build tesla-testing-dashboard-dev

# Docker production
docker-prod:
	@echo "Starting Docker production environment..."
	docker-compose up --build

# Clean build files
clean:
	@echo "Cleaning build files..."
	rm -rf .next
	rm -rf node_modules/.cache
	@echo "Clean complete!"

# Quick setup for new developers
setup: install
	@echo "Setup complete! Run 'make dev' to start development."
