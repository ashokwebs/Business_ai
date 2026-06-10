import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const backendUrl = process.env.MCP_SERVER_URL || 'http://127.0.0.1:8000';
  const { id } = await params;

  try {
    const response = await fetch(`${backendUrl}/api/conversations/${id}/documents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ documents: [] });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ documents: [] });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const backendUrl = process.env.MCP_SERVER_URL || 'http://127.0.0.1:8000';
  const { id } = await params;

  try {
    const body = await request.json();
    const response = await fetch(`${backendUrl}/api/conversations/${id}/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error proxying document creation for conversation ${id} from MCP server:`, error);
    return NextResponse.json({ error: `Failed to create document for conversation ${id} on backend.` }, { status: 500 });
  }
}
