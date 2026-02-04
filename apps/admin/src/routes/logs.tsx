import { LogDetailSheet, LogsFilter, LogsTable } from '@/features/logs';
import { createFileRoute } from '@tanstack/react-router';

function LogsPage() {
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
