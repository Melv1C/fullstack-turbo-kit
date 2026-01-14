import z from 'zod';

export const LogType$ = z.enum(['REQUEST', 'APP']);
export type LogType = z.infer<typeof LogType$>;

export const LogLevel$ = z.enum(['debug', 'info', 'warn', 'error']);
export type LogLevel = z.infer<typeof LogLevel$>;

export const levelPriority: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 };

export const Method$ = z.enum(['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']);
export type Method = z.infer<typeof Method$>;

export const LogStep$ = z.object({
  level: LogLevel$,
  message: z.string(),
  metadata: z.json().default({}),
  timestamp: z.number(),
});
export type LogStep = z.infer<typeof LogStep$>;

export const Log$ = z.object({
  id: z.int().positive(),
  type: LogType$,
  level: LogLevel$,
  message: z.string(),
  metadata: z.json().default({}),

  userId: z.uuid().nullish(),
  method: Method$.nullish(),
  path: z.string().nullish(),
  statusCode: z.number().nullish(),
  durationMs: z.number().nullish(),
  steps: LogStep$.array().nullish(),

  createdAt: z.date(),
});
export type Log = z.infer<typeof Log$>;

export const LogCreate$ = Log$.extend({ type: LogType$.default('APP') }).omit({
  id: true,
  createdAt: true,
});
export type LogCreate = z.infer<typeof LogCreate$>;
