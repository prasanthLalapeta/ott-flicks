# OTT Flicks

OTT Flicks is a web application that extracts movie information from images. Upload an image containing OTT release details, and the app will identify movie titles, streaming platforms, and fetch IMDb ratings automatically.

## Features

- Extract text from images using Tesseract.js
- Identify movie titles, platforms, and languages
- Fetch movie details from OMDB API
- Responsive design with a clean interface
- Real-time processing and display

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Tesseract.js for OCR
- OMDB API for movie details
- Framer Motion for animations

## Getting Started

### Prerequisites

1. Get your OMDB API key:
   - Visit [OMDB API](http://www.omdbapi.com/apikey.aspx)
   - Choose the FREE tier (1,000 daily limit)
   - Enter your email and verify it
   - You'll receive your API key via email

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies
npm install

# Step 4: Create a .env file in the root directory
touch .env

# Step 5: Add your OMDB API key to the .env file
echo "VITE_OMDB_API_KEY=your_api_key_here" > .env

# Step 6: Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory with the following:

```env
VITE_OMDB_API_KEY=your_api_key_here  # Replace with your actual OMDB API key
```

## Current Support

Currently supporting images from [Aakashavaani](https://x.com/hashtag/AKVOTT?src=hashtag_click)

## Developer

Developed by [@heylalapeta](https://x.com/heylalapeta)

## License

MIT