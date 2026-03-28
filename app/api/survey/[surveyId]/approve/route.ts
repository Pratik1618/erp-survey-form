import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type JwtPayload = {
  sub?: string;
  userId?: string;
  uid?: string;
  id?: string;
};

function parseJwtPayload(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) {
      return null;
    }

    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as JwtPayload;
  } catch {
    return null;
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ surveyId: string }> }
) {
  if (!API_BASE_URL) {
    return NextResponse.json(
      { message: 'NEXT_PUBLIC_API_BASE_URL is not configured.' },
      { status: 500 }
    );
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { surveyId } = await params;
    const body = await request.json().catch(() => ({}));
    const claims = parseJwtPayload(token);
    const approverId =
      body?.approverId || claims?.userId || claims?.uid || claims?.id || claims?.sub || 'unknown-approver';

    const upstreamResponse = await fetch(`${API_BASE_URL}/api/survey/${surveyId}/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ approverId }),
    });

    const contentType = upstreamResponse.headers.get('content-type') ?? '';
    const data = contentType.includes('application/json')
      ? await upstreamResponse.json()
      : { message: await upstreamResponse.text() };

    return NextResponse.json(data, { status: upstreamResponse.status });
  } catch {
    return NextResponse.json(
      { message: 'Unable to reach the survey service.' },
      { status: 502 }
    );
  }
}
