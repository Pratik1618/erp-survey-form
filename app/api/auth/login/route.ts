import { NextResponse } from 'next/server';

function normalizeRole(role: string) {
  return role === 'approver' ? 'checker' : role;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body?.email || 'user@ismart.org';
    
    // Determine role based on the email address
    const role = email.includes('checker') || email.includes('approver') ? 'checker' : 'maker';

    // Construct mock claims for the JWT
    const mockClaims = {
      sub: email,
      userId: role === 'checker' ? 'mock-checker-id' : 'mock-maker-id',
      name: email.split('@')[0] || 'Mock User',
      role: role,
    };

    // Helper to encode string as base64url
    const base64url = (str: string) => {
      return Buffer.from(str)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    };

    const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = base64url(JSON.stringify(mockClaims));
    const signature = 'mocksignature';
    const mockToken = `${header}.${payload}.${signature}`;

    const data = {
      success: true,
      message: 'Mock login successful',
      results: {
        accessToken: mockToken,
        role: role,
      },
    };

    const response = NextResponse.json(data, { status: 200 });

    // Set the token cookie
    response.cookies.set('token', mockToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    // Set the role cookie
    response.cookies.set('role', role, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: 'Mock login failed.' },
      { status: 500 }
    );
  }
}
