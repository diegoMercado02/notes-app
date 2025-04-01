import { Link } from 'react-router';
import type { Route } from './+types/_layout.home._index';
import { Button } from '~/components/ui/button';

export async function loader( { request, params }: Route.LoaderArgs ) {
  return null;
}

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-6">
            Welcome to Your Personal Notes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            A simple and powerful way to organize your thoughts, ideas, and tasks in one place.
          </p>
          <Link to="/notes">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6">
              Go to My Notes
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Notes</h3>
            <p className="text-gray-600">
              Quickly create and organize your notes with our intuitive interface.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Sync</h3>
            <p className="text-gray-600">
              Your notes automatically sync across all your devices in real-time.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Storage</h3>
            <p className="text-gray-600">
              All your notes are securely stored and protected with end-to-end encryption.
            </p>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 mr-4">1</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Sign In</h3>
                <p className="text-gray-600">Create an account or sign in to access your notes.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 mr-4">2</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Create a Note</h3>
                <p className="text-gray-600">Click the button to start writing your thoughts.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 mr-4">3</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Organize</h3>
                <p className="text-gray-600">Use tags and categories to keep your notes organized.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <Link to="/notes">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Start Taking Notes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
