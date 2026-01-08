import { serve } from "@hono/node-server";
import { Hono } from "hono";
import pkg from "../../../package.json" with { type: "json" };

const app = new Hono();
const APP_VERSION = pkg.version;

app.get("/api", (c) => {
  return c.json({
    message: "Hello from the backend API!",
    version: APP_VERSION,
  });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
