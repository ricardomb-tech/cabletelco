export const dynamic = 'force-dynamic';

const DEFAULT_SIZE = 12 * 1024 * 1024;
const MIN_SIZE = 1 * 1024 * 1024;
const MAX_SIZE = 25 * 1024 * 1024;
const CHUNK_SIZE = 64 * 1024;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedSize = Number(searchParams.get('size') || DEFAULT_SIZE);
  const totalBytes = Number.isFinite(requestedSize)
    ? clamp(Math.floor(requestedSize), MIN_SIZE, MAX_SIZE)
    : DEFAULT_SIZE;

  let remaining = totalBytes;
  const chunk = new Uint8Array(CHUNK_SIZE);
  chunk.fill(97);

  const stream = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (remaining <= 0) {
        controller.close();
        return;
      }

      if (remaining >= CHUNK_SIZE) {
        controller.enqueue(chunk);
        remaining -= CHUNK_SIZE;
        return;
      }

      controller.enqueue(chunk.subarray(0, remaining));
      remaining = 0;
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': String(totalBytes),
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  });
}
