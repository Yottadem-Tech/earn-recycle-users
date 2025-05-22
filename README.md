# EarnRecycle User Interface

A modern web application for users to manage their recycling requests and earnings.

## Features

- Submit recycling requests with location and photos
- Track request status and history
- View earnings and statistics
- Manage profile and payment settings
- Interactive map integration
- Real-time notifications

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- React Query for data fetching
- React Leaflet for maps
- Vite for build tooling

## Prerequisites

- Node.js 16.x or later
- npm 7.x or later

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run serve
   ```

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/         # Page components
  ├── hooks/         # Custom React hooks
  ├── services/      # API and external service integrations
  ├── utils/         # Helper functions and utilities
  ├── types/         # TypeScript type definitions
  ├── App.tsx        # Main application component
  └── main.tsx       # Application entry point
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=your_api_url
VITE_MAPS_API_KEY=your_maps_api_key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT 