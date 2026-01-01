import { Suspense } from 'react';
import StaticErrorDisplay from '@/components/StaticErrorDisplay';

interface PageProps {
  searchParams: Promise<{ code?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const statusCode = params.code || '500';

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        <Suspense fallback={null}>
          <StaticErrorDisplay statusCode={statusCode} />
        </Suspense>
      </div>
    </main>
  );
}
