import { redirect } from "react-router";
import { supabase } from "~/lib/supabase";
import type { Route } from "./+types/signout.index";

export async function loader({ request, params }: Route.LoaderArgs) {

    await supabase.auth.signOut()

    return redirect('/home')
}