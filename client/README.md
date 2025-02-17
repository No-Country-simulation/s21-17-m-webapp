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

# Color Palette

Below is the custom color palette used in the project, including color previews for all levels:

| Type          | Level   | HEX Value | Color Preview                                                             |
| ------------- | ------- | --------- | ------------------------------------------------------------------------- |
| **Primary**   | DEFAULT | `#d3d239` | <div style="background-color: #d3d239; width: 50px; height: 20px;"></div> |
|               | 50      | `#fafae0` | <div style="background-color: #fafae0; width: 50px; height: 20px;"></div> |
|               | 100     | `#f2f2b2` | <div style="background-color: #f2f2b2; width: 50px; height: 20px;"></div> |
|               | 200     | `#eaea80` | <div style="background-color: #eaea80; width: 50px; height: 20px;"></div> |
|               | 300     | `#e1e14d` | <div style="background-color: #e1e14d; width: 50px; height: 20px;"></div> |
|               | 400     | `#dada26` | <div style="background-color: #dada26; width: 50px; height: 20px;"></div> |
|               | 500     | `#d3d239` | <div style="background-color: #d3d239; width: 50px; height: 20px;"></div> |
|               | 600     | `#c1c100` | <div style="background-color: #c1c100; width: 50px; height: 20px;"></div> |
|               | 700     | `#a7a700` | <div style="background-color: #a7a700; width: 50px; height: 20px;"></div> |
|               | 800     | `#8f8f00` | <div style="background-color: #8f8f00; width: 50px; height: 20px;"></div> |
|               | 900     | `#646400` | <div style="background-color: #646400; width: 50px; height: 20px;"></div> |
| **Secondary** | DEFAULT | `#f59f19` | <div style="background-color: #f59f19; width: 50px; height: 20px;"></div> |
|               | 50      | `#fff5e0` | <div style="background-color: #fff5e0; width: 50px; height: 20px;"></div> |
|               | 100     | `#ffe0b2` | <div style="background-color: #ffe0b2; width: 50px; height: 20px;"></div> |
|               | 200     | `#ffcc80` | <div style="background-color: #ffcc80; width: 50px; height: 20px;"></div> |
|               | 300     | `#ffb74d` | <div style="background-color: #ffb74d; width: 50px; height: 20px;"></div> |
|               | 400     | `#ffa726` | <div style="background-color: #ffa726; width: 50px; height: 20px;"></div> |
|               | 500     | `#f59f19` | <div style="background-color: #f59f19; width: 50px; height: 20px;"></div> |
|               | 600     | `#fb8c00` | <div style="background-color: #fb8c00; width: 50px; height: 20px;"></div> |
|               | 700     | `#f57c00` | <div style="background-color: #f57c00; width: 50px; height: 20px;"></div> |
|               | 800     | `#ef6c00` | <div style="background-color: #ef6c00; width: 50px; height: 20px;"></div> |
|               | 900     | `#e65100` | <div style="background-color: #e65100; width: 50px; height: 20px;"></div> |
| **Accent**    | DEFAULT | `#04041a` | <div style="background-color: #04041a; width: 50px; height: 20px;"></div> |
|               | 50      | `#e0e0f7` | <div style="background-color: #e0e0f7; width: 50px; height: 20px;"></div> |
|               | 100     | `#b2b2eb` | <div style="background-color: #b2b2eb; width: 50px; height: 20px;"></div> |
|               | 200     | `#8080de` | <div style="background-color: #8080de; width: 50px; height: 20px;"></div> |
|               | 300     | `#4d4dd0` | <div style="background-color: #4d4dd0; width: 50px; height: 20px;"></div> |
|               | 400     | `#2626c6` | <div style="background-color: #2626c6; width: 50px; height: 20px;"></div> |
|               | 500     | `#04041a` | <div style="background-color: #04041a; width: 50px; height: 20px;"></div> |
|               | 600     | `#0000b2` | <div style="background-color: #0000b2; width: 50px; height: 20px;"></div> |
|               | 700     | `#00009a` | <div style="background-color: #00009a; width: 50px; height: 20px;"></div> |
|               | 800     | `#000080` | <div style="background-color: #000080; width: 50px; height: 20px;"></div> |
|               | 900     | `#000064` | <div style="background-color: #000064; width: 50px; height: 20px;"></div> |
| **Neutral**   | DEFAULT | `#fefedc` | <div style="background-color: #fefedc; width: 50px; height: 20px;"></div> |
|               | 50      | `#fffffe` | <div style="background-color: #fffffe; width: 50px; height: 20px;"></div> |
|               | 100     | `#fefefb` | <div style="background-color: #fefefb; width: 50px; height: 20px;"></div> |
|               | 200     | `#fdfde0` | <div style="background-color: #fdfde0; width: 50px; height: 20px;"></div> |
|               | 300     | `#fcfcc4` | <div style="background-color: #fcfcc4; width: 50px; height: 20px;"></div> |
|               | 400     | `#fbfba9` | <div style="background-color: #fbfba9; width: 50px; height: 20px;"></div> |
|               | 500     | `#fefedc` | <div style="background-color: #fefedc; width: 50px; height: 20px;"></div> |
|               | 600     | `#e0e0c4` | <div style="background-color: #e0e0c4; width: 50px; height: 20px;"></div> |
|               | 700     | `#c4c4a9` | <div style="background-color: #c4c4a9; width: 50px; height: 20px;"></div> |
|               | 800     | `#a9a98f` | <div style="background-color: #a9a98f; width: 50px; height: 20px;"></div> |
|               | 900     | `#8f8f75` | <div style="background-color: #8f8f75; width: 50px; height: 20px;"></div> |
