import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    message: 'Welcome to NyuVenture API Route Handler!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
}
