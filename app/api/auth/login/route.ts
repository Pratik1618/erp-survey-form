import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function normalizeRole(role: string) {
  return role === 'approver' ? 'checker' : role;
}

export async function POST(request: Request) {
  if (!API_BASE_URL) {
    return NextResponse.json(
      { message: 'NEXT_PUBLIC_API_BASE_URL is not configured.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    const upstreamResponse = await fetch(`${API_BASE_URL}/api/survey-auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const contentType = upstreamResponse.headers.get('content-type') ?? '';
    const data = contentType.includes('application/json')
      ? await upstreamResponse.json()
      : { message: await upstreamResponse.text() };

    const response = NextResponse.json(data, { status: upstreamResponse.status });

    if (upstreamResponse.ok && data?.results?.accessToken) {
      response.cookies.set('token', data.results.accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24,
      });

      if (data?.results?.role) {
        response.cookies.set('role', normalizeRole(data.results.role), {
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 60 * 60 * 24,
        });
      }
    }

    return response;
  } catch {
    return NextResponse.json(
      { message: 'Unable to reach the authentication service.' },
      { status: 502 }
    );
  }
}
