import { NextResponse } from 'next/server';

export async function GET() {
  const backendUrl = process.env.MCP_SERVER_URL || 'http://127.0.0.1:8000';
  
  try {
    const response = await fetch(`${backendUrl}/api/sessions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({
        sessions: [
          {
            _id: "mock-session-1",
            session_id: "SESSION-NEXUS-001",
            project_id: "PRJ-NEXUS",
            idea: "Create a Zero-Trust Security Architecture for enterprise B2B SaaS applications.",
            status: "completed",
            final_strategy: "### Executive Summary\nSuccessfully designed a zero-trust model utilizing JWT with rotating asymmetric keys.\n\n### Key Deliverables\n- **Edge Gateway:** Next.js Serverless runtime\n- **Authentication:** OAuth2 with mandatory MFA\n- **Database:** MongoDB with Client-Side Field Level Encryption (CSFLE)."
          },
          {
            _id: "mock-session-2",
            session_id: "SESSION-AURA-002",
            project_id: "PRJ-AURA",
            idea: "Predictive ML wearable integration for real-time health monitoring and athlete optimization.",
            status: "completed",
            final_strategy: "### Executive Summary\nDeployed lightweight TensorFlow Lite models to edge devices (wearables) for low-latency inference.\n\n### Key Deliverables\n- **Data Pipeline:** Kafka streams to Google BigQuery\n- **ML Pipeline:** Vertex AI auto-training loops based on user feedback.\n- **Frontend:** React Native app communicating via WebSockets."
          }
        ]
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      sessions: [
        {
          _id: "mock-session-1",
          session_id: "SESSION-NEXUS-001",
          project_id: "PRJ-NEXUS",
          idea: "Create a Zero-Trust Security Architecture for enterprise B2B SaaS applications.",
          status: "completed",
          final_strategy: "### Executive Summary\nSuccessfully designed a zero-trust model utilizing JWT with rotating asymmetric keys.\n\n### Key Deliverables\n- **Edge Gateway:** Next.js Serverless runtime\n- **Authentication:** OAuth2 with mandatory MFA\n- **Database:** MongoDB with Client-Side Field Level Encryption (CSFLE)."
        },
        {
          _id: "mock-session-2",
          session_id: "SESSION-AURA-002",
          project_id: "PRJ-AURA",
          idea: "Predictive ML wearable integration for real-time health monitoring and athlete optimization.",
          status: "completed",
          final_strategy: "### Executive Summary\nDeployed lightweight TensorFlow Lite models to edge devices (wearables) for low-latency inference.\n\n### Key Deliverables\n- **Data Pipeline:** Kafka streams to Google BigQuery\n- **ML Pipeline:** Vertex AI auto-training loops based on user feedback.\n- **Frontend:** React Native app communicating via WebSockets."
        }
      ]
    });
  }
}
