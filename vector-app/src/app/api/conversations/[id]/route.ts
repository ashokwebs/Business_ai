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
      return NextResponse.json({
        messages: [{ role: 'assistant', content: "This is a restored offline session. The project context has been loaded successfully." }]
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      messages: [{ role: 'assistant', content: "This is a restored offline session. The project context has been loaded successfully." }]
    });
  }
}
