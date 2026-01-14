import { prisma } from '@repo/database';
import { Log$ } from '@repo/utils';
import { Hono } from 'hono';

export const getLogsRouter = new Hono().get('/', async c => {
  const logs = await prisma.log.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
  return c.json(Log$.array().parse(logs));
});
