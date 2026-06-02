import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <h1 className="text-6xl font-bold text-cyan-900 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-cyan-700 transition">
        Return Home
      </Link>
    </div>
  );
}
