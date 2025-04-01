import { supabase } from '../lib/supabase';
import { redirect } from 'react-router';
import type { Route } from './+types/login._index';
import { createUserSession, getUserSession } from '~/lib/session.server';
import { z } from 'zod';
import {zx} from 'zodix'
import { SignupForm } from '~/components/signup-form';

export async function loader( { request }: Route.LoaderArgs ) {
    const session = await getUserSession( request )
    const userId = session.get( 'userId' );
    
    if ( userId ) {
        return redirect( '/' );
    }

    return null
}
  
  
const formDataSchema = z.object( {
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string()
} );

export async function action( { request }: Route.ActionArgs ) {
    const formData = await zx.parseForm( request, formDataSchema );
    try {
        const { data, error } = await supabase.auth.signUp( {
            email: formData.email,
            password: formData.password,
        } );
                
        if ( data.session ) {
            return createUserSession( data.session.access_token, '/' );
        }
        
        return { error: 'No session created' };
    } catch ( error ) {
        console.log( error )
        return { error: error instanceof Error ? error.message : 'An error occurred' };
    }
}

export default function Login() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}