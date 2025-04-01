import { redirect } from "react-router";
import type { Route } from "./+types/_index";

export async function loader( { request, params }: Route.LoaderArgs ) {
    return redirect( '/home' );
  }

  export async function action( { request }: Route.ActionArgs ) {
    // Get the form data
    const formData = await request.formData();
    console.log( formData )
    // Handle the form submission
    // For now, just redirect to the login page
    return redirect( '/login' );
}