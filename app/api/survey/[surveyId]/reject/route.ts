import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    const reason = body?.reason?.trim();

    if (!reason) {
      return NextResponse.json({ message: 'Rejection reason is required.' }, { status: 400 });
    }

    const upstreamResponse = await fetch(`${API_BASE_URL}/api/survey/${surveyId}/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reason }),
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
