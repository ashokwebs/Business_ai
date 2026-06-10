import { NextResponse } from 'next/server';

export async function GET() {
  const backendUrl = process.env.MCP_SERVER_URL || 'http://127.0.0.1:8000';
  
  try {
    const response = await fetch(`${backendUrl}/api/conversations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ conversations: [] });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    // If backend is unreachable, just return empty list so the frontend can load mock data
    return NextResponse.json({ conversations: [] });
  }
}
