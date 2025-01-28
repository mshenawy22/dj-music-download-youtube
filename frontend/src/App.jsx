import React, { useState } from 'react';
import { Youtube, Download } from 'lucide-react';



function App() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateYouTubeUrl = (url) => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return pattern.test(url);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (!validateYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get your server IP address - replace with your actual IP
      const SERVER_IP = 'http://192.168.68.133:3001';
      
      const response = await fetch(`${SERVER_IP}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
        mode: 'cors'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Download failed');
      }

      // Create a blob from the response
      const blob = await response.blob();
      
      if (blob.size === 0) {
        throw new Error('Downloaded file is empty');
      }
      
      // Create a download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      
      // Get filename from Content-Disposition header or use a default
      const contentDisposition = response.headers.get('content-disposition');
      const fileName = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : 'audio.mp3';
      
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);

    } catch (error) {
      console.error('Download error:', error);
      setError(`Failed to download audio: ${error.message}`);
    } finally {
      setLoading(false);
    }
};



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex items-center justify-center space-x-3">
          <Youtube className="text-red-600 w-8 h-8" />
          <h1 className="text-2xl font-bold text-gray-900">
            YouTube Audio Downloader
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter YouTube URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            />
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg border-l-4 border-red-500">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              'Processing...'
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Audio
              </>
            )}
          </button>
          
        </form>

        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Instructions:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Paste a YouTube video URL in the input field above</li>
            <li>Click the Download Audio button</li>
            <li>The audio will be downloaded in MP3 format</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

// Make sure this line is present
export default App;