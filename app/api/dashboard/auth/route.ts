import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (!process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: 'Dashboard password not configured' }, { status: 500 })
  }

  if (password === process.env.DASHBOARD_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set('dashboard_auth', password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
}

