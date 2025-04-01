import type { Route } from './+types/_layout.notes._index';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { z } from 'zod'
import { zx } from 'zodix'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Button } from '~/components/ui/button';
import { createClient } from '~/lib/supabase/supabaseServer';


export async function loader( { request }: Route.LoaderArgs ) {
  const { supabase } = createClient( request )

  try {
    const { data: notes } = await supabase
      .from( 'notes' )
      .select( '*' )

    return { notes: notes || [] };
  } catch ( error ) {
    // This will show up in the UI
    throw new Error( `Failed to load notes: ${error}` );
  }
}


// Form validation schema
const createNoteSchema = z.object( {
  title: z.string().min( 1, "Title is required" ),
  content: z.string().min( 1, "Content is required" ),
} );

// Action to handle form submission
export async function action( { request }: Route.ActionArgs ) {
  const formData = await zx.parseForm( request, createNoteSchema );
  const { supabase } = createClient( request );
  const { data: { session } } = await supabase.auth.getSession();
  console.log( session );
  console.log( formData );


  try {
    await supabase
      .from( 'notes' )
      .insert( [
        {
          title: formData.title,
          content: formData.content,
          user_id: session?.user.id
        }
      ] )
      .select();

    return { success: true, error: null };
  } catch ( error ) {
    console.log( error );
    throw new Error( `Failed to create note: ${error.message}` );
  }
}

export default function Notes( { loaderData }: Route.ComponentProps ) {

  if ( !loaderData.notes ) {
    return <div>No notes found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="grid gap-4">
        {loaderData.notes.map( ( note ) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {note.content}
            </CardContent>
          </Card>
        ) )}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">
            Create New Note
          </Button>
        </DialogTrigger>
        <DialogContent id="dialog">
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
            <DialogDescription>
              Add a new note to your collection
            </DialogDescription>
          </DialogHeader>
          <form method="POST" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Note title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your note here..."
                required
                className="min-h-[100px]"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save Note</Button>
            </div>
          </form>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div >
  );
}
