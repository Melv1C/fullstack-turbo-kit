import { Log, User } from './schemas';

// ============================================
// Socket Event Types
// ============================================

/**
 * Events emitted from the server to clients
 */
export interface ServerToClientEvents {
  // Log events
  'log:created': (log: Log) => void;

  // Connection events
  connected: (data: { message: string }) => void;
}

/**
 * Events emitted from clients to the server
 */
export interface ClientToServerEvents {
  // Subscribe to specific channels
  'logs:subscribe': () => void;
  'logs:unsubscribe': () => void;
}

/**
 * Inter-server events (for scaling with multiple servers)
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InterServerEvents {}

/**
 * Data stored per socket connection
 */
export interface SocketData {
  user: User | null;
}
