import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(
  _request: Request,
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

    const upstreamResponse = await fetch(`${API_BASE_URL}/api/survey/${surveyId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
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
