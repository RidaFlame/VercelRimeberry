# Rimeberry Website

A modern, multilingual website for Rimeberry group featuring products including fruits, vegetables, cheese, chocolates, and yogurt.

## Features

- 🌍 **Multilingual Support**: French, English, and Arabic
- 📱 **Responsive Design**: Works on all devices
- 🎨 **Modern UI**: Built with React, Tailwind CSS, and Framer Motion
- 🚀 **Fast Performance**: Optimized with Vite

## Tech Stack

- **React 18** - UI framework
- **Vite 5** - Build tool
- **React Router** (HashRouter) - Client-side routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **i18next** - Internationalization
- **React i18next** - React integration for i18n

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd swaray-website
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Deployment

This project is configured for deployment to Vercel or any modern hosting platform.

### Vercel Deployment

1. Push your code to your Git repository
2. Import your repository in Vercel
3. Vercel will automatically detect Vite and configure the build settings
4. Deploy!

The project uses HashRouter which works perfectly with Vercel's serverless functions.

## Project Structure

```
swaray-website/
├── public/
│   └── images/          # Static images
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── data/            # Product data
│   ├── i18n/            # Translation files
│   ├── utils/           # Utility functions
│   ├── hooks/           # Custom React hooks
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies
```

## Configuration

### Base Path Configuration

The project uses HashRouter, which works with any base path. The base path is configured in `vite.config.js`:

- **Development**: `/` (default)
- **Production**: `/` (root path for Vercel)

### Environment Variables

Create a `.env` file in the root directory (optional):

```env
VITE_FORMSPREE_ENDPOINT=your_formspree_endpoint
```

## Troubleshooting

### Build Errors

1. Make sure all dependencies are installed: `npm install`
2. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
3. Check Node.js version: Should be 18 or higher

### Image Loading Issues

All images use the `getImagePath()` utility function which automatically handles the base path for deployment.

## License

Private project - All rights reserved

## Contact

For questions or issues, please contact the development team.
