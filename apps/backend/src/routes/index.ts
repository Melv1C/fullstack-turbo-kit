import { logger } from '@/libs/logger';
import { requestLogger } from '@repo/logger';
import { Hono } from 'hono';
import { healthRoutes } from './health';
import { logsRoutes } from './logs';

export const routes = new Hono()
  .use(useAuth)

  .route('/health', healthRoutes)
  .route('/logs', logsRoutes)
  //////////////////////////////////////////////////
  // Add routes without logging middleware here

  //////////////////////////////////////////////////
  .use('*', requestLogger(logger))
  //////////////////////////////////////////////////
  // Add routes with logging middleware applied here

  //////////////////////////////////////////////////
  // Global error handler
  .onError((err, c) => {
    if (c.get('logStep')) {
      c.get('logStep').error('Unhandled error occurred in route', { error: err.message });
    } else {
      logger.error('Unhandled error occurred but logStep is missing', {
        metadata: { error: err.message },
      });
    }
    return c.json({ message: 'Internal Server Error' }, 500);
  });
