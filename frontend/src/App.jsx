import { useState } from "react"
import axios from 'axios';
import './App.css'

function App() {
  const [url, setUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const response = await axios.post("http://localhost:4000/url/add", { url });
      console.log(response.data);
      setNewUrl(response.data.newUrl);
    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(newUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const resetForm = () => {
    setUrl("");
    setNewUrl("");
    setError("");
    setCopied(false);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">URL Shortener</h1>
          <p className="text-white/80 text-lg">Transform your long URLs into short, shareable links</p>
        </div>

        {/* Main Card */}
        <div className="glass-effect rounded-2xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* URL Input */}
            <div className="space-y-2">
              <label htmlFor="url" className="block text-sm font-semibold text-gray-700">
                Enter your URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/very-long-url"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white/90"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <input className="pl-12" />
              </div>
              {error && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Shortening...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Shorten URL
                </>
              )}
            </button>
          </form>

          {/* Result Section */}
          {newUrl && (
            <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-green-800">URL Shortened Successfully!</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
                  <input
                    type="text"
                    value={newUrl}
                    readOnly
                    className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 font-mono text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                      copied 
                        ? 'bg-green-100 text-green-700 copy-animation' 
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {copied ? (
                      <>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={resetForm}
                  className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
                >
                  Shorten Another URL
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            Fast, secure, and reliable URL shortening service
          </p>
        </div>
      </div>
    </div>
  )
}

export default App