import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { Button } from "./components/ui/button";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader( { request, params }: Route.LoaderArgs ) {
  return null;
}

export function Layout( { children }: { children: React.ReactNode } ) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary( { error }: Route.ErrorBoundaryProps ) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if ( isRouteErrorResponse( error ) ) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if ( import.meta.env.DEV && error && error instanceof Error ) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center p-8">
      <Alert variant="destructive" className="max-w-2xl w-full flex flex-col gap-6">
        <AlertTitle className="text-4xl">{message}</AlertTitle>
        <AlertDescription className="flex flex-col gap-6 w-full">
          {details}
          {stack && (
            <pre className="mt-4 rounded-lg bg-destructive/10 p-4 overflow-x-auto font-mono text-sm">
              <code>{stack}</code>
            </pre>
          )}
          <Link to={'/'} className="self-end">
            <Button variant="outline">
              Go to Home
            </Button>
          </Link>
        </AlertDescription>

      </Alert>
    </main>
  );
}
