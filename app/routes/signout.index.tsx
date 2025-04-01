import { redirect } from "react-router";
import { createClient } from "~/lib/supabase/supabaseServer";
import type { Route } from "./+types/signout.index";

export async function loader( { request }: Route.LoaderArgs ) {
    const { supabase } = createClient( request )
    await supabase.auth.signOut()

    return redirect( '/home' )
}
