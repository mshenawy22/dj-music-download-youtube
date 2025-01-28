const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const execAsync = promisify(exec);

const app = express();

// More specific CORS configuration
app.use(cors({
  origin: '*',  // Be more specific in production
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(express.json());

// Create temporary directory if it doesn't exist
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

app.post('/download', async (req, res) => {
    const { url } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Get the video info first to get the title
        const infoCommand = `yt-dlp --get-filename -o "%(title)s.%(ext)s" "${url}"`;
        const { stdout: fileName } = await execAsync(infoCommand);
        const safeFileName = fileName.trim().replace(/\.[^/.]+$/, '') + '.mp3';

        // Download and convert to MP3
        const downloadCommand = `cd "${tempDir}" && yt-dlp -f "bestaudio/best" -x --audio-format mp3 --audio-quality 0 --extract-audio -o "%(title)s.%(ext)s" "${url}"`;
        await execAsync(downloadCommand);

        // Find the downloaded file
        const filePath = path.join(tempDir, safeFileName);

        // Set headers for file download
        res.setHeader('Content-Disposition', `attachment; filename="${safeFileName}"`);
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

        // Stream the file to client
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);

        // Delete the file after sending
        stream.on('end', () => {
            fs.unlink(filePath, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Download failed', details: error.message });
    }
});

// Add a test endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running' });
});

app.listen(3001, '0.0.0.0', () => {
    console.log('Server running on port 3001');
    console.log('Server accessible at:');
    // Get local IP address
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                console.log(`http://${net.address}:3001`);
            }
        }
    }
});