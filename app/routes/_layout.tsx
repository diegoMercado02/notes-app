import { Outlet, useLoaderData, Link, Form } from 'react-router';
import { supabase } from '~/lib/supabase';
import { getUserSession } from '~/lib/session.server';
import type { Route } from './+types/_layout';
import { Button } from '~/components/ui/button';

export async function loader({ request, params }: Route.LoaderArgs) {
  const session = await getUserSession(request);
  const userId = session.get('userId');

  return {
    isSignedIn: !!userId
  };
}

export default function PageLayout({ loaderData }: Route.ComponentProps) {

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/home" className="text-2xl font-semibold text-gray-900 hover:text-indigo-600">
              Notes App
            </Link>
            <div className="flex items-center space-x-4">
              {loaderData.isSignedIn ? (
                <>
                  <Link to="/notes">
                    <Button variant="ghost">My Notes</Button>
                  </Link>
                  <Link to='/signout'>
                    <input name='signOut' />
                    <Button
                      variant="outline"
                    >
                      Sign Out
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
