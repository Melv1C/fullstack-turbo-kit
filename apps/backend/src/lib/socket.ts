import {
  User$,
  type ClientToServerEvents,
  type InterServerEvents,
  type ServerToClientEvents,
  type SocketData,
} from '@repo/utils';
import type { Server as HTTPServer } from 'node:http';
import { Server, Socket } from 'socket.io';
import z from 'zod';
import { auth } from './auth';
import { env } from './env';
import { logger } from './logger';

const useAuth = async (socket: Socket) => {
  if (socket.data.user) return;

  // Convert IncomingHttpHeaders to Web API Headers
  const headers = new Headers();
  for (const [key, value] of Object.entries(socket.request.headers)) {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach(v => headers.append(key, v));
      } else {
        headers.set(key, value);
      }
    }
  }

  const sessionData = await auth.api.getSession({
    headers,
  });

  const user = sessionData?.user ? User$.safeParse(sessionData.user) : null;

  if (user && !user.success) {
    logger.error('Invalid user data in session for socket', {
      metadata: { error: user.error.message },
    });
    throw user.error;
  }

  socket.data.user = user?.data || null;
};

const getSocketInfo = (socket: Socket) => ({
  id: socket.id,
  data: socket.data,
  connected: socket.connected,
  rooms: Array.from(socket.rooms),
  origin: socket.handshake.headers.origin,
});

export const SocketRooms$ = z.enum(['LOGS']);
type SocketRooms = z.infer<typeof SocketRooms$>;

// Type-safe Socket.IO server
export type TypedServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

// Singleton instance - will be initialized in index.ts
let io: TypedServer | null = null;

/**
 * Initialize the Socket.IO server with the HTTP server
 */
export function initializeSocketIO(httpServer: HTTPServer): TypedServer {
  io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
    httpServer,
    {
      cors: {
        origin: [env.FRONTEND_URL, env.ADMIN_URL, env.DESKTOP_URL],
        credentials: true,
      },
    },
  );

  // Set up connection handlers
  io.on('connection', async socket => {
    await useAuth(socket);
    logger.info(`Socket connected: ${socket.id}`, {
      path: 'socket.io/connection',
      userId: socket.data.user?.id,
      metadata: {
        socket: getSocketInfo(socket),
      },
    });

    // Send welcome message
    socket.emit('connected', { message: 'Connected to server' });

    // Handle log subscription
    socket.on('logs:subscribe', () => {
      socket.join(SocketRooms$.enum.LOGS);
    });

    socket.on('logs:unsubscribe', () => {
      socket.leave(SocketRooms$.enum.LOGS);
    });

    socket.on('disconnect', reason => {
      logger.debug(`Socket disconnected: ${socket.id} (${reason})`, {
        userId: socket.data.user?.id,
        path: 'socket.io/disconnect',
        metadata: {
          socket: getSocketInfo(socket),
          reason,
        },
      });
    });
  });

  console.log(`🔌 Socket.IO initialized`);

  return io;
}

/**
 * Emit an event to all clients in a specific room
 */
export function emitToRoom<E extends keyof ServerToClientEvents>(
  room: SocketRooms,
  event: E,
  ...args: Parameters<ServerToClientEvents[E]>
): void {
  if (!io) {
    logger.error('Socket.IO not initialized, skipping emit');
    return;
  }

  io.to(room).emit(event, ...args);
}

/**
 * Emit an event to all connected clients
 */
export function emitToAll<E extends keyof ServerToClientEvents>(
  event: E,
  ...args: Parameters<ServerToClientEvents[E]>
): void {
  if (!io) {
    logger.error('Socket.IO not initialized, skipping emit');
    return;
  }
  io.emit(event, ...args);
}
