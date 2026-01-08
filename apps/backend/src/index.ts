import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/api", (c) => {
  return c.json({ message: "Hello from the backend API!" });
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
