'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ErrorDisplay from '@/components/ErrorDisplay';
import StatusChecker from '@/components/StatusChecker';

function PageContent() {
  const searchParams = useSearchParams();
  const statusCode = searchParams.get('code') || '500';
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        <ErrorDisplay statusCode={statusCode} />
        <StatusChecker statusCode={statusCode} />
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
}
