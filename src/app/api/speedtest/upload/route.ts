export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const payload = await request.arrayBuffer();

  return Response.json(
    {
      ok: true,
      receivedBytes: payload.byteLength,
      timestamp: Date.now(),
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    }
  );
}
