// import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
// import { createClient as createBrowserClient } from "@supabase/supabase-js";

// export function createClient(request?: Request) {
//     if (typeof window === "undefined") {
//         // Server-side
//         if (!request) {
//             throw new Error("Request object is required on the server");
//         }

//         return createServerClient(
//             import.meta.env.VITE_SUPABASE_URL!,
//             import.meta.env.VITE_SUPABASE_API_KEY!,
//             {
//                 cookies: {
//                     getAll() {
//                         const cookieHeader = request.headers.get("Cookie") ?? "";
//                         const cookies = parseCookieHeader(cookieHeader);
//                         return cookies.map(cookie => ({
//                             name: cookie.name,
//                             value: cookie.value ?? "",
//                         }));
//                     },
//                     setAll(cookiesToSet) {
//                         cookiesToSet.forEach(({ name, value, options }) =>
//                             serializeCookieHeader(name, value, options)
//                         );
//                     },
//                 },
//             }
//         );
//     } else {
//         // Client-side
//         return createBrowserClient(
//             import.meta.env.VITE_SUPABASE_URL!,
//             import.meta.env.VITE_SUPABASE_ANON_KEY!
//         );
//     }
// }
