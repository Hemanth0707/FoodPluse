import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0B0B] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-6 text-4xl shadow-[0_0_30px_rgba(239,68,68,0.3)]">
            ⚠️
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Oops! Something went wrong.</h1>
          <p className="text-gray-400 mb-8 max-w-md">The application encountered an unexpected error. Please try refreshing the page or navigating back home.</p>
          <div className="flex gap-4">
            <button 
              className="px-6 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-500 transition-colors"
              onClick={() => window.location.href = '/'}
            >
              Go to Home
            </button>
            <button 
              className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
