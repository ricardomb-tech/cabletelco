import { NextResponse } from 'next/server';

export async function POST() {
  // Manejador vacío para evitar errores 404 provenientes de extensiones del navegador
  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
