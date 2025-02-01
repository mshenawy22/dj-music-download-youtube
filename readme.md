# YouTube Audio Downloader

A modern web application that allows users to download YouTube videos as high-quality MP3 files. Built with React for the frontend and Node.js/Express for the backend, utilizing yt-dlp for reliable YouTube downloads.

## Features

- 🎵 Download YouTube videos as MP3 files
- 🎨 Clean, modern user interface
- 📱 Responsive design - works on desktop and mobile
- 🔊 Highest quality audio extraction
- 🚀 Fast download speeds
- 💾 Original video title preservation

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp#installation)
- [ffmpeg](https://ffmpeg.org/download.html)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/youtube-audio-downloader.git
cd youtube-audio-downloader
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

## Development Setup

1. Start the backend server:
```bash
cd server
node server.js
```
The server will run on http://localhost:3001

2. Start the frontend development server:
```bash
cd client
npm run dev
```
The frontend will run on http://localhost:5173

## Usage

1. Open your browser and navigate to http://localhost:5173
2. Paste a YouTube video URL into the input field
3. Click "Download Audio"
4. Wait for the download to complete
5. The MP3 file will be automatically downloaded to your default downloads folder

## Project Structure

```
youtube-audio-downloader/
├── client/                 # React frontend
│   ├── src/               # Source files
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend
│   ├── server.js         # Express server
│   └── package.json      # Backend dependencies
└── README.md             # Project documentation
```

## Technology Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Lucide Icons

### Backend
- Node.js
- Express
- yt-dlp
- ffmpeg

## Configuration

### Frontend
The frontend configuration is located in `client/vite.config.js`. You can modify:
- Port number
- Build settings
- Development server settings

### Backend
The backend server can be configured through environment variables:
- `PORT`: Server port (default: 3001)
- `HOST`: Server host (default: '0.0.0.0')

## Network Access

To access the application from other devices on your network:

1. Find your computer's IP address:
   - On Mac/Linux: `ifconfig`
   - On Windows: `ipconfig`

2. Other devices can access the app at:
   - `http://YOUR_IP_ADDRESS:5173` (development)
   - `http://YOUR_IP_ADDRESS:3001` (production)

## Troubleshooting

### Common Issues

1. "yt-dlp: command not found"
   - Ensure yt-dlp is installed and accessible in your system PATH
   - Try reinstalling yt-dlp

2. "ffmpeg: command not found"
   - Install ffmpeg using your system's package manager
   - Make sure ffmpeg is in your system PATH

3. "Failed to download audio"
   - Check your internet connection
   - Verify the YouTube URL is valid
   - Ensure you have sufficient disk space

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) for the amazing YouTube download functionality
