# E-commerce Application with Next.js and Go
<img width="1526" height="820" alt="Screenshot from 2025-07-17 16-09-40" src="https://github.com/user-attachments/assets/76e07bf9-e1b7-4bf5-beb9-aea296d3ca23" />

<img width="1526" height="820" alt="Screenshot from 2025-07-17 16-10-48" src="https://github.com/user-attachments/assets/cf2670d3-35c8-4d5d-a1dd-12921ed1e828" />

This project is a full-stack e-commerce application featuring a Next.js frontend and a Go backend, deployed on Kubernetes. The backend integrates with MySQL for data persistence and Redis for caching.

## Architecture Overview

```
+-----------------+       +-------------+       +-----------------+       +--------+
| Next.js Frontend| <---> | Go Backend  | <---> | MySQL Database  |       |        |
| (Kubernetes)    | HTTP  | (Kubernetes)|       | (Kubernetes)    |       | Redis  |
+-----------------+       +-------------+       +-----------------+       | (Cache)|
                                                                          +--------+
```

## Features

- **Product Catalog**: Browse all available products
- **Product Details**: View detailed information about individual products
- **Responsive Design**: Mobile-friendly interface
- **High Performance**: Redis caching for frequently accessed data
- **Scalable**: Kubernetes deployment for all components

## Backend API Routes

The Go backend exposes the following RESTful endpoints:

### Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get a single product by ID
- `POST /api/products` - Create a new product (Admin only)
- `PUT /api/products/{id}` - Update a product (Admin only)
- `DELETE /api/products/{id}` - Delete a product (Admin only)

### Other Routes
- `GET /api/health` - Health check endpoint
- `GET /api/status` - System status with cache/database metrics

## Prerequisites

- Kubernetes cluster (Minikube, EKS, GKE, or AKS)
- kubectl CLI
- Helm (for MySQL/Redis installation)
- Docker
- Go 1.20+
- Node.js 18+

## Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ecommerce-app.git
cd ecommerce-app
```

### 2. Start Backend Dependencies
```bash
# Start MySQL and Redis using Docker Compose
docker-compose -f backend/docker-compose.dev.yml up -d
```

### 3. Run the Go Backend
```bash
cd backend
go mod download
go run main.go
```

### 4. Run the Next.js Frontend
```bash
cd frontend
npm install
npm run dev
```

Access the application at http://localhost:3000

## Kubernetes Deployment

### 1. Build and Push Docker Images
```bash
# Build frontend image
docker build -t your-registry/ecommerce-frontend:latest -f frontend/Dockerfile .

# Build backend image
docker build -t your-registry/ecommerce-backend:latest -f backend/Dockerfile .

# Push images to container registry
docker push your-registry/ecommerce-frontend:latest
docker push your-registry/ecommerce-backend:latest
```

### 2. Deploy Infrastructure
```bash
# Create namespace
kubectl create namespace ecommerce

# Install MySQL using Helm
helm install mysql bitnami/mysql \
  --namespace ecommerce \
  --set auth.rootPassword=secret \
  --set auth.database=ecommerce_db

# Install Redis
helm install redis bitnami/redis \
  --namespace ecommerce \
  --set auth.password=redis-pass
```

### 3. Deploy Applications
```bash
# Deploy backend
kubectl apply -f k8s/backend-deployment.yaml -n ecommerce

# Deploy frontend
kubectl apply -f k8s/frontend-deployment.yaml -n ecommerce

# Expose services
kubectl apply -f k8s/services.yaml -n ecommerce
```

### 4. Access the Application
```bash
# Get frontend service URL
minikube service frontend -n ecommerce --url
# Or for cloud providers, use the LoadBalancer EXTERNAL-IP
```

## Configuration

### Frontend Environment Variables
```env
NEXT_PUBLIC_API_URL=http://backend-service:8080
```

### Backend Environment Variables
```env
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=secret
DB_NAME=ecommerce_db

REDIS_ADDR=redis-master:6379
REDIS_PASSWORD=redis-pass
```

## Directory Structure

```
├── backend/               # Go backend application
│   ├── cmd/               # Main application entrypoint
│   ├── internal/          # Core application logic
│   │   ├── handlers/      # HTTP request handlers
│   │   ├── models/        # Data models
│   │   ├── repository/    # Database access layer
│   │   └── service/       # Business logic
│   ├── Dockerfile         # Backend Dockerfile
│   └── main.go            # Application entrypoint
│
├── frontend/              # Next.js application
│   ├── components/        # Reusable UI components
│   ├── pages/             # Application routes
│   │   ├── products/      # Product-related pages
│   │   │   ├── index.js   # Product listing page
│   │   │   └── [id].js    # Individual product page
│   ├── public/            # Static assets
│   ├── styles/            # CSS modules
│   └── Dockerfile         # Frontend Dockerfile
│
├── k8s/                   # Kubernetes deployment files
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   └── services.yaml
│
├── docker-compose.dev.yml # Local development setup
└── README.md              # Project documentation
```

## Monitoring and Logging

Access Kubernetes resources:
```bash
# View pods
kubectl get pods -n ecommerce

# View logs (backend example)
kubectl logs -l app=backend -n ecommerce

# Access MySQL
kubectl run mysql-client --rm -i --tty \
  --image docker.io/bitnami/mysql:8.0 \
  --namespace ecommerce \
  --env MYSQL_ROOT_PASSWORD=secret \
  --command -- mysql -h mysql -uroot -psecret ecommerce_db
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
