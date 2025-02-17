# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Package Manager

This project uses [npm](https://www.npmjs.com/), a widely-used package manager for JavaScript.

For more information on `npm`, you can check out the [npm documentation](https://docs.npmjs.com/).

## Setup Guide

### Download all dependencies

Run the following command to install all dependencies:

```
npm install
```

### Start development

Run the following command to start the development server:

```
npm run dev
```

### Build frontend

Run the following command to build the project for production:

```
npm run build
```

## Architecture
```
└── 📁src
    └── 📁app
        └── 📁config
            └── .gitkeep
        └── 📁providers
            └── .gitkeep
        └── 📁routes
            └── .gitkeep
    └── 📁assets
        └── .gitkeep
        └── react.svg
    └── 📁features
        └── 📁artisans
            └── 📁components
                └── .gitkeep
            └── 📁hooks
                └── .gitkeep
            └── 📁pages
                └── .gitkeep
            └── 📁services
                └── .gitkeep
            └── 📁store
                └── .gitkeep
        └── 📁auth
            └── 📁components
                └── .gitkeep
            └── 📁hooks
                └── .gitkeep
            └── 📁pages
                └── .gitkeep
            └── 📁services
                └── .gitkeep
            └── 📁store
                └── .gitkeep
        └── 📁cart
            └── 📁components
                └── .gitkeep
            └── 📁hooks
                └── .gitkeep
            └── 📁pages
                └── .gitkeep
            └── 📁services
                └── .gitkeep
            └── 📁store
                └── .gitkeep
        └── 📁checkout
            └── 📁components
                └── .gitkeep
            └── 📁hooks
                └── .gitkeep
            └── 📁pages
                └── .gitkeep
            └── 📁services
                └── .gitkeep
            └── 📁store
                └── .gitkeep
        └── 📁home
            └── 📁components
                └── .gitkeep
            └── 📁hooks
                └── .gitkeep
            └── 📁pages
                └── .gitkeep
            └── 📁services
                └── .gitkeep
            └── 📁store
                └── .gitkeep
        └── 📁orders
            └── 📁components
                └── .gitkeep
            └── 📁hooks
                └── .gitkeep
            └── 📁pages
                └── .gitkeep
            └── 📁services
                └── .gitkeep
            └── 📁store
                └── .gitkeep
        └── 📁products
            └── 📁components
                └── .gitkeep
            └── 📁hooks
                └── .gitkeep
            └── 📁pages
                └── .gitkeep
            └── 📁services
                └── .gitkeep
            └── 📁store
                └── .gitkeep
        └── 📁profile
            └── 📁components
                └── .gitkeep
            └── 📁hooks
                └── .gitkeep
            └── 📁pages
                └── .gitkeep
            └── 📁services
                └── .gitkeep
            └── 📁store
                └── .gitkeep
    └── 📁shared
        └── 📁components
            └── .gitkeep
        └── 📁constants
            └── .gitkeep
        └── 📁hooks
            └── .gitkeep
        └── 📁styles
            └── .gitkeep
        └── 📁utils
            └── .gitkeep
    └── App.css
    └── App.jsx
    └── index.css
    └── main.jsx
```