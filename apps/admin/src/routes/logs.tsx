import { LogDetailSheet, LogsFilter, LogsTable } from '@/features/logs';
import { useSocket } from '@/hooks/use-socket';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

function LogsPage() {
  // Subscribe to real-time log updates
  const { socket } = useSocket();

  useEffect(() => {
    socket.emit('logs:subscribe');

    return () => {
      socket.emit('logs:unsubscribe');
    };
  }, [socket]);

  return (
    <>
      <LogsFilter />
      <LogsTable />
      <LogDetailSheet />
    </>
  );
}

export const Route = createFileRoute('/logs')({
  component: LogsPage,
});
