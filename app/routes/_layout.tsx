import { Outlet, Link } from 'react-router';
import type { Route } from './+types/_layout';
import { Button } from '~/components/ui/button';
import { createClient } from '~/lib/supabase/server';

export async function loader( { request }: Route.LoaderArgs ) {
  const { supabase } = createClient( request );
  const session = await supabase.auth.getSession();
  const isSignedIn = session.data.session !== undefined;

  return {
    isSignedIn: isSignedIn,
  };
}

export default function PageLayout( { loaderData }: Route.ComponentProps ) {

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center container">
            <Link
              to="/home"
              className="text-2xl font-bold text-gray-900 hover:text-indigo-600">
              Notes App
            </Link>
            <div className="flex items-center space-x-6">
              {loaderData.isSignedIn ? (
                <>
                  <Link
                    to="/notes"
                    className="text-gray-700 hover:text-indigo-600">
                    Notes
                  </Link>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-indigo-600">
                    Profile
                  </Link>
                  <Link to="/logout">
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50">
                      Log Out
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      className="hover:text-indigo-600">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
