import { useLoaderData } from 'react-router';
import { redirect } from 'react-router';
import type { Route } from './+types/_layout.notes._index';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { getUserSession } from '~/lib/session.server';
import { supabase } from '~/lib/supabase';
import {z} from 'zod'
import {zx} from 'zodix'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Button } from '~/components/ui/button';


export async function loader({ request }: Route.LoaderArgs) {
  try {
    const session = await getUserSession(request);
    const userId = session.get('userId');

    if (!userId) {
      return redirect('/login');
    }

    const { data: notes, error } = await supabase
      .from('notes')
      .select('*')

    if (error) throw error;

    return { notes: notes || [] };
  } catch (error) {
    // This will show up in the UI
    throw new Error(`Failed to load notes: ${error}`);
  }
}


// Form validation schema
const createNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

// Action to handle form submission
export async function action({ request }: Route.ActionArgs) {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      return redirect('/login');
    }

    const formData = await zx.parseForm(request, createNoteSchema);

    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          title: formData.title,
          content: formData.content,
          user_id: session.user.id
        }
      ])
      .select();

    if (error) {
      throw new Error(`Failed to create note: ${error.message}`);
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export default function Notes() {
  const { notes } = useLoaderData<typeof loader>();

  if (!notes) {
    return <div>No notes found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="grid gap-4">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {note.content}
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4" onClick={() => document.getElementById('dialog')?.showModal()}>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
