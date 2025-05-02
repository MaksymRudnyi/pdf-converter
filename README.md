# 📄 Text to PDF Converter

A simple React app that allows users to convert any text into a PDF document using an external API.

![Vite](https://img.shields.io/badge/Vite-frontend-blue)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?logo=tailwindcss)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

---

## ✨ Features

- Text input for any length
- Convert to PDF via HTTP API
- View generated PDF in the browser (`<iframe>`)
- Save conversion history locally using IndexedDB
- Delete individual PDFs or clear entire history
- Built with Vite + React + Tailwind CSS + TypeScript

---

## 🛠 Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/pdf-converter.git
cd pdf-converter
```

### 2. Install dependencies

`npm install`

### 3. Create environment file

`cp .env.sample .env`
Then update .env with your actual API credentials:

```
VITE_PDF_API_URL=http://your-api-url.com/create-pdf
VITE_PDF_API_KEY=your-api-key
```

### 4. Run the app

```
npm run dev
```
