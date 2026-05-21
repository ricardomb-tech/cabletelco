'use client';

import { useMemo, useState } from 'react';

type TestStage = 'idle' | 'ping' | 'download' | 'upload' | 'done' | 'error';

function toMbps(bytes: number, elapsedMs: number) {
  if (elapsedMs <= 0) return 0;
  return (bytes * 8) / (elapsedMs / 1000) / 1_000_000;
}

function formatMbps(value: number | null) {
  if (value === null) return '--';
  return value.toFixed(1);
}

function getQuality(downloadMbps: number | null) {
  if (downloadMbps === null) return 'Sin datos';
  if (downloadMbps >= 300) return 'Excelente';
  if (downloadMbps >= 150) return 'Muy buena';
  if (downloadMbps >= 60) return 'Buena';
  if (downloadMbps >= 25) return 'Aceptable';
  return 'Baja';
}

export default function TestVelocidadPage() {
  const [stage, setStage] = useState<TestStage>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [pingMs, setPingMs] = useState<number | null>(null);
  const [downloadMbps, setDownloadMbps] = useState<number | null>(null);
  const [uploadMbps, setUploadMbps] = useState<number | null>(null);
  const [currentSpeed, setCurrentSpeed] = useState(0);

  const maxSpeed = useMemo(() => {
    return Math.max(downloadMbps ?? 0, uploadMbps ?? 0, currentSpeed);
  }, [downloadMbps, uploadMbps, currentSpeed]);

  const gaugePercent = Math.min(100, (maxSpeed / 500) * 100);

  const runPingTest = async () => {
    setStage('ping');
    setProgress(8);

    const samples: number[] = [];
    for (let i = 0; i < 4; i += 1) {
      const start = performance.now();
      const response = await fetch(`/api/speedtest/ping?t=${Date.now()}&i=${i}`, {
        cache: 'no-store',
      });
      if (!response.ok) {
        throw new Error('No fue posible medir la latencia.');
      }
      await response.json();
      samples.push(performance.now() - start);
      setProgress(8 + ((i + 1) / 4) * 12);
    }

    const avg = samples.reduce((acc, value) => acc + value, 0) / samples.length;
    setPingMs(avg);
  };

  const runDownloadTest = async () => {
    setStage('download');
    setCurrentSpeed(0);

    const targetBytes = 12 * 1024 * 1024;
    const response = await fetch(`/api/speedtest/download?size=${targetBytes}&t=${Date.now()}`, {
      cache: 'no-store',
    });

    if (!response.ok || !response.body) {
      throw new Error('No fue posible iniciar la prueba de descarga.');
    }

    const reader = response.body.getReader();
    const start = performance.now();
    let received = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      received += value.length;
      const elapsed = performance.now() - start;
      const speed = toMbps(received, elapsed);

      setCurrentSpeed(speed);
      setProgress(20 + (received / targetBytes) * 45);
    }

    const elapsed = performance.now() - start;
    setDownloadMbps(toMbps(received, elapsed));
    setProgress(65);
  };

  const runUploadTest = async () => {
    setStage('upload');

    const payloadSize = 6 * 1024 * 1024;
    const payload = new Uint8Array(payloadSize);
    payload.fill(120);

    const start = performance.now();
    const response = await fetch(`/api/speedtest/upload?t=${Date.now()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: payload,
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('No fue posible iniciar la prueba de subida.');
    }

    await response.json();
    const elapsed = performance.now() - start;
    const speed = toMbps(payloadSize, elapsed);

    setCurrentSpeed(speed);
    setUploadMbps(speed);
    setProgress(100);
  };

  const runSpeedTest = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setError(null);
    setProgress(0);
    setCurrentSpeed(0);
    setPingMs(null);
    setDownloadMbps(null);
    setUploadMbps(null);

    try {
      await runPingTest();
      await runDownloadTest();
      await runUploadTest();
      setStage('done');
    } catch (err) {
      setStage('error');
      setError(err instanceof Error ? err.message : 'Ocurrió un error durante la prueba.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-14 bg-[radial-gradient(ellipse_at_top,_#fff7ed_0%,_#f8fafc_45%,_#eef2ff_100%)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-orange-100 bg-white/85 backdrop-blur-sm shadow-xl shadow-slate-200/60 overflow-hidden">
          <div className="px-6 sm:px-10 pt-8 pb-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <p className="text-xs sm:text-sm font-bold tracking-widest uppercase opacity-90">
              Herramienta de Diagnostico
            </p>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight mt-1">
              Test de Velocidad
            </h1>
            <p className="text-sm sm:text-base mt-2 text-orange-50 max-w-3xl">
              Mide en segundos tu ping, velocidad de descarga y subida con una interfaz clara y facil de usar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-10">
            <div className="flex flex-col items-center justify-center gap-6">
              <div
                className="relative w-64 h-64 rounded-full grid place-items-center"
                style={{
                  background: `conic-gradient(#f97316 ${gaugePercent}%, #e2e8f0 ${gaugePercent}% 100%)`,
                }}
              >
                <div className="w-52 h-52 rounded-full bg-white border border-slate-200 shadow-inner grid place-items-center text-center px-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Velocidad</p>
                    <p className="text-4xl font-black text-slate-900 leading-none mt-1">
                      {maxSpeed.toFixed(1)}
                    </p>
                    <p className="text-sm font-semibold text-slate-500 mt-1">Mbps</p>
                    <p className="text-xs text-orange-600 font-bold mt-2">
                      {stage === 'download' ? 'Midiendo descarga...' : stage === 'upload' ? 'Midiendo subida...' : 'Resultado maximo'}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={runSpeedTest}
                disabled={isRunning}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-extrabold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {isRunning ? 'Ejecutando prueba...' : 'Iniciar Test de Velocidad'}
              </button>

              <div className="w-full max-w-md">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                  <span>Progreso</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2 w-full max-w-md text-center">
                  {error}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Ping</p>
                  <p className="text-2xl font-black text-slate-900 mt-2">{pingMs ? pingMs.toFixed(0) : '--'} <span className="text-sm font-bold text-slate-500">ms</span></p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Descarga</p>
                  <p className="text-2xl font-black text-slate-900 mt-2">{formatMbps(downloadMbps)} <span className="text-sm font-bold text-slate-500">Mbps</span></p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Subida</p>
                  <p className="text-2xl font-black text-slate-900 mt-2">{formatMbps(uploadMbps)} <span className="text-sm font-bold text-slate-500">Mbps</span></p>
                </div>
              </div>

              <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-5">
                <p className="text-xs uppercase tracking-widest font-bold text-orange-700">Estado de tu conexion</p>
                <p className="text-xl font-black text-slate-900 mt-2">{getQuality(downloadMbps)}</p>
                <p className="text-sm text-slate-600 mt-1">
                  Haz la prueba con un solo dispositivo conectado para obtener una lectura mas precisa.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h2 className="text-base font-extrabold text-slate-900 mb-3">Como usarlo facil</h2>
                <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
                  <li>Cierra descargas y videos antes de iniciar.</li>
                  <li>Presiona Iniciar Test de Velocidad.</li>
                  <li>Espera unos segundos y revisa ping, descarga y subida.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
