import type { Route } from './+types/_layout.notes._index';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
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
import { createClient } from '~/lib/supabase/server';
import { errorResponse } from '~/lib/utils';
import { Switch } from '~/components/ui/switch';
import { useSearchParams } from 'react-router';
import { useState } from 'react';

const loaderQuerySchema = z.object( {
  all: z.string( ).optional(),
} )

export async function loader( { request }: Route.LoaderArgs ) {
  const loaderQuery = zx.parseQuery( request, loaderQuerySchema );
  const { supabase } = createClient( request )

  try {
    let notes;
    if ( loaderQuery.all ) {
      const { data } = await supabase
        .from( 'notes' )
        .select( '*' );
      notes = data || [];
    } else {
      const user = await supabase.auth.getUser();
      console.log( user )

      const { data } = await supabase
        .from( 'notes' )
        .select( '*' )
        .eq( 'user_id', user?.data?.user?.id );
      notes = data || [];
    }

    return { notes };
  } catch ( e ) {
    return errorResponse( e, "Failed to load notes" );
  }
}


const createNoteSchema = z.object( {
  action: z.literal( "create-note" ),
  title: z.string().min( 1, "Title is required" ),
  content: z.string().min( 1, "Content is required" ),
} );

const updateNoteSchema = z.object( {
  action: z.literal( "update-note" ),
  noteId: z.string().min( 1, "Note ID is required" ),
  title: z.string().min( 1, "Title is required" ),
  content: z.string().min( 1, "Content is required" ),
} );

const deleteNoteSchema = z.object( {
  action: z.literal( "delete-note" ),
  noteId: z.string().min( 1, "Note ID is required" ),
} );

const actionFormSchema = z.union( [createNoteSchema, updateNoteSchema, deleteNoteSchema] );

export async function action( { request }: Route.ActionArgs ) {
  const { supabase } = createClient( request );
  const formData = await zx.parseForm( request, actionFormSchema );

  try {
    const userResponse = await supabase.auth.getUser();
    if ( !userResponse ) {
      return errorResponse( new Error( 'User not found' ), "Failed to find user" );
    }

    const actions = {
      'delete-note': async () => {
        if ( formData.action !== 'delete-note' ) {
          return;
        }
        return supabase
          .from( 'notes' )
          .delete( )
          .eq( 'id', formData.noteId )
          .eq( 'user_id', userResponse?.data?.user?.id );
      },
      'update-note': async () => {
        if ( formData.action !== 'update-note' ) {
          return;
        }
        return supabase
          .from( 'notes' )
          .update( {
            title: formData.title,
            content: formData.content,
          } )
          .eq( 'id', formData.noteId )
          .eq( 'user_id', userResponse?.data?.user?.id );
      },
      'create-note': async () => {
        if ( formData.action !== 'create-note' ) {
          return;
        }
        return await supabase
          .from( 'notes' )
          .insert( [
            {
              title: formData.title,
              content: formData.content,
              user_id: userResponse?.data?.user?.id
            }
          ] )
          .select();
      }
    };

    const response = await actions[formData.action]();
    console.log( response )

    return { success: true, error: null };
  } catch ( e ) {
    throw errorResponse( e, "Failed to create note" );
  }
}

export default function Notes( { loaderData }: Route.ComponentProps ) {
  const [ , setSearchParams] = useSearchParams( );
  const [selectedAction, setSelectedAction] = useState( '' );
  const [ selectedNote, setSelectedNote ] = useState( '' );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className='flex flex-col gap-1.5'>
        <Label>Show all</Label>
        <Switch id="notes" defaultValue="all" className="mb-4" onCheckedChange={ ( checked ) => setSearchParams( { all: checked ? 'true' : '' } ) }/>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {loaderData.notes.map( ( note ) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {note.content}
            </CardContent>
            <CardFooter className="flex justify-end gap-2 mt-2">
              <Button
                variant="secondary"
                onClick={() => {
            setSelectedAction( 'update-note' );
            setSelectedNote( note );
          }}
              >
                Update
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
            setSelectedAction( 'delete-note' );
            setSelectedNote( note );
          }}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ) )}
      </div>
      <Dialog open={selectedAction === 'create-note'}>
        <DialogTrigger asChild>
          <Button onClick={() => {
            setSelectedAction( 'create-note' );
            setSelectedNote( '' );
          }}>
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
            <input type="hidden" name="action" value="create-note" />
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
              <Button type="button" variant="secondary" onClick={() => {
                setSelectedAction( '' );
                setSelectedNote( '' );
              }
              }>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={selectedAction === 'update-note'}>
        <DialogContent id="dialog">
          <DialogHeader>
            <DialogTitle>Update Note</DialogTitle>
            <DialogDescription>
              Modify an existing note
            </DialogDescription>
          </DialogHeader>
          <form method="POST" className="space-y-4">
            <input type="hidden" name="action" value="update-note" />
            <input type="hidden" name="noteId" value={selectedNote.id} />
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                defaultValue={selectedNote.title}
                name="title"
                placeholder="Updated note title"
                required
          />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                defaultValue={selectedNote.content}
                name="content"
                placeholder="Update your note content here..."
                required
                className="min-h-[100px]"
          />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Update Note</Button>
            </div>
          </form>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={() => {
                setSelectedAction( '' );
                setSelectedNote( '' );
              }
              }>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedAction === 'delete-note'}>
        <DialogContent id="dialog">
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogDescription>
              Permanently remove a note
            </DialogDescription>
          </DialogHeader>
          <form method="POST" className="space-y-4">
            <input type="hidden" name="action" value="delete-note" />
            <div className="space-y-2">
              <input value={selectedNote.id}/>
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="destructive">
                Delete Note
              </Button>
            </div>
          </form>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={() => {
                setSelectedAction( '' );
                setSelectedNote( '' );
              }
              }>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div >
  );
}
