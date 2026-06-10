import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const backendUrl = process.env.MCP_SERVER_URL || 'http://127.0.0.1:8000';
  const { id } = await params;

  try {
    const response = await fetch(`${backendUrl}/api/conversations/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error proxying conversation ${id} from MCP server:`, error);
    return NextResponse.json({ error: `Failed to fetch conversation ${id} from backend.` }, { status: 500 });
  }
}
