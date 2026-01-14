import { logger } from '@/libs/logger';
import { requestLogger } from '@repo/logger';
import { Hono } from 'hono';
import { getLogsRouter } from './get-logs';
import { healthRouter } from './health';

export const routes = new Hono()
  .route('/health', healthRouter)
  .route('/logs', getLogsRouter)
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
