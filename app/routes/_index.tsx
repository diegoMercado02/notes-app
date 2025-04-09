import { redirect } from "react-router";
import { createClient } from "~/lib/supabase/server";

export async function loader( request: Request ) {
    try {
      const { supabase } = createClient( request );
      const userResponse = await supabase.auth.getUser();

      if ( !userResponse?.data?.user ) {
        throw redirect( '/login' );
      } else {
        throw redirect( '/home' );
      }
    } catch ( error ) {
        console.error( error );
        return redirect( '/login' );
      }
  }
