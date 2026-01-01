'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import StaticErrorDisplay from '@/components/StaticErrorDisplay';

function PageContent() {
  const searchParams = useSearchParams();
  const statusCode = searchParams.get('code') || '500';

  return <StaticErrorDisplay statusCode={statusCode} />;
}

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <PageContent />
        </Suspense>
      </div>
    </main>
  );
}
