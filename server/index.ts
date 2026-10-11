import "dotenv/config";
import { randomUUID } from "node:crypto";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

// Safety check
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}


const app = express();
app.disable("x-powered-by");
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
    requestId: string;
  }
}

app.use((req, res, next) => {
  const supplied = req.get("X-Request-Id");
  const isUuid = typeof supplied === "string"
    && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(supplied);
  req.requestId = isUuid ? supplied : randomUUID();
  res.setHeader("X-Request-Id", req.requestId);
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (process.env.NODE_ENV === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  next();
});

app.use(
  express.json({
    limit: "32kb",
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false, limit: "16kb" }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      log(`${req.method} ${path} ${res.statusCode} in ${duration}ms requestId=${req.requestId}`);
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const isMalformedJson = err?.type === "entity.parse.failed";
    const isRequestTooLarge = err?.type === "entity.too.large";
    const status = isMalformedJson ? 400 : isRequestTooLarge ? 413 : err.status || err.statusCode || 500;
    const message = isMalformedJson
      ? "Malformed JSON request"
      : isRequestTooLarge
        ? "Request body too large"
        : status >= 500
          ? "Internal Server Error"
          : err.message || "Request failed";

    if (status >= 500) {
      const errorName = err instanceof Error ? err.name : "UnknownError";
      console.error("Unhandled API error", { requestId: _req.requestId, errorName });
    }

    if (res.headersSent) return next(err);
    return res.status(status).json({ message });
  });

  // In production, serve built static assets.
  // In dev, setup Vite middleware.
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);

  // Windows-friendly listen:
  // - DO NOT use reusePort (can be ENOTSUP)
  // - Bind to localhost for local dev
  const host = process.env.HOST || "127.0.0.1";

  httpServer.listen(port, host, () => {
    log(`serving on http://${host}:${port}`);
  });
})();