import type { Config } from "@react-router/dev/config";

declare module "react-router" {
  interface Future {
    unstable_middleware: true; // 👈 Enable middleware types
  }
}

export default {
  future: {
    unstable_middleware: true, // 👈 Enable middleware
  },
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
} satisfies Config;
