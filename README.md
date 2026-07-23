# Map Dashboard Frontend

A modern, interactive map dashboard built with React and Vite. This project provides a user-friendly interface for visualizing and interacting with geospatial data layers.

![Map Web App Preview](./public/map-dashboard-preview.png)

## Features

- Interactive map visualization with Leaflet
- Dark mode support
- Layer controls for toggling map data
- Custom UI components (Button, CheckBox)
- Responsive layout and styling
- Mock data for development and testing
- Modular component structure

## Prerequisites

- Node.js (v20 or higher recommended)
- pnpm (v9 or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for DevContainer or Docker setup)

## Getting Started

### Option A: DevContainer Setup (Recommended)

This is the easiest way to get started. The DevContainer automatically provisions a complete development environment with all dependencies pre-installed.

**Requirements:**
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [VS Code](https://code.visualstudio.com/) with the [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) extension

**Steps:**

1. Clone the repository:
   ```sh
   git clone https://github.com/OpenSourceFellows/map-dashboard.git
   cd map-dashboard
   ```

2. Open in VS Code:
   ```sh
   code .
   ```

3. When prompted, click **"Reopen in Container"** — or open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and select **"Dev Containers: Reopen in Container"**.

4. VS Code will build the Docker image and start the container. This may take a few minutes on first run. Once ready, a terminal will open inside the container.

5. The dev server starts automatically. The app will be available at `http://localhost:5173`.

> **Note:** The DevContainer configuration is in `.devcontainer/devcontainer.json` and uses the Docker Compose file at `.docker/docker-compose.yml`. It automatically installs the ESLint and GitLens extensions and runs `pnpm install` on container creation.

### Option B: Docker Setup (Without VS Code DevContainers)

If you prefer to use Docker without VS Code's DevContainer integration:

1. Clone the repository:
   ```sh
   git clone https://github.com/OpenSourceFellows/map-dashboard.git
   cd map-dashboard
   ```

2. Build and start the container:
   ```sh
   docker compose -f .docker/docker-compose.yml up -d
   ```

3. The app will be available at `http://localhost:5173`.

4. To stop the container:
   ```sh
   docker compose -f .docker/docker-compose.yml down
   ```

### Option C: Manual Installation (Without Docker)

1. Clone the repository:
   ```sh
   git clone https://github.com/OpenSourceFellows/map-dashboard.git
   cd map-dashboard
   ```

2. Install dependencies:
   ```sh
   pnpm install
   ```

3. Start the development server:
   ```sh
   pnpm run dev
   ```

   The app will be available at `http://localhost:5173` by default.

4. **Optional**: For full development setup, you may also need the companion backend server:
   ```sh
   git clone https://github.com/OpenSourceFellows/dashboard-server.git
   ```
   See the [dashboard-server repository](https://github.com/OpenSourceFellows/dashboard_server) for backend setup instructions.

## Development

Build for production:

```sh
pnpm run build
```

Preview production build:

```sh
pnpm run preview
```

Run linter:

```sh
pnpm run lint
```

## Project Structure

```
map-dashboard/
├── public/           # Static assets
├── src/              # Source code
│   ├── components/   # UI and map components
│   │   ├── Layout/   # Header and layout components
│   │   ├── Map/      # Map-related components
│   │   └── UI/       # Reusable UI components
│   ├── data/         # Mock data
│   ├── hooks/        # Custom React hooks
│   ├── styles/       # CSS files
│   ├── types/        # TypeScript types
│   ├── utils/        # Utility functions
│   ├── App.tsx       # Main app component
│   └── main.tsx      # Entry point
├── package.json      # Project metadata and scripts
├── vite.config.ts    # Vite configuration
└── README.md         # Project documentation
```

## Tools & Libraries

- [React](https://react.dev/) – UI library
- [Vite](https://vitejs.dev/) – Fast build tool
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- [Leaflet](https://leafletjs.com/) – Interactive maps
- [React Leaflet](https://react-leaflet.js.org/) – React components for Leaflet
- [ESLint](https://eslint.org/) – Linting

## Custom Components

- `Header` – App title and navigation
- `MapContainer` – Interactive Leaflet map with markers and polygons
- `LayerControls` – Toggle map layers and data types
- `MapLegend` – Map legend display
- `CheckBox` – UI checkbox component

## Additional Documentation

- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [LICENSE.md](LICENSE.md) - License information
- [docs/MAINTAINER.md](docs/MAINTAINER.md) - Maintainer guide
- [docs/QGIS_ATTRIBUTE_PRESERVATION.md](docs/QGIS_ATTRIBUTE_PRESERVATION.md) - QGIS data layer documentation
